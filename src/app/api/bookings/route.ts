import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { ServiceType, SystemConfiguration, BookingStatus, BookingInsert } from '@/types/database';

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
  'Other / Not Sure',
];

function generateFallbackRef(): string {
  return `EZCOOL-${Math.floor(100000 + Math.random() * 900000)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      address,
      service_type,
      system_type,
      preferred_date,
      arrival_window,
      notes,
    } = body;

    // 1. Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please provide a valid full name (minimum 2 characters).' },
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
    const sanitizedAddress = address.trim();
    const candidateRef = generateFallbackRef();

    // 2. Resolve Supabase Client
    const adminClient = createAdminClient();
    const supabase = adminClient || createClient();

    if (!supabase) {
      console.error(
        'Supabase configuration missing: NEXT_PUBLIC_SUPABASE_URL and API key not configured.'
      );
      return NextResponse.json(
        {
          error:
            'Service reservation system is temporarily unconfigured. Please configure database credentials.',
        },
        { status: 503 }
      );
    }

    // 3. Generate unique ID and reference code
    const bookingId = crypto.randomUUID();
    const bookingRef = generateFallbackRef();

    const insertPayload: BookingInsert = {
      id: bookingId,
      booking_ref: bookingRef,
      customer_name: sanitizedName,
      customer_phone: cleanPhone,
      service_address: sanitizedAddress,
      service_type,
      system_type,
      preferred_date,
      arrival_window,
      status: 'queued' as BookingStatus,
      notes: notes ? String(notes).trim() : null,
    };

    // 4. Insert into Supabase
    // If using service role key, perform .select().single()
    // If using publishable/anon key, PostgreSQL RLS permits INSERT but restricts SELECT for customer privacy
    const hasServiceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

    let savedBooking: any = null;
    let insertError: any = null;

    if (hasServiceRole) {
      const res = await (supabase as any)
        .from('bookings')
        .insert(insertPayload)
        .select()
        .single();
      savedBooking = res.data;
      insertError = res.error;
    } else {
      const res = await (supabase as any)
        .from('bookings')
        .insert(insertPayload);
      insertError = res.error;
      if (!insertError) {
        savedBooking = {
          ...insertPayload,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }
    }

    if (insertError) {
      console.error('Supabase booking insert error:', insertError);
      return NextResponse.json(
        {
          error:
            insertError.message ||
            'Unable to schedule booking in database. Please verify details and try again.',
          code: insertError.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        booking: savedBooking,
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
    // Enforce Requirement 10: Protect customer booking records from public access
    const authHeader = request.headers.get('authorization') || '';
    const adminApiKey = request.headers.get('x-admin-key') || '';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    const isAuthorized =
      (serviceRoleKey && (authHeader === `Bearer ${serviceRoleKey}` || adminApiKey === serviceRoleKey));

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
