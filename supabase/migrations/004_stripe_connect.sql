-- Stripe Connect Account ID für Verkäufer
alter table public.profiles add column if not exists stripe_account_id text;

-- Plattform-Provision pro Bestellung
alter table public.orders add column if not exists platform_fee_cents integer default 0;
