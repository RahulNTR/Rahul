-- Script Sahayak — Sprint 1 schema
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  preferred_language text default 'English',
  preferred_genres text[] default '{}',
  writer_type text default 'Aspiring Writer',
  experience text default 'Beginner',
  created_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  format text not null,
  language text not null,
  genres text[] not null default '{}',
  audience text[] not null default '{}',
  tones text[] not null default '{}',
  idea text,
  stage text not null default 'Idea',
  progress int not null default 0 check (progress between 0 and 100),
  status text not null default 'active' check (status in ('active','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_user_idx on public.projects(user_id, updated_at desc);

-- Scripts are confidential: every row is visible only to its owner.
alter table public.profiles enable row level security;
alter table public.projects enable row level security;

create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "own projects" on public.projects
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.touch_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;

create trigger projects_touch before update on public.projects
  for each row execute function public.touch_updated_at();

-- Create a profile row on signup.
create or replace function public.handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, full_name) values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end; $$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();
