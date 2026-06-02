-- Barzahlung bei Abholung als Option für Jäger
alter table public.listings add column if not exists barzahlung boolean default false;
