import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import {
  sendBookingStatusConfirmedEmail,
  sendTechnicianAssignedEmail,
  sendServiceDayReminderEmail,
  sendBookingCompletedEmail,
  sendBookingCancellationEmail,
  isDeliverableCustomerEmail,
  EmailDispatchResult,
} from '@/lib/email';
import { BookingStatus, NotificationType } from '@/types/database';
import { getKolkataDateTime } from '@/lib/timezone';

const VALID_STATUSES: BookingStatus[] = [
  'queued',
  'confirmed',
  'technician_assigned',
  'completed',
  'cancelled',
  'in_progress', // Historical backwards compatibility
];

const ALLOWED_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  queued: ['confirmed', 'cancelled', 'queued'],
  confirmed: ['technician_assigned', 'cancelled', 'confirmed'],
  technician_assigned: ['completed', 'cancelled', 'technician_assigned'],
  completed: ['completed'], // Terminal
  cancelled: ['cancelled'], // Terminal
  in_progress: ['completed', 'cancelled', 'in_progress'], // Legacy terminal or completion
};

export async function GET(
  request: NextRequest,
  { params }: { params: { ref: string } }
) {
  try {
    const bookingRef = params.ref?.trim().toUpperCase();

    if (!bookingRef) {
      return NextResponse.json(
        { error: 'Valid booking reference is required.' },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone')?.replace(/\D/g, '');

    const authHeader = request.headers.get('authorization') || '';
    const adminApiKey = request.headers.get('x-admin-key') || '';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    const isAdmin =
      Boolean(serviceRoleKey) &&
      (authHeader === `Bearer ${serviceRoleKey}` || adminApiKey === serviceRoleKey);

    // If not authenticated as admin, require customer phone verification
    if (!isAdmin && (!phone || phone.length !== 10)) {
      return NextResponse.json(
        { error: 'Valid 10-digit registered phone number is required to verify booking details.' },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();
    const supabase: any = adminClient || createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database service is currently unconfigured.' },
        { status: 503 }
      );
    }

    let query = supabase
      .from('bookings')
      .select('*')
      .eq('booking_ref', bookingRef);

    if (!isAdmin && phone) {
      query = query.eq('customer_phone', phone);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error('Error querying booking by ref:', error);
      return NextResponse.json(
        { error: 'Failed to look up booking reference.' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'No matching booking found for this reference.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, booking: data });
  } catch (err: unknown) {
    console.error('API GET /api/bookings/[ref] exception:', err);
    return NextResponse.json(
      { error: 'Internal server error retrieving booking details.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/bookings/[ref]
 * Secure Administrative endpoint to update booking status, technician, scheduling, or notes.
 * Idempotently triggers lifecycle customer emails and immediate service-day reminders.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { ref: string } }
) {
  try {
    const bookingRef = params.ref?.trim().toUpperCase();

    if (!bookingRef) {
      return NextResponse.json(
        { error: 'Valid booking reference is required.' },
        { status: 400 }
      );
    }

    // 1. Authenticate administrative request
    const authHeader = request.headers.get('authorization') || '';
    const adminApiKey = request.headers.get('x-admin-key') || '';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    const isAuthorized =
      Boolean(serviceRoleKey) &&
      (authHeader === `Bearer ${serviceRoleKey}` || adminApiKey === serviceRoleKey);

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized. Administrative credentials are required to modify booking records.' },
        { status: 401 }
      );
    }

    // 2. Resolve Privileged Supabase Admin Client
    const adminClient = createAdminClient();
    if (!adminClient) {
      return NextResponse.json(
        { error: 'Database service is currently unconfigured.' },
        { status: 503 }
      );
    }

    // 3. Parse and validate payload
    const body = await request.json().catch(() => ({}));
    const {
      status,
      notes,
      technician_name,
      technician_phone,
      assigned_technician,
      scheduled_service_date,
      service_date,
      cancellation_reason,
      retry_notification,
    } = body;

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid booking status. Allowed: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    // 4. Fetch existing booking
    const { data: currentBooking, error: fetchError } = await (adminClient as any)
      .from('bookings')
      .select('*')
      .eq('booking_ref', bookingRef)
      .maybeSingle();

    if (fetchError || !currentBooking) {
      return NextResponse.json(
        { error: 'No matching booking found for this reference.' },
        { status: 404 }
      );
    }

    const currentStatus: BookingStatus = currentBooking.status;
    const nextStatus: BookingStatus = status || currentStatus;

    // 5. Validate allowed status transition
    const allowedNext = ALLOWED_TRANSITIONS[currentStatus] || [];
    if (!allowedNext.includes(nextStatus)) {
      return NextResponse.json(
        {
          error: `Invalid status transition: cannot change status from '${currentStatus}' to '${nextStatus}'.`,
          current_status: currentStatus,
          allowed_transitions: allowedNext.filter((s) => s !== currentStatus),
        },
        { status: 400 }
      );
    }

    // 6. Update booking in database
    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (status) updatePayload.status = status;
    if (notes !== undefined) updatePayload.notes = notes ? String(notes).trim() : null;

    const resolvedTechName =
      technician_name !== undefined
        ? (technician_name ? String(technician_name).trim() : null)
        : (assigned_technician !== undefined ? (assigned_technician ? String(assigned_technician).trim() : null) : undefined);

    if (resolvedTechName !== undefined) {
      updatePayload.technician_name = resolvedTechName;
      updatePayload.assigned_technician = resolvedTechName;
    }

    if (technician_phone !== undefined) {
      updatePayload.technician_phone = technician_phone ? String(technician_phone).trim() : null;
    }

    const resolvedServiceDate = scheduled_service_date || service_date;
    if (resolvedServiceDate !== undefined) {
      updatePayload.scheduled_service_date = resolvedServiceDate ? String(resolvedServiceDate).trim() : null;
    }

    if (cancellation_reason !== undefined) {
      updatePayload.cancellation_reason = cancellation_reason
        ? String(cancellation_reason).trim()
        : null;
    }

    const { data: updatedBooking, error: updateError } = await (adminClient as any)
      .from('bookings')
      .update(updatePayload)
      .eq('id', currentBooking.id)
      .select()
      .single();

    if (updateError || !updatedBooking) {
      console.error('Failed to update booking in Supabase:', updateError);
      return NextResponse.json(
        { error: 'Failed to update booking record in database.' },
        { status: 500 }
      );
    }

    // 7. Determine primary lifecycle notification
    let notificationType: NotificationType | null = null;
    const isTransition = currentStatus !== nextStatus;
    const isTechAssignmentUpdate =
      nextStatus === 'technician_assigned' &&
      resolvedTechName &&
      resolvedTechName !== currentBooking.technician_name;

    if (isTransition) {
      if (nextStatus === 'confirmed') {
        notificationType = 'status_confirmed';
      } else if (nextStatus === 'technician_assigned') {
        notificationType = 'technician_assigned';
      } else if (nextStatus === 'completed') {
        notificationType = 'status_completed';
      } else if (nextStatus === 'cancelled') {
        notificationType = 'status_cancelled';
      }
    } else if (isTechAssignmentUpdate) {
      notificationType = 'technician_assigned';
    } else if (retry_notification === true) {
      if (nextStatus === 'confirmed') notificationType = 'status_confirmed';
      else if (nextStatus === 'technician_assigned') notificationType = 'technician_assigned';
      else if (nextStatus === 'completed') notificationType = 'status_completed';
      else if (nextStatus === 'cancelled') notificationType = 'status_cancelled';
    }

    // 8. Dispatch Primary Notification with Idempotency Constraints
    let notificationResult = {
      sent: false,
      skipped: true,
      notification_type: notificationType,
      message: isTransition
        ? 'No customer email configured for this transition.'
        : 'Booking updated (no status transition; notification skipped).',
    };

    if (notificationType) {
      let existingNotification: any = null;
      try {
        const { data: existing } = await (adminClient as any)
          .from('booking_notifications')
          .select('*')
          .eq('booking_id', updatedBooking.id)
          .eq('notification_type', notificationType)
          .maybeSingle();
        existingNotification = existing;
      } catch (checkErr) {
        console.warn('Could not query booking_notifications table:', checkErr);
      }

      if (
        existingNotification &&
        existingNotification.notification_status === 'sent' &&
        !retry_notification
      ) {
        notificationResult = {
          sent: false,
          skipped: true,
          notification_type: notificationType,
          message: `Notification '${notificationType}' was already sent on ${existingNotification.sent_at}. Duplicate dispatch prevented.`,
        };
      } else if (!isDeliverableCustomerEmail(updatedBooking.customer_email)) {
        notificationResult = {
          sent: false,
          skipped: true,
          notification_type: notificationType,
          message: 'Customer email is invalid or a legacy placeholder (@ezcool.local). Notification skipped.',
        };

        try {
          if (!existingNotification) {
            await (adminClient as any).from('booking_notifications').insert({
              booking_id: updatedBooking.id,
              booking_ref: updatedBooking.booking_ref,
              notification_type: notificationType,
              recipient_email: updatedBooking.customer_email || 'missing@ezcool.local',
              notification_status: 'failed',
              error_message: 'Legacy or placeholder email skipped',
            });
          }
        } catch {
          // Ignore table insert error if migration pending
        }
      } else {
        let notificationRecordId = existingNotification?.id;
        try {
          if (!existingNotification) {
            const { data: insertedNotif, error: lockError } = await (adminClient as any)
              .from('booking_notifications')
              .insert({
                booking_id: updatedBooking.id,
                booking_ref: updatedBooking.booking_ref,
                notification_type: notificationType,
                recipient_email: updatedBooking.customer_email,
                notification_status: 'pending',
              })
              .select()
              .single();

            if (lockError && lockError.code === '23505') {
              return NextResponse.json({
                success: true,
                booking: updatedBooking,
                notification: {
                  sent: false,
                  skipped: true,
                  message: 'Concurrent notification locked by database constraint.',
                },
                message: 'Booking status updated successfully.',
              });
            }
            notificationRecordId = insertedNotif?.id;
          }
        } catch (lockErr) {
          console.warn('Audit lock insert error:', lockErr);
        }

        // Dispatch email via Resend
        let dispatchRes: EmailDispatchResult;
        const activeServiceDate =
          updatedBooking.scheduled_service_date || updatedBooking.preferred_date;

        switch (notificationType) {
          case 'status_confirmed':
            dispatchRes = await sendBookingStatusConfirmedEmail({
              bookingRef: updatedBooking.booking_ref,
              customerName: updatedBooking.customer_name,
              customerEmail: updatedBooking.customer_email,
              serviceType: updatedBooking.service_type,
              systemType: updatedBooking.system_type,
              preferredDate: activeServiceDate,
              arrivalWindow: updatedBooking.arrival_window,
              serviceAddress: updatedBooking.service_address,
              assignedTechnician: updatedBooking.technician_name || updatedBooking.assigned_technician,
              notes: updatedBooking.notes,
            });
            break;

          case 'technician_assigned':
            dispatchRes = await sendTechnicianAssignedEmail({
              bookingRef: updatedBooking.booking_ref,
              customerName: updatedBooking.customer_name,
              customerEmail: updatedBooking.customer_email,
              serviceType: updatedBooking.service_type,
              systemType: updatedBooking.system_type,
              serviceDate: activeServiceDate,
              serviceAddress: updatedBooking.service_address,
              technicianName: updatedBooking.technician_name || updatedBooking.assigned_technician || 'Certified EZCOOL Specialist',
              technicianPhone: updatedBooking.technician_phone,
              arrivalWindow: updatedBooking.arrival_window,
              notes: updatedBooking.notes,
            });
            break;

          case 'status_completed':
            dispatchRes = await sendBookingCompletedEmail({
              bookingRef: updatedBooking.booking_ref,
              customerName: updatedBooking.customer_name,
              customerEmail: updatedBooking.customer_email,
              serviceType: updatedBooking.service_type,
              systemType: updatedBooking.system_type,
              serviceDate: activeServiceDate,
              serviceAddress: updatedBooking.service_address,
              technicianName: updatedBooking.technician_name || updatedBooking.assigned_technician,
              notes: updatedBooking.notes,
            });
            break;

          case 'status_cancelled':
          default:
            dispatchRes = await sendBookingCancellationEmail({
              bookingRef: updatedBooking.booking_ref,
              customerName: updatedBooking.customer_name,
              customerEmail: updatedBooking.customer_email,
              serviceType: updatedBooking.service_type,
              systemType: updatedBooking.system_type,
              preferredDate: activeServiceDate,
              arrivalWindow: updatedBooking.arrival_window,
              cancellationReason: updatedBooking.cancellation_reason,
            });
            break;
        }

        if (dispatchRes.success) {
          const sentAt = new Date().toISOString();
          try {
            if (notificationRecordId) {
              await (adminClient as any)
                .from('booking_notifications')
                .update({
                  notification_status: 'sent',
                  sent_at: sentAt,
                  provider_message_id: dispatchRes.messageId || null,
                  error_message: null,
                })
                .eq('id', notificationRecordId);
            }
            await (adminClient as any)
              .from('bookings')
              .update({ email_status: 'sent', email_sent_at: sentAt, email_message_id: dispatchRes.messageId || null })
              .eq('id', updatedBooking.id);
          } catch (dbUpdateErr) {
            console.error('Error updating notification status in DB:', dbUpdateErr);
          }

          notificationResult = {
            sent: true,
            skipped: false,
            notification_type: notificationType,
            message: 'Status notification email dispatched successfully.',
          };
        } else {
          try {
            if (notificationRecordId) {
              await (adminClient as any)
                .from('booking_notifications')
                .update({
                  notification_status: 'failed',
                  error_message: dispatchRes.error || 'Delivery failed',
                })
                .eq('id', notificationRecordId);
            }
            await (adminClient as any)
              .from('bookings')
              .update({ email_status: 'failed', email_error: dispatchRes.error || 'Delivery failed' })
              .eq('id', updatedBooking.id);
          } catch (dbUpdateErr) {
            console.error('Error updating failed notification status in DB:', dbUpdateErr);
          }

          notificationResult = {
            sent: false,
            skipped: false,
            notification_type: notificationType,
            message: `Email dispatch failed: ${dispatchRes.error || 'Unknown provider error'}`,
          };
        }
      }
    }

    // 9. Immediate Service-Day Reminder Rule:
    // If technician assigned/active on the service date after 8:00 AM IST, dispatch reminder immediately.
    let reminderResult: any = null;
    const effectiveServiceDate =
      updatedBooking.scheduled_service_date || updatedBooking.preferred_date;

    if (
      nextStatus === 'technician_assigned' &&
      isDeliverableCustomerEmail(updatedBooking.customer_email)
    ) {
      const { dateStr: kolkataToday, hour: kolkataHour } = getKolkataDateTime();

      if (effectiveServiceDate === kolkataToday && kolkataHour >= 8) {
        // Check if reminder was already sent for today
        let existingReminder: any = null;
        try {
          const { data: remCheck } = await (adminClient as any)
            .from('booking_notifications')
            .select('*')
            .eq('booking_id', updatedBooking.id)
            .eq('notification_type', 'service_day_reminder')
            .eq('service_date', kolkataToday)
            .maybeSingle();
          existingReminder = remCheck;
        } catch {
          // Table check
        }

        if (existingReminder && existingReminder.notification_status === 'sent') {
          reminderResult = {
            sent: false,
            skipped: true,
            message: 'Service-day reminder was already sent for today.',
          };
        } else {
          // Dispatch immediate reminder
          let reminderRecordId = existingReminder?.id;
          try {
            if (!existingReminder) {
              const { data: insertedRem } = await (adminClient as any)
                .from('booking_notifications')
                .insert({
                  booking_id: updatedBooking.id,
                  booking_ref: updatedBooking.booking_ref,
                  notification_type: 'service_day_reminder',
                  recipient_email: updatedBooking.customer_email,
                  notification_status: 'pending',
                  service_date: kolkataToday,
                })
                .select()
                .single();
              reminderRecordId = insertedRem?.id;
            }
          } catch (remLockErr) {
            console.warn('Reminder lock insert error:', remLockErr);
          }

          const remDispatch = await sendServiceDayReminderEmail({
            bookingRef: updatedBooking.booking_ref,
            customerName: updatedBooking.customer_name,
            customerEmail: updatedBooking.customer_email,
            serviceType: updatedBooking.service_type,
            systemType: updatedBooking.system_type,
            serviceDate: kolkataToday,
            serviceAddress: updatedBooking.service_address,
            technicianName: updatedBooking.technician_name || updatedBooking.assigned_technician,
            technicianPhone: updatedBooking.technician_phone,
            arrivalWindow: updatedBooking.arrival_window,
          });

          if (remDispatch.success) {
            const sentAt = new Date().toISOString();
            try {
              if (reminderRecordId) {
                await (adminClient as any)
                  .from('booking_notifications')
                  .update({
                    notification_status: 'sent',
                    sent_at: sentAt,
                    provider_message_id: remDispatch.messageId || null,
                  })
                  .eq('id', reminderRecordId);
              }
            } catch (remDbErr) {
              console.error('Error updating reminder sent status:', remDbErr);
            }

            reminderResult = {
              sent: true,
              skipped: false,
              message: 'Immediate service-day reminder sent successfully (assigned after 8:00 AM IST on service date).',
            };
          } else {
            try {
              if (reminderRecordId) {
                await (adminClient as any)
                  .from('booking_notifications')
                  .update({
                    notification_status: 'failed',
                    error_message: remDispatch.error || 'Failed',
                  })
                  .eq('id', reminderRecordId);
              }
            } catch (remDbErr) {
              console.error('Error updating reminder failed status:', remDbErr);
            }

            reminderResult = {
              sent: false,
              skipped: false,
              message: `Immediate service-day reminder failed: ${remDispatch.error}`,
            };
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      notification: notificationResult,
      ...(reminderResult ? { reminder_notification: reminderResult } : {}),
      message: 'Booking status updated successfully.',
    });
  } catch (err: unknown) {
    console.error('API PATCH /api/bookings/[ref] exception:', err);
    return NextResponse.json(
      { error: 'Internal server error processing booking update.' },
      { status: 500 }
    );
  }
}
