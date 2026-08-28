-- Apply this in the ACTUAL Supabase project containing public.jobs.
-- Public users may read jobs; only authenticated allow-listed admins may write.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.jobs enable row level security;

revoke all on public.admin_users from anon, authenticated;
grant select on public.admin_users to authenticated;

drop policy if exists "Admins can read their own admin record" on public.admin_users;
create policy "Admins can read their own admin record"
on public.admin_users for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Anyone can read jobs" on public.jobs;
create policy "Anyone can read jobs"
on public.jobs for select to anon, authenticated using (true);

drop policy if exists "Admins can insert jobs" on public.jobs;
create policy "Admins can insert jobs"
on public.jobs for insert to authenticated
with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

drop policy if exists "Admins can update jobs" on public.jobs;
create policy "Admins can update jobs"
on public.jobs for update to authenticated
using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

drop policy if exists "Admins can delete jobs" on public.jobs;
create policy "Admins can delete jobs"
on public.jobs for delete to authenticated
using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

-- Add an admin manually, never from the public client:
-- insert into public.admin_users (user_id) values ('YOUR-AUTH-USER-UUID');
