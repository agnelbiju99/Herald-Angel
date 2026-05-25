-- Run this in your Supabase SQL editor before launching the app

create table if not exists invitees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  phone text,
  rsvp text not null default 'pending' check (rsvp in ('pending', 'attending', 'declined')),
  guest_count integer not null default 0,
  responded_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists invitees_slug_idx on invitees(slug);
create index if not exists invitees_rsvp_idx on invitees(rsvp);

-- Enable Row Level Security (allow public read/write since no auth)
alter table invitees enable row level security;

create policy "Allow public read" on invitees
  for select using (true);

create policy "Allow public insert" on invitees
  for insert with check (true);

create policy "Allow public update" on invitees
  for update using (true);

create policy "Allow public delete" on invitees
  for delete using (true);
