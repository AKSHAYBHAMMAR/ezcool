import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendBookingConfirmationEmail } from '@/lib/email';
import { ServiceType, SystemConfiguration, BookingStatus } from '@/types/database';

const VALID_SERVICES: ServiceType[] = [
  'AC Servicing',
  'AC Repair',
  'AC Installation',
  'Gas Refill & Clean',
];

const VALID_SYSTEMS: SystemConfiguration[] = [
  'Ducted Central / VRF',
  'High-Wall Split',
  'Multi-Zone Split',
  'Concealed Cassette',
  'Chiller System',
  'Other / Not Sure',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      address,
      service_type,
      system_type,
      preferred_date,
      arrival_window,
      notes,
    } = body;

    // 1. Server-side validation and sanitization
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please provide a valid full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address for booking confirmation.' },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone || '').replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }

    if (!address || typeof address !== 'string' || address.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please provide a complete service property address.' },
        { status: 400 }
      );
    }

    if (!service_type || !VALID_SERVICES.includes(service_type)) {
      return NextResponse.json(
        { error: 'Please select a valid architectural service type.' },
        { status: 400 }
      );
    }

    if (!system_type || !VALID_SYSTEMS.includes(system_type)) {
      return NextResponse.json(
        { error: 'Please select a valid AC system configuration.' },
        { status: 400 }
      );
    }

    if (!preferred_date || isNaN(Date.parse(preferred_date))) {
      return NextResponse.json(
        { error: 'Please select a valid service reservation date.' },
        { status: 400 }
      );
    }

    if (!arrival_window || typeof arrival_window !== 'string') {
      return NextResponse.json(
        { error: 'Please choose a preferred arrival window.' },
        { status: 400 }
      );
    }

    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedAddress = address.trim();

    // 2. Resolve Server-side Supabase Service-Role Client
    const adminClient = createAdminClient();

    if (!adminClient) {
      console.error(
        'Supabase configuration error: SUPABASE_SERVICE_ROLE_KEY is not configured.'
      );
      return NextResponse.json(
        {
          error:
            'Service reservation system is temporarily unconfigured. Please configure database credentials.',
        },
        { status: 503 }
      );
    }

    // 3. Insert into Supabase
    // Note: booking_ref is omitted so the database trigger tr_set_booking_ref
    // executes public.generate_booking_ref() natively for uniqueness and consistency.
    const { data: savedBooking, error: insertError } = await (adminClient as any)
      .from('bookings')
      .insert({
        customer_name: sanitizedName,
        customer_email: sanitizedEmail,
        customer_phone: cleanPhone,
        service_address: sanitizedAddress,
        service_type,
        system_type,
        preferred_date,
        arrival_window,
        status: 'queued',
        email_status: 'pending',
        notes: notes ? String(notes).trim() : null,
      })
      .select()
      .single();

    if (insertError || !savedBooking) {
      console.error('Supabase booking insert error:', insertError);
      return NextResponse.json(
        {
          error:
            'Unable to schedule booking in database. Please verify details and try again.',
        },
        { status: 500 }
      );
    }

    // 4. Attempt email delivery only AFTER database insert succeeds
    const emailResult = await sendBookingConfirmationEmail({
      bookingRef: savedBooking.booking_ref,
      customerName: savedBooking.customer_name,
      customerEmail: savedBooking.customer_email,
      serviceType: savedBooking.service_type,
      systemType: savedBooking.system_type,
      preferredDate: savedBooking.preferred_date,
      arrivalWindow: savedBooking.arrival_window,
      serviceAddress: savedBooking.service_address,
      status: savedBooking.status,
    });

    // 5. Record email delivery status in Supabase
    if (emailResult.success) {
      const sentAt = new Date().toISOString();
      await (adminClient as any)
        .from('bookings')
        .update({
          email_status: 'sent',
          email_sent_at: sentAt,
          email_message_id: emailResult.messageId || null,
          email_error: null,
        })
        .eq('id', savedBooking.id);

      savedBooking.email_status = 'sent';
      savedBooking.email_sent_at = sentAt;
      savedBooking.email_message_id = emailResult.messageId;
    } else {
      await (adminClient as any)
        .from('bookings')
        .update({
          email_status: 'failed',
          email_error: emailResult.error || 'Delivery failed',
        })
        .eq('id', savedBooking.id);

      savedBooking.email_status = 'failed';
      savedBooking.email_error = emailResult.error;
    }

    // 6. Return response containing persisted booking and email delivery status
    return NextResponse.json(
      {
        success: true,
        booking: {
          id: savedBooking.id,
          booking_ref: savedBooking.booking_ref,
          customer_name: savedBooking.customer_name,
          customer_email: savedBooking.customer_email,
          customer_phone: savedBooking.customer_phone,
          service_address: savedBooking.service_address,
          service_type: savedBooking.service_type,
          system_type: savedBooking.system_type,
          preferred_date: savedBooking.preferred_date,
          arrival_window: savedBooking.arrival_window,
          status: savedBooking.status,
          email_status: savedBooking.email_status,
          created_at: savedBooking.created_at,
        },
        emailDelivery: {
          sent: emailResult.success,
          status: savedBooking.email_status,
          message: emailResult.success
            ? 'Confirmation email sent successfully.'
            : 'Booking confirmed. Note: confirmation email could not be sent.',
        },
        message: 'Service reservation queued successfully.',
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('API /api/bookings exception:', err);
    return NextResponse.json(
      { error: 'Internal server error processing booking reservation.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const adminApiKey = request.headers.get('x-admin-key') || '';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    const isAuthorized =
      Boolean(serviceRoleKey) &&
      (authHeader === `Bearer ${serviceRoleKey}` || adminApiKey === serviceRoleKey);

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized. Public access to customer booking records is restricted.' },
        { status: 401 }
      );
    }

    const adminClient = createAdminClient();
    if (!adminClient) {
      return NextResponse.json(
        { error: 'Database service is currently unconfigured.' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);
    const status = searchParams.get('status');

    let query = (adminClient as any)
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq('status', status as BookingStatus);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Failed to fetch bookings:', error);
      return NextResponse.json(
        { error: 'Failed to retrieve bookings.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, count: data.length, bookings: data });
  } catch (err: unknown) {
    console.error('API GET /api/bookings exception:', err);
    return NextResponse.json(
      { error: 'Internal server error retrieving bookings.' },
      { status: 500 }
    );
  }
}
