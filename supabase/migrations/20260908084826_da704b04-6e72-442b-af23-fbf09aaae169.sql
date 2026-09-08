create table public.customer_invite_tokens (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  token text not null unique,
  used_at timestamptz,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

grant all on public.customer_invite_tokens to service_role;

alter table public.customer_invite_tokens enable row level security;