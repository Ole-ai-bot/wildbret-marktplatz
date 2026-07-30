-- 006: Partner-Import — Produkte aus externen Kassensystemen (GastroAgent).
--
-- Der Onlineshop rendert bislang die statische Liste in src/lib/products.ts.
-- Diese Tabelle ist eine ADDITIVE Ebene darueber: Partner (z. B. das
-- GastroAgent-Kassensystem eines Erzeugers) laden Produkte per
-- /api/partner-import hoch, die Seite mischt beide Quellen. Die statische
-- Liste bleibt unangetastet — kein Risiko fuer den bestehenden Shop.
--
-- external_ref ist der Upsert-Schluessel (Produkt-ID des Kassensystems):
-- mehrfaches Laden aktualisiert, statt Duplikate anzulegen.
-- preis_cents als integer: Centbetraege statt Gleitkomma, wie im Kassensystem.

create table if not exists public.shop_products (
  id uuid default gen_random_uuid() primary key,
  external_ref text not null unique,
  name text not null,
  kurz text not null default '',
  kategorie text not null default 'wildmanufaktur',
  preis_cents integer not null check (preis_cents >= 0),
  gewicht text not null default '',
  bild text,
  erzeuger text,
  tag text,
  aktiv boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.shop_products enable row level security;

-- Oeffentlich lesbar sind nur aktive Produkte; geschrieben wird ausschliesslich
-- serverseitig ueber den Service-Role-Key (keine Insert/Update-Policy noetig).
create policy "Aktive Shop-Produkte sind oeffentlich lesbar"
  on public.shop_products for select using (aktiv = true);
