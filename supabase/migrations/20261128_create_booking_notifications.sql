-- ==============================================================================
-- EZCOOL — Booking Status Notifications Audit Table Migration
-- Table: public.booking_notifications
-- Description: Audit log for all customer notification events with idempotency constraints
-- ==============================================================================

-- 1. Ensure uuid-ossp extension is enabled
create extension if not exists "uuid-ossp";

-- 2. Add optional tracking columns to public.bookings if not already present
alter table public.bookings
  add column if not exists assigned_technician text,
  add column if not exists cancellation_reason text;

-- 3. Create the booking_notifications audit table
create table if not exists public.booking_notifications (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  booking_ref text not null,
  notification_type text not null,
  recipient_email text not null,
  notification_status text not null default 'pending' check (notification_status in ('pending', 'sent', 'failed')),
  provider_message_id text,
  error_message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  sent_at timestamp with time zone,
  constraint uq_booking_notification unique (booking_id, notification_type)
);

-- 4. Create performance and audit indexes
create index if not exists idx_booking_notifications_booking_id
  on public.booking_notifications (booking_id);

create index if not exists idx_booking_notifications_booking_ref
  on public.booking_notifications (booking_ref);

create index if not exists idx_booking_notifications_status
  on public.booking_notifications (notification_status);

create index if not exists idx_booking_notifications_created_at
  on public.booking_notifications (created_at desc);

-- 5. Grant table permissions
grant usage on schema public to anon, authenticated, service_role;
grant all on table public.booking_notifications to anon, authenticated, service_role;

-- 6. Configure Row-Level Security (RLS)
alter table public.booking_notifications enable row level security;

-- Policy: Allow authenticated staff to view notification audit records
drop policy if exists "Allow authenticated staff to read notifications" on public.booking_notifications;
create policy "Allow authenticated staff to read notifications"
  on public.booking_notifications
  for select
  to authenticated
  using (true);

-- Policy: Allow service role full access for backend dispatching and updates
drop policy if exists "Allow service role all on notifications" on public.booking_notifications;
create policy "Allow service role all on notifications"
  on public.booking_notifications
  for all
  to service_role
  using (true)
  with check (true);
