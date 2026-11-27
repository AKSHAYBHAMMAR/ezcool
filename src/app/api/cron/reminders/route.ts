import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  sendServiceDayReminderEmail,
  isDeliverableCustomerEmail,
  EmailDispatchResult,
} from '@/lib/email';
import { getKolkataDateTime } from '@/lib/timezone';

/**
 * Validates administrative authorization for the reminder cron job.
 * Accepts Vercel's Bearer CRON_SECRET or administrative SUPABASE_SERVICE_ROLE_KEY.
 */
function isCronAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization') || '';
  const cronSecretHeader = request.headers.get('x-cron-secret') || '';
  const cronSecret = process.env.CRON_SECRET?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  // If secret is configured, require match
  if (cronSecret) {
    if (authHeader === `Bearer ${cronSecret}` || cronSecretHeader === cronSecret) {
      return true;
    }
  }

  // Allow admin service role key as fallback auth
  if (serviceRoleKey) {
    if (authHeader === `Bearer ${serviceRoleKey}` || cronSecretHeader === serviceRoleKey) {
      return true;
    }
  }

  // In test / development environment without secrets configured, allow execution
  if (!cronSecret && !serviceRoleKey && process.env.NODE_ENV !== 'production') {
    return true;
  }

  return false;
}

async function processServiceDayReminders(request: NextRequest) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized. Valid CRON_SECRET or service credentials required.' },
      { status: 401 }
    );
  }

  const adminClient = createAdminClient();
  if (!adminClient) {
    return NextResponse.json(
      { error: 'Database service is unconfigured.' },
      { status: 503 }
    );
  }

  const { dateStr: kolkataToday } = getKolkataDateTime();

  try {
    // Query active bookings assigned a technician scheduled for today
    const { data: bookings, error: fetchError } = await (adminClient as any)
      .from('bookings')
      .select('*')
      .eq('status', 'technician_assigned')
      .or(`scheduled_service_date.eq.${kolkataToday},and(scheduled_service_date.is.null,preferred_date.eq.${kolkataToday})`);

    if (fetchError) {
      console.error('[Cron Reminders] Failed to query bookings:', fetchError);
      return NextResponse.json(
        { error: 'Failed to query bookings for today.', details: fetchError.message },
        { status: 500 }
      );
    }

    const eligibleBookings = bookings || [];
    let sentCount = 0;
    let skippedCount = 0;
    let failedCount = 0;
    const summaries: Array<{
      bookingRef: string;
      status: 'sent' | 'skipped' | 'failed';
      reason?: string;
      messageId?: string;
    }> = [];

    for (const booking of eligibleBookings) {
      // 1. Deliverable email check
      if (!isDeliverableCustomerEmail(booking.customer_email)) {
        skippedCount++;
        summaries.push({
          bookingRef: booking.booking_ref,
          status: 'skipped',
          reason: 'Customer email is invalid or placeholder.',
        });
        continue;
      }

      // 2. Idempotency check: has reminder already been sent for today?
      let existingNotification: any = null;
      try {
        const { data: existing } = await (adminClient as any)
          .from('booking_notifications')
          .select('*')
          .eq('booking_id', booking.id)
          .eq('notification_type', 'service_day_reminder')
          .eq('service_date', kolkataToday)
          .maybeSingle();
        existingNotification = existing;
      } catch (err) {
        console.warn('[Cron Reminders] Check audit query failed:', err);
      }

      if (existingNotification && existingNotification.notification_status === 'sent') {
        skippedCount++;
        summaries.push({
          bookingRef: booking.booking_ref,
          status: 'skipped',
          reason: `Reminder already sent on ${existingNotification.sent_at}`,
        });
        continue;
      }

      // 3. Reserve audit record lock with unique constraint
      let recordId = existingNotification?.id;
      if (!existingNotification) {
        try {
          const { data: inserted, error: lockErr } = await (adminClient as any)
            .from('booking_notifications')
            .insert({
              booking_id: booking.id,
              booking_ref: booking.booking_ref,
              notification_type: 'service_day_reminder',
              recipient_email: booking.customer_email,
              notification_status: 'pending',
              service_date: kolkataToday,
            })
            .select()
            .single();

          if (lockErr && lockErr.code === '23505') {
            skippedCount++;
            summaries.push({
              bookingRef: booking.booking_ref,
              status: 'skipped',
              reason: 'Locked by concurrent cron or reminder dispatcher.',
            });
            continue;
          }
          recordId = inserted?.id;
        } catch (lockEx) {
          console.warn('[Cron Reminders] Lock exception:', lockEx);
        }
      }

      // 4. Send email
      const dispatchResult: EmailDispatchResult = await sendServiceDayReminderEmail({
        bookingRef: booking.booking_ref,
        customerName: booking.customer_name,
        customerEmail: booking.customer_email,
        serviceType: booking.service_type,
        systemType: booking.system_type,
        serviceDate: kolkataToday,
        serviceAddress: booking.service_address,
        technicianName: booking.technician_name || booking.assigned_technician,
        technicianPhone: booking.technician_phone,
        arrivalWindow: booking.arrival_window,
      });

      if (dispatchResult.success) {
        sentCount++;
        const sentAt = new Date().toISOString();
        try {
          if (recordId) {
            await (adminClient as any)
              .from('booking_notifications')
              .update({
                notification_status: 'sent',
                sent_at: sentAt,
                provider_message_id: dispatchResult.messageId || null,
                error_message: null,
              })
              .eq('id', recordId);
          }
        } catch (dbErr) {
          console.error('[Cron Reminders] DB update sent error:', dbErr);
        }

        summaries.push({
          bookingRef: booking.booking_ref,
          status: 'sent',
          messageId: dispatchResult.messageId,
        });
      } else {
        failedCount++;
        try {
          if (recordId) {
            await (adminClient as any)
              .from('booking_notifications')
              .update({
                notification_status: 'failed',
                error_message: dispatchResult.error || 'Failed to dispatch',
              })
              .eq('id', recordId);
          }
        } catch (dbErr) {
          console.error('[Cron Reminders] DB update failed error:', dbErr);
        }

        summaries.push({
          bookingRef: booking.booking_ref,
          status: 'failed',
          reason: dispatchResult.error,
        });
      }
    }

    return NextResponse.json({
      success: true,
      service_date: kolkataToday,
      timezone: 'Asia/Kolkata (IST)',
      total_eligible: eligibleBookings.length,
      sent_count: sentCount,
      skipped_count: skippedCount,
      failed_count: failedCount,
      results: summaries,
    });
  } catch (err: unknown) {
    console.error('[Cron Reminders] Fatal handler error:', err);
    return NextResponse.json(
      { error: 'Fatal error executing service-day reminder cron.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return processServiceDayReminders(request);
}

export async function POST(request: NextRequest) {
  return processServiceDayReminders(request);
}
