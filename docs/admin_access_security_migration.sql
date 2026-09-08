-- PlayPlatform Admin Access Security
-- Run this after creating at least one real Super Admin account.
-- Only rodrigoro_500@hotmail.com can hold the Super Admin role.

insert into public.platform_accounts(email, display_name, role, status, credit_limit, available_credit)
values ('rodrigoro_500@hotmail.com', 'Rodrigo Roman', 'super_admin', 'active', 0, 0)
on conflict (email) do update
set
  role = 'super_admin',
  status = 'active',
  updated_at = now();

create or replace function public.playplatform_current_account_role()
returns public.playplatform_account_role
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.platform_accounts
  where status = 'active'
    and (
      auth_user_id = auth.uid()
      or lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
  order by created_at asc
  limit 1;
$$;

create or replace function public.playplatform_is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.playplatform_current_account_role() = 'super_admin', false);
$$;

drop policy if exists "mvp public read platform accounts" on public.platform_accounts;
drop policy if exists "mvp public write platform accounts" on public.platform_accounts;
drop policy if exists "admin read platform accounts" on public.platform_accounts;
drop policy if exists "admin write platform accounts" on public.platform_accounts;
drop policy if exists "admin manage platform accounts" on public.platform_accounts;
drop policy if exists "self read platform account" on public.platform_accounts;

create policy "admin read platform accounts"
on public.platform_accounts for select
using (public.playplatform_is_super_admin());

create policy "admin manage platform accounts"
on public.platform_accounts for all
using (public.playplatform_is_super_admin())
with check (
  public.playplatform_is_super_admin()
  and (
    role <> 'super_admin'
    or lower(email) = 'rodrigoro_500@hotmail.com'
  )
);

create policy "self read platform account"
on public.platform_accounts for select
using (
  auth.uid() is not null
  and (
    auth_user_id = auth.uid()
    or lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  )
);

drop policy if exists "mvp public read platform account events" on public.platform_account_events;
drop policy if exists "mvp public write platform account events" on public.platform_account_events;
drop policy if exists "admin read platform account events" on public.platform_account_events;
drop policy if exists "admin write platform account events" on public.platform_account_events;

create policy "admin read platform account events"
on public.platform_account_events for select
using (public.playplatform_is_super_admin());

create policy "admin write platform account events"
on public.platform_account_events for all
using (public.playplatform_is_super_admin())
with check (public.playplatform_is_super_admin());
