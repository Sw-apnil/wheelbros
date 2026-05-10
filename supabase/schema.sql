create extension if not exists "pgcrypto";

create type public.vehicle_category as enum (
  'scooty',
  'motorcycles',
  'adventure-bikes'
);

create type public.vehicle_status as enum (
  'Available',
  'Limited',
  'Booked'
);

create type public.booking_status as enum (
  'Pending',
  'Accepted',
  'Rejected'
);

create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  brand text not null,
  category public.vehicle_category not null,
  price_per_day integer not null check (price_per_day > 0),
  rating numeric(2, 1) not null default 4.7,
  reviews integer not null default 0,
  fuel text not null check (fuel in ('Petrol', 'Electric')),
  transmission text not null check (transmission in ('Manual', 'Automatic')),
  status public.vehicle_status not null default 'Available',
  image_url text,
  short_description text,
  specs jsonb not null default '{}'::jsonb,
  accessories text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid references public.vehicles(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  pickup_date date not null,
  return_date date not null,
  pickup_preference text not null,
  id_proof_url text,
  amount integer not null check (amount >= 0),
  status public.booking_status not null default 'Pending',
  documents_status text not null default 'Review',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  detail text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger vehicles_set_updated_at
before update on public.vehicles
for each row execute function public.set_updated_at();

create trigger bookings_set_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();

alter table public.vehicles enable row level security;
alter table public.bookings enable row level security;
alter table public.notifications enable row level security;

create policy "Public can view available vehicles"
on public.vehicles
for select
using (true);

create policy "Public can create bookings"
on public.bookings
for insert
with check (true);

create policy "Admins can manage vehicles"
on public.vehicles
for all
using (auth.jwt() ->> 'role' = 'admin')
with check (auth.jwt() ->> 'role' = 'admin');

create policy "Admins can manage bookings"
on public.bookings
for all
using (auth.jwt() ->> 'role' = 'admin')
with check (auth.jwt() ->> 'role' = 'admin');

create policy "Admins can view notifications"
on public.notifications
for select
using (auth.jwt() ->> 'role' = 'admin');
