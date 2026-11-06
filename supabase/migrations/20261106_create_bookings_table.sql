-- ==============================================================================
-- EZCOOL — Supabase PostgreSQL Database Migration
-- Table: public.bookings
-- Description: Stores all AC service appointments with status and tracking
-- ==============================================================================

-- 1. Enable UUID generator extension
create extension if not exists "uuid-ossp";

-- 2. Enums for type safety and validation
do $$ begin
  if not exists (select 1 from pg_type where typname = 'booking_status') then
    create type public.booking_status as enum (
      'queued',
      'confirmed',
      'in_progress',
      'completed',
      'cancelled'
    );
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'service_type') then
    create type public.service_type as enum (
      'AC Servicing',
      'AC Repair',
      'AC Installation',
      'Gas Refill & Clean'
    );
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'system_configuration') then
    create type public.system_configuration as enum (
      'Ducted Central / VRF',
      'High-Wall Split',
      'Multi-Zone Split',
      'Concealed Cassette',
      'Chiller System',
      'Other / Not Sure'
    );
  end if;
end $$;

-- 3. Create the bookings table
create table if not exists public.bookings (
  id uuid primary key default uuid_generate_v4(),
  booking_ref text not null unique,
  customer_name text not null,
  customer_phone text not null,
  service_address text not null,
  service_type public.service_type not null,
  system_type public.system_configuration not null,
  preferred_date date not null,
  arrival_window text not null,
  status public.booking_status not null default 'queued',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Secure generator function for unique EZCOOL booking references (e.g. EZCOOL-482910)
create or replace function public.generate_booking_ref()
returns text as $$
declare
  candidate_ref text;
  already_exists boolean;
begin
  loop
    candidate_ref := 'EZCOOL-' || lpad(floor(random() * 900000 + 100000)::text, 6, '0');
    select exists(select 1 from public.bookings where booking_ref = candidate_ref) into already_exists;
    exit when not already_exists;
  end loop;
  return candidate_ref;
end;
$$ language plpgsql volatile;

-- 5. Trigger to automatically set booking_ref on insert if not provided
create or replace function public.set_booking_ref_trigger()
returns trigger as $$
begin
  if new.booking_ref is null or new.booking_ref = '' then
    new.booking_ref := public.generate_booking_ref();
  end if;
  new.updated_at := timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists tr_set_booking_ref on public.bookings;
create trigger tr_set_booking_ref
  before insert on public.bookings
  for each row
  execute function public.set_booking_ref_trigger();

-- 6. Trigger to automatically update updated_at on record changes
create or replace function public.update_booking_timestamp()
returns trigger as $$
begin
  new.updated_at := timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists tr_update_booking_timestamp on public.bookings;
create trigger tr_update_booking_timestamp
  before update on public.bookings
  for each row
  execute function public.update_booking_timestamp();

-- 7. Grant table access to Supabase API roles (RLS policies below enforce row-level security)
grant usage on schema public to anon, authenticated, service_role;
grant all on table public.bookings to anon, authenticated, service_role;
grant all on all sequences in schema public to anon, authenticated, service_role;
grant all on all functions in schema public to anon, authenticated, service_role;

-- 8. Row Level Security (RLS) Configuration
alter table public.bookings enable row level security;

-- Policy A: Allow anonymous / public users to insert new bookings
drop policy if exists "Allow public creation of bookings" on public.bookings;
create policy "Allow public creation of bookings"
  on public.bookings
  for insert
  to anon, authenticated
  with check (true);

-- Policy B: Allow authenticated staff / admins to view all bookings
drop policy if exists "Allow authenticated staff to read bookings" on public.bookings;
create policy "Allow authenticated staff to read bookings"
  on public.bookings
  for select
  to authenticated
  using (true);

-- Policy C: Allow authenticated staff / admins to update booking status
drop policy if exists "Allow authenticated staff to update bookings" on public.bookings;
create policy "Allow authenticated staff to update bookings"
  on public.bookings
  for update
  to authenticated
  using (true)
  with check (true);

-- 9. Performance Indexes
create index if not exists idx_bookings_booking_ref on public.bookings(booking_ref);
create index if not exists idx_bookings_customer_phone on public.bookings(customer_phone);
create index if not exists idx_bookings_preferred_date on public.bookings(preferred_date);
create index if not exists idx_bookings_status on public.bookings(status);
create index if not exists idx_bookings_created_at on public.bookings(created_at desc);

