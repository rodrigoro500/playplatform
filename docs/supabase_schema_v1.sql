-- PlayPlatform Supabase Schema V1
-- Run this file in Supabase SQL Editor.

create extension if not exists pgcrypto;

do $$ begin
  create type public.playplatform_table_status as enum (
    'open',
    'active',
    'paused',
    'closed'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.playplatform_invite_status as enum (
    'pending',
    'claimed',
    'cancelled',
    'expired'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.playplatform_player_status as enum (
    'invited',
    'pending_approval',
    'approved',
    'seated',
    'left',
    'blocked'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.playplatform_chip_request_status as enum (
    'pending',
    'approved',
    'rejected',
    'cancelled'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.playplatform_wallet_transaction_type as enum (
    'credit',
    'debit',
    'bet_hold',
    'bet_refund',
    'bet_payout',
    'admin_adjustment'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.play_tables (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  game_type text not null default 'PASE',
  status public.playplatform_table_status not null default 'open',
  min_main_pot integer not null default 20000 check (min_main_pot >= 0),
  max_players integer not null default 8 check (max_players between 2 and 12),
  created_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.table_invites (
  id uuid primary key default gen_random_uuid(),
  table_id uuid not null references public.play_tables(id) on delete cascade,
  invite_code text not null unique,
  player_slot integer check (player_slot is null or player_slot > 0),
  status public.playplatform_invite_status not null default 'pending',
  expires_at timestamptz,
  claimed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.table_players (
  id uuid primary key default gen_random_uuid(),
  table_id uuid not null references public.play_tables(id) on delete cascade,
  invite_id uuid references public.table_invites(id) on delete set null,
  display_name text not null,
  seat_number integer check (seat_number is null or seat_number > 0),
  status public.playplatform_player_status not null default 'pending_approval',
  muted boolean not null default true,
  mic_enabled boolean not null default false,
  joined_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (table_id, seat_number)
);

create table if not exists public.wallets (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null unique references public.table_players(id) on delete cascade,
  balance integer not null default 0 check (balance >= 0),
  currency text not null default 'Gs',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chip_requests (
  id uuid primary key default gen_random_uuid(),
  table_id uuid not null references public.play_tables(id) on delete cascade,
  player_id uuid references public.table_players(id) on delete set null,
  requested_amount integer not null check (requested_amount > 0),
  approved_amount integer check (approved_amount is null or approved_amount >= 0),
  status public.playplatform_chip_request_status not null default 'pending',
  player_note text,
  admin_note text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid not null references public.wallets(id) on delete cascade,
  table_id uuid references public.play_tables(id) on delete set null,
  player_id uuid references public.table_players(id) on delete set null,
  amount integer not null,
  transaction_type public.playplatform_wallet_transaction_type not null,
  reference_type text,
  reference_id uuid,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.table_events (
  id uuid primary key default gen_random_uuid(),
  table_id uuid not null references public.play_tables(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.game_snapshots (
  id uuid primary key default gen_random_uuid(),
  table_id uuid not null unique references public.play_tables(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  version integer not null default 1,
  updated_at timestamptz not null default now()
);

create index if not exists table_invites_table_id_idx
  on public.table_invites(table_id);

create index if not exists table_players_table_id_idx
  on public.table_players(table_id);

create index if not exists chip_requests_table_id_status_idx
  on public.chip_requests(table_id, status);

create index if not exists wallet_transactions_wallet_id_created_at_idx
  on public.wallet_transactions(wallet_id, created_at desc);

create index if not exists table_events_table_id_created_at_idx
  on public.table_events(table_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_play_tables_updated_at on public.play_tables;
create trigger set_play_tables_updated_at
before update on public.play_tables
for each row
execute function public.set_updated_at();

drop trigger if exists set_table_players_updated_at on public.table_players;
create trigger set_table_players_updated_at
before update on public.table_players
for each row
execute function public.set_updated_at();

drop trigger if exists set_wallets_updated_at on public.wallets;
create trigger set_wallets_updated_at
before update on public.wallets
for each row
execute function public.set_updated_at();

drop trigger if exists set_game_snapshots_updated_at on public.game_snapshots;
create trigger set_game_snapshots_updated_at
before update on public.game_snapshots
for each row
execute function public.set_updated_at();

create or replace function public.create_wallet_for_approved_player()
returns trigger
language plpgsql
as $$
begin
  if new.status in ('approved', 'seated') then
    insert into public.wallets(player_id, balance)
    values (new.id, 0)
    on conflict (player_id) do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists create_wallet_after_player_approval on public.table_players;
create trigger create_wallet_after_player_approval
after insert or update of status on public.table_players
for each row
execute function public.create_wallet_for_approved_player();

create or replace function public.apply_wallet_transaction()
returns trigger
language plpgsql
as $$
begin
  update public.wallets
  set balance = balance + new.amount
  where id = new.wallet_id;

  return new;
end;
$$;

drop trigger if exists apply_wallet_transaction_after_insert on public.wallet_transactions;
create trigger apply_wallet_transaction_after_insert
after insert on public.wallet_transactions
for each row
execute function public.apply_wallet_transaction();

alter table public.play_tables enable row level security;
alter table public.table_invites enable row level security;
alter table public.table_players enable row level security;
alter table public.wallets enable row level security;
alter table public.chip_requests enable row level security;
alter table public.wallet_transactions enable row level security;
alter table public.table_events enable row level security;
alter table public.game_snapshots enable row level security;

-- MVP policies for first public testing.
-- These are intentionally permissive until PlayPlatform adds real admin/player auth.
-- Tighten these before handling real money or production users.

drop policy if exists "mvp public read play tables" on public.play_tables;
create policy "mvp public read play tables"
on public.play_tables for select
using (true);

drop policy if exists "mvp public write play tables" on public.play_tables;
create policy "mvp public write play tables"
on public.play_tables for all
using (true)
with check (true);

drop policy if exists "mvp public read table invites" on public.table_invites;
create policy "mvp public read table invites"
on public.table_invites for select
using (true);

drop policy if exists "mvp public write table invites" on public.table_invites;
create policy "mvp public write table invites"
on public.table_invites for all
using (true)
with check (true);

drop policy if exists "mvp public read table players" on public.table_players;
create policy "mvp public read table players"
on public.table_players for select
using (true);

drop policy if exists "mvp public write table players" on public.table_players;
create policy "mvp public write table players"
on public.table_players for all
using (true)
with check (true);

drop policy if exists "mvp public read wallets" on public.wallets;
create policy "mvp public read wallets"
on public.wallets for select
using (true);

drop policy if exists "mvp public write wallets" on public.wallets;
create policy "mvp public write wallets"
on public.wallets for all
using (true)
with check (true);

drop policy if exists "mvp public read chip requests" on public.chip_requests;
create policy "mvp public read chip requests"
on public.chip_requests for select
using (true);

drop policy if exists "mvp public write chip requests" on public.chip_requests;
create policy "mvp public write chip requests"
on public.chip_requests for all
using (true)
with check (true);

drop policy if exists "mvp public read wallet transactions" on public.wallet_transactions;
create policy "mvp public read wallet transactions"
on public.wallet_transactions for select
using (true);

drop policy if exists "mvp public write wallet transactions" on public.wallet_transactions;
create policy "mvp public write wallet transactions"
on public.wallet_transactions for all
using (true)
with check (true);

drop policy if exists "mvp public read table events" on public.table_events;
create policy "mvp public read table events"
on public.table_events for select
using (true);

drop policy if exists "mvp public write table events" on public.table_events;
create policy "mvp public write table events"
on public.table_events for all
using (true)
with check (true);

drop policy if exists "mvp public read game snapshots" on public.game_snapshots;
create policy "mvp public read game snapshots"
on public.game_snapshots for select
using (true);

drop policy if exists "mvp public write game snapshots" on public.game_snapshots;
create policy "mvp public write game snapshots"
on public.game_snapshots for all
using (true)
with check (true);

insert into public.play_tables(code, name, game_type, status, min_main_pot, max_players)
values ('PASE-1024', 'Pase VIP #1024', 'PASE', 'open', 20000, 8)
on conflict (code) do nothing;
