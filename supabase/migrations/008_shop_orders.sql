-- 008: Shop-Bestellungen mit Steueraufschluesselung.
--
-- Bisher hinterliess ein Shop-Kauf keine Zeile in unserer Datenbank: Der
-- Stripe-Webhook stieg bei typ="shop" sofort aus, der einzige Nachweis lag
-- bei Stripe. Fuer die Buchhaltung (und fuer die Rueckmeldung an das
-- Kassensystem) braucht es einen eigenen, nachvollziehbaren Datensatz.
--
-- Steuer: shop_products.tax_key kommt aus dem Kassensystem (Versand-Satz des
-- Artikels). Beim Kauf wird er je Position eingefroren - aendert der Betrieb
-- den Satz spaeter, bleibt die Bestellung so bestehen, wie sie abgerechnet
-- wurde. Betraege in Cent, nie Gleitkomma.

alter table public.shop_products add column if not exists tax_key smallint;

create table if not exists public.shop_orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique not null,
  status text not null default 'offen',            -- offen | bezahlt | storniert
  brutto_cents integer not null default 0,
  versand_cents integer not null default 0,
  email text,
  name text,
  adresse jsonb,
  -- Rueckmeldung ans Kassensystem: null = noch nicht gemeldet
  gemeldet_at timestamptz,
  created_at timestamptz not null default now(),
  bezahlt_at timestamptz
);

create table if not exists public.shop_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.shop_orders(id) on delete cascade,
  external_ref text,
  name text not null,
  menge integer not null,
  einzel_brutto_cents integer not null,
  brutto_cents integer not null,
  -- Eingefrorener Steuersatz: 19.00 / 7.00 - als numeric, damit die
  -- Buchhaltung nicht aus einem Schluessel rueckrechnen muss.
  ust_prozent numeric(5,2) not null default 7.00,
  netto_cents integer not null,
  ust_cents integer not null
);

create index if not exists shop_order_items_order on public.shop_order_items (order_id);
create index if not exists shop_orders_offen on public.shop_orders (status, gemeldet_at);

-- Bestellungen sind NICHT oeffentlich lesbar: Sie enthalten Namen und
-- Adressen. Zugriff nur ueber den Service-Role-Key (Webhook, Rueckmeldung).
alter table public.shop_orders enable row level security;
alter table public.shop_order_items enable row level security;
