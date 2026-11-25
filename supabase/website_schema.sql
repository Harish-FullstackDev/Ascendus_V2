-- =====================================================================
-- SST website — Supabase schema (website project, NOT the HRMS project)
-- Project: fzqijnwjzxsuvyflfoae
--
-- Covers what the site reads/writes through src/lib/supabaseClient.ts:
--   leads, inquiries, services, marketing_campaigns, customers,
--   blogs, case_studies, white_papers, storage bucket "blog-images".
-- Jobs live in the HRMS project and are intentionally not created here.
--
-- Run once in Supabase Dashboard -> SQL Editor. Safe to re-run.
-- Columns follow src/types/database.types.ts and the API routes.
-- =====================================================================

create extension if not exists pgcrypto;

-- Keeps updated_at current on every UPDATE.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------
-- marketing_campaigns  (referenced by leads; used by /api/sales/dashboard)
-- ---------------------------------------------------------------------
create table if not exists public.marketing_campaigns (
  id            uuid primary key default gen_random_uuid(),
  campaign_name text not null,
  source        text not null,
  medium        text,
  utm_term      text,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- services  (read publicly by /api/services; referenced by inquiries)
-- ---------------------------------------------------------------------
create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text not null default '',
  category    text not null default '',
  base_price  numeric,
  is_active   boolean not null default true,
  metadata    jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- leads  (contact, book-a-call, consultation, newsletter forms)
-- email is unique: /api/newsletter upserts with onConflict 'email', and the
-- form routes map duplicate-email error 23505 to "already registered".
-- ---------------------------------------------------------------------
create table if not exists public.leads (
  id                    uuid primary key default gen_random_uuid(),
  first_name            text not null,
  last_name             text not null,
  email                 text not null unique,
  phone                 text,
  company               text,
  company_size          text,
  industry              text check (industry in (
                          'Oil & Gas', 'Manufacturing', 'Finance', 'Healthcare',
                          'Retail', 'Construction', 'Public Sector')),
  problem_summary       text,
  status                text not null default 'New' check (status in (
                          'New', 'Contacted', 'Qualified', 'Converted', 'Lost', 'Rejected')),
  lead_source           text not null default 'Web Channel',
  marketing_campaign_id uuid references public.marketing_campaigns (id) on delete set null,
  consent_given         boolean not null default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists leads_created_at_idx  on public.leads (created_at desc);
create index if not exists leads_lead_source_idx on public.leads (lead_source);
create index if not exists leads_status_idx      on public.leads (status);

-- ---------------------------------------------------------------------
-- inquiries  (one row per form submission, linked to a lead)
-- 'Direct Email' is written by /api/consultation.
-- ---------------------------------------------------------------------
create table if not exists public.inquiries (
  id                      uuid primary key default gen_random_uuid(),
  lead_id                 uuid not null references public.leads (id) on delete cascade,
  service_id              uuid references public.services (id) on delete set null,
  message                 text not null,
  inquiry_type            text not null check (inquiry_type in (
                            'Contact Form', 'Service Detail', 'Callback Request',
                            'Newsletter', 'Direct Email')),
  preferred_callback_time text,
  utm_metadata            jsonb not null default '{}'::jsonb,
  created_at              timestamptz not null default now()
);

create index if not exists inquiries_lead_id_idx    on public.inquiries (lead_id);
create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);

-- ---------------------------------------------------------------------
-- customers  (converted leads)
-- ---------------------------------------------------------------------
create table if not exists public.customers (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid not null references public.leads (id) on delete restrict,
  company_name  text not null,
  industry      text not null check (industry in (
                  'Oil & Gas', 'Manufacturing', 'Finance', 'Healthcare',
                  'Retail', 'Construction', 'Public Sector')),
  contact_email text not null,
  contact_phone text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- blogs  (/blog, /blog/[slug]; written by /api/blog)
-- sections: [{ heading, content, image, caption }]
-- ---------------------------------------------------------------------
create table if not exists public.blogs (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  cover_image  text not null,
  author       text not null,
  publish_date date not null default current_date,
  sections     jsonb not null default '[]'::jsonb,
  created_at   timestamptz not null default now()
);

create index if not exists blogs_publish_date_idx on public.blogs (publish_date desc);

-- ---------------------------------------------------------------------
-- case_studies  (insights; merged with static entries in src/lib/caseStudies.js)
-- ---------------------------------------------------------------------
create table if not exists public.case_studies (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  category     text not null,
  summary      text not null,
  cover_image  text not null,
  publish_date date not null default current_date,
  author       text not null,
  meta_line    text,
  tags         text[] not null default '{}',
  highlights   jsonb not null default '[]'::jsonb,
  sections     jsonb not null default '[]'::jsonb,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists case_studies_publish_date_idx on public.case_studies (publish_date desc);

-- ---------------------------------------------------------------------
-- white_papers  (insights; src/lib/whitepapers.js)
-- ---------------------------------------------------------------------
create table if not exists public.white_papers (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  category     text not null,
  summary      text not null,
  cover_image  text not null,
  publish_date date not null default current_date,
  author       text not null,
  meta_line    text,
  tags         text[] not null default '{}',
  file_info    text,
  download_url text,
  sections     jsonb not null default '[]'::jsonb,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists white_papers_publish_date_idx on public.white_papers (publish_date desc);

-- ---------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array['services', 'leads', 'customers', 'case_studies', 'white_papers']
  loop
    execute format('drop trigger if exists %I_set_updated_at on public.%I', t, t);
    execute format(
      'create trigger %I_set_updated_at before update on public.%I
         for each row execute function public.set_updated_at()', t, t);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------
-- Row Level Security
-- Every table has RLS on. Server routes use the service role key, which
-- bypasses RLS, so form inserts need no policy.
-- The browser (publishable key) may only READ published content.
-- Leads, inquiries, customers and campaigns are not readable from the browser.
-- ---------------------------------------------------------------------
alter table public.marketing_campaigns enable row level security;
alter table public.services            enable row level security;
alter table public.leads               enable row level security;
alter table public.inquiries           enable row level security;
alter table public.customers           enable row level security;
alter table public.blogs               enable row level security;
alter table public.case_studies        enable row level security;
alter table public.white_papers        enable row level security;

drop policy if exists "Public read blogs" on public.blogs;
create policy "Public read blogs" on public.blogs
  for select to anon, authenticated using (true);

drop policy if exists "Public read case studies" on public.case_studies;
create policy "Public read case studies" on public.case_studies
  for select to anon, authenticated using (true);

drop policy if exists "Public read white papers" on public.white_papers;
create policy "Public read white papers" on public.white_papers
  for select to anon, authenticated using (true);

drop policy if exists "Public read active services" on public.services;
create policy "Public read active services" on public.services
  for select to anon, authenticated using (is_active);

-- ---------------------------------------------------------------------
-- Storage: public bucket for blog cover and section images (/api/blog).
-- Uploads go through the service role; anyone can view via public URL.
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do update set public = excluded.public;

-- Reload PostgREST so the new tables are visible to the API immediately.
notify pgrst, 'reload schema';
