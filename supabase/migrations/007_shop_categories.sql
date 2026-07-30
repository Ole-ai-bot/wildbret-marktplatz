-- 007: Shop-Kategorien als Daten — der Partner-Import legt fehlende an.
--
-- Bisher waren die Shop-Kategorien eine feste Liste im Code (KATEGORIEN in
-- src/lib/products.ts). Laedt das Kassensystem einen Artikel mit einer
-- Warengruppe, die es hier nicht gibt (z. B. "Wein"), musste jemand die
-- Rubrik von Hand in den Code schreiben. Diese Tabelle ist die additive
-- Ebene darueber: Der Import legt unbekannte Kategorien selbst an, die Seite
-- mischt beide Quellen. Die statische Liste bleibt unangetastet.

create table if not exists public.shop_categories (
  id text primary key,
  label text not null,
  sort_order integer not null default 100,
  created_at timestamptz not null default now()
);

alter table public.shop_categories enable row level security;

create policy "Shop-Kategorien sind oeffentlich lesbar"
  on public.shop_categories for select using (true);

-- Wein: von Ole am 30.07.2026 gewuenscht (Chardonnay aus dem Kassensystem).
insert into public.shop_categories (id, label, sort_order)
  values ('wein', 'Wein', 50)
  on conflict (id) do nothing;
