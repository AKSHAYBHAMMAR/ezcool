import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

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

    const adminClient = createAdminClient();
    const serverClient = createClient();
    const supabase = adminClient || serverClient;

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database service is currently unconfigured.' },
        { status: 503 }
      );
    }

    let query = supabase
      .from('bookings')
      .select(
        'booking_ref, customer_name, service_type, system_type, preferred_date, arrival_window, status, created_at'
      )
      .eq('booking_ref', bookingRef);

    if (phone) {
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

