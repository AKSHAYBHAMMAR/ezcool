-- ==============================================================================
-- EZCOOL — Add Customer Email & Notification Tracking Migration
-- Table: public.bookings
-- Description: Adds customer_email and email notification tracking fields
-- ==============================================================================

-- 1. Create email_notification_status enum if not exists
do $$ begin
  if not exists (select 1 from pg_type where typname = 'email_notification_status') then
    create type public.email_notification_status as enum (
      'pending',
      'sent',
      'failed'
    );
  end if;
end $$;

-- 2. Add customer_email to public.bookings
-- Safe addition: ensure existing bookings remain valid without data loss
alter table public.bookings
  add column if not exists customer_email text;

-- Update any existing records without an email to a safe fallback
update public.bookings
  set customer_email = 'legacy-booking@ezcool.local'
  where customer_email is null or customer_email = '';

-- Set default and not null constraint for all future bookings
alter table public.bookings
  alter column customer_email set default '',
  alter column customer_email set not null;

-- 3. Add email notification tracking columns to public.bookings
alter table public.bookings
  add column if not exists email_status text not null default 'pending' check (email_status in ('pending', 'sent', 'failed')),
  add column if not exists email_sent_at timestamp with time zone,
  add column if not exists email_message_id text,
  add column if not exists email_error text;

-- 4. Create performance indexes for notification audits and customer lookups
create index if not exists idx_bookings_customer_email
  on public.bookings (customer_email);

create index if not exists idx_bookings_email_status
  on public.bookings (email_status);
