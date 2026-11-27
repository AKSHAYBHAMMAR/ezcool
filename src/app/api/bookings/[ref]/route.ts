import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import {
  sendBookingStatusConfirmedEmail,
  sendBookingCancellationEmail,
  isDeliverableCustomerEmail,
  EmailDispatchResult,
} from '@/lib/email';
import { BookingStatus, NotificationType } from '@/types/database';

const VALID_STATUSES: BookingStatus[] = [
  'queued',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled',
];

const ALLOWED_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  queued: ['confirmed', 'cancelled', 'queued'],
  confirmed: ['in_progress', 'completed', 'cancelled', 'confirmed'],
  in_progress: ['completed', 'cancelled', 'in_progress'],
  completed: ['completed'], // Terminal state
  cancelled: ['cancelled'], // Terminal state
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

    // Enforce customer phone verification to prevent unauthorized enumeration
    if (!phone || phone.length !== 10) {
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

    const { data, error } = await supabase
      .from('bookings')
      .select(
        'booking_ref, customer_name, customer_email, service_type, system_type, preferred_date, arrival_window, status, email_status, created_at, assigned_technician, notes'
      )
      .eq('booking_ref', bookingRef)
      .eq('customer_phone', phone)
      .maybeSingle();

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
 * Secure Administrative endpoint to update booking status, notes, or assigned technician.
 * Idempotently triggers lifecycle customer emails on state transitions.
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
    const { status, notes, assigned_technician, cancellation_reason, retry_notification } = body;

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
    if (assigned_technician !== undefined) {
      updatePayload.assigned_technician = assigned_technician
        ? String(assigned_technician).trim()
        : null;
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

    // 7. Determine if a lifecycle notification is needed
    // Genuine transition triggers:
    // - queued -> confirmed => 'status_confirmed'
    // - any -> cancelled => 'status_cancelled'
    // Or retry_notification === true on existing status
    let notificationType: NotificationType | null = null;
    const isTransition = currentStatus !== nextStatus;

    if (isTransition) {
      if (nextStatus === 'confirmed') {
        notificationType = 'status_confirmed';
      } else if (nextStatus === 'cancelled') {
        notificationType = 'status_cancelled';
      }
    } else if (retry_notification === true) {
      if (nextStatus === 'confirmed') {
        notificationType = 'status_confirmed';
      } else if (nextStatus === 'cancelled') {
        notificationType = 'status_cancelled';
      }
    }

    // 8. Handle Notification Dispatching with Idempotency Constraints
    let notificationResult = {
      sent: false,
      skipped: true,
      notification_type: notificationType,
      message: isTransition
        ? 'No customer email configured for this transition.'
        : 'Booking updated (no status transition; notification skipped).',
    };

    if (notificationType) {
      // Check existing notifications audit table for idempotency
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
        // Table might not exist yet if migration hasn't been run
        console.warn('Could not query booking_notifications table:', checkErr);
      }

      if (existingNotification && existingNotification.notification_status === 'sent') {
        // Idempotency: Prevent duplicate notifications when an admin saves the same status again
        notificationResult = {
          sent: false,
          skipped: true,
          notification_type: notificationType,
          message: `Notification '${notificationType}' was already sent on ${existingNotification.sent_at}. Duplicate dispatch prevented.`,
        };
      } else if (!isDeliverableCustomerEmail(updatedBooking.customer_email)) {
        // Ensure legacy bookings with placeholder emails never receive notifications
        notificationResult = {
          sent: false,
          skipped: true,
          notification_type: notificationType,
          message: 'Customer email is invalid or a legacy placeholder (@ezcool.local). Notification skipped.',
        };

        // Record skipped/failed in audit table if table exists
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
        // Reserve / lock pending notification record in audit table
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
              // Unique constraint caught a race condition!
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
          console.warn('Audit lock insert error (table may not exist yet):', lockErr);
        }

        // Dispatch email via Resend
        let dispatchRes: EmailDispatchResult;
        if (notificationType === 'status_confirmed') {
          dispatchRes = await sendBookingStatusConfirmedEmail({
            bookingRef: updatedBooking.booking_ref,
            customerName: updatedBooking.customer_name,
            customerEmail: updatedBooking.customer_email,
            serviceType: updatedBooking.service_type,
            systemType: updatedBooking.system_type,
            preferredDate: updatedBooking.preferred_date,
            arrivalWindow: updatedBooking.arrival_window,
            serviceAddress: updatedBooking.service_address,
            assignedTechnician: updatedBooking.assigned_technician,
            notes: updatedBooking.notes,
          });
        } else {
          dispatchRes = await sendBookingCancellationEmail({
            bookingRef: updatedBooking.booking_ref,
            customerName: updatedBooking.customer_name,
            customerEmail: updatedBooking.customer_email,
            serviceType: updatedBooking.service_type,
            systemType: updatedBooking.system_type,
            preferredDate: updatedBooking.preferred_date,
            arrivalWindow: updatedBooking.arrival_window,
            cancellationReason: updatedBooking.cancellation_reason,
          });
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
              .update({ email_status: 'sent', email_sent_at: sentAt })
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
          // Failure handling: Booking status is preserved, failure is recorded
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

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      notification: notificationResult,
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
