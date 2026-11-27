-- ==============================================================================
-- EZCOOL — Booking Lifecycle & Automated Service-Day Reminders Migration
-- Adds 'technician_assigned' to booking_status, drops arrival_window constraint,
-- adds technician details and creates booking_notifications audit table with
-- unique idempotency constraints.
-- ==============================================================================

-- 1. Ensure uuid-ossp extension is enabled
create extension if not exists "uuid-ossp";

-- 2. Safely add 'technician_assigned' to booking_status enum if not present
do $$ begin
  alter type public.booking_status add value if not exists 'technician_assigned' after 'confirmed';
exception
  when others then null;
end $$;

-- 3. Make arrival_window optional for customer booking form simplicity
alter table public.bookings alter column arrival_window drop not null;
alter table public.bookings alter column arrival_window set default 'Scheduled by Dispatch';

-- 4. Add technician assignment, scheduling and cancellation tracking columns
alter table public.bookings
  add column if not exists technician_name text,
  add column if not exists technician_phone text,
  add column if not exists assigned_technician text,
  add column if not exists cancellation_reason text,
  add column if not exists scheduled_service_date date;

-- 5. Create the booking_notifications audit table if not exists
create table if not exists public.booking_notifications (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  booking_ref text not null,
  notification_type text not null,
  recipient_email text not null,
  notification_status text not null default 'pending' check (notification_status in ('pending', 'sent', 'failed')),
  provider_message_id text,
  error_message text,
  service_date text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  sent_at timestamp with time zone
);

-- Ensure service_date column is present if table already exists
alter table public.booking_notifications
  add column if not exists service_date text;

-- 6. Create performance indexes
create index if not exists idx_booking_notifications_booking_id on public.booking_notifications (booking_id);
create index if not exists idx_booking_notifications_booking_ref on public.booking_notifications (booking_ref);
create index if not exists idx_booking_notifications_type on public.booking_notifications (notification_type);
create index if not exists idx_booking_notifications_status on public.booking_notifications (notification_status);
create index if not exists idx_booking_notifications_service_date on public.booking_notifications (service_date);
create index if not exists idx_booking_notifications_created_at on public.booking_notifications (created_at desc);

-- 7. Idempotency Unique Constraints
-- Drop legacy strict constraint if previously created
alter table public.booking_notifications drop constraint if exists uq_booking_notification;

-- Lifecycle notifications: each lifecycle status notification can only ever be sent once per booking
create unique index if not exists uq_booking_notif_lifecycle
  on public.booking_notifications (booking_id, notification_type)
  where notification_type != 'service_day_reminder';

-- Service-Day reminders: can be sent once per booking per service date
create unique index if not exists uq_booking_notif_reminder
  on public.booking_notifications (booking_id, notification_type, service_date)
  where notification_type = 'service_day_reminder';

-- 8. Table permissions and Row-Level Security
grant usage on schema public to anon, authenticated, service_role;
grant all on table public.booking_notifications to anon, authenticated, service_role;

alter table public.booking_notifications enable row level security;

-- Policy: Allow authenticated staff to view notification history
drop policy if exists "Allow authenticated staff to read notifications" on public.booking_notifications;
create policy "Allow authenticated staff to read notifications"
  on public.booking_notifications
  for select
  to authenticated
  using (true);

-- Policy: Allow service role full access for backend dispatching
drop policy if exists "Allow service role all on notifications" on public.booking_notifications;
create policy "Allow service role all on notifications"
  on public.booking_notifications
  for all
  to service_role
  using (true)
  with check (true);
