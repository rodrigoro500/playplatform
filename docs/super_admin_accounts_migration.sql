-- PlayPlatform Super Admin / Cargadores de saldo
-- Run this file once in Supabase SQL Editor.

do $$ begin
  create type public.playplatform_account_role as enum (
    'super_admin',
    'balance_loader',
    'player'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.playplatform_account_status as enum (
    'active',
    'suspended'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.platform_accounts (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  email text not null unique,
  display_name text not null,
  role public.playplatform_account_role not null default 'player',
  status public.playplatform_account_status not null default 'active',
  credit_limit integer not null default 0 check (credit_limit >= 0),
  available_credit integer not null default 0 check (available_credit >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.platform_account_events (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references public.platform_accounts(id) on delete set null,
  event_type text not null,
  amount integer not null default 0,
  description text,
  created_at timestamptz not null default now()
);

create index if not exists platform_accounts_role_status_idx
  on public.platform_accounts(role, status);

create index if not exists platform_account_events_account_id_created_at_idx
  on public.platform_account_events(account_id, created_at desc);

drop trigger if exists set_platform_accounts_updated_at on public.platform_accounts;
create trigger set_platform_accounts_updated_at
before update on public.platform_accounts
for each row
execute function public.set_updated_at();

alter table public.platform_accounts enable row level security;
alter table public.platform_account_events enable row level security;

drop policy if exists "mvp public read platform accounts" on public.platform_accounts;
create policy "mvp public read platform accounts"
on public.platform_accounts for select
using (true);

drop policy if exists "mvp public write platform accounts" on public.platform_accounts;
create policy "mvp public write platform accounts"
on public.platform_accounts for all
using (true)
with check (true);

drop policy if exists "mvp public read platform account events" on public.platform_account_events;
create policy "mvp public read platform account events"
on public.platform_account_events for select
using (true);

drop policy if exists "mvp public write platform account events" on public.platform_account_events;
create policy "mvp public write platform account events"
on public.platform_account_events for all
using (true)
with check (true);

insert into public.platform_accounts(email, display_name, role, status, credit_limit, available_credit)
values ('admin@play.local', 'Super Admin PLAY', 'super_admin', 'active', 0, 0)
on conflict (email) do nothing;

-- After the first setup, run docs/admin_access_security_migration.sql
-- to register your real Super Admin email and close the public MVP policies.
