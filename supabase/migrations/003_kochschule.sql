-- Kochkurse
create table public.kochkurse (
  id uuid default gen_random_uuid() primary key,
  titel text not null,
  beschreibung text not null,
  datum timestamptz not null,
  dauer_stunden numeric(4,1) not null,
  max_teilnehmer integer not null,
  plaetze_frei integer not null,
  preis numeric(10,2) not null,
  inhalte text[],
  bild_url text,
  aktiv boolean default true,
  created_at timestamptz default now()
);

alter table public.kochkurse enable row level security;

create policy "Kochkurse sind öffentlich lesbar"
  on public.kochkurse for select using (aktiv = true);

-- Kursbuchungen
create type buchung_status as enum ('angefragt','bestätigt','storniert');

create table public.kursbuchungen (
  id uuid default gen_random_uuid() primary key,
  kurs_id uuid references public.kochkurse(id) on delete cascade not null,
  name text not null,
  email text not null,
  telefon text,
  personen integer default 1,
  nachricht text,
  status buchung_status default 'angefragt',
  created_at timestamptz default now()
);

alter table public.kursbuchungen enable row level security;

create policy "Jeder kann Buchungsanfragen stellen"
  on public.kursbuchungen for insert with check (true);

-- Plaetze automatisch reduzieren bei Buchung
create or replace function reduce_plaetze()
returns trigger as $$
begin
  update public.kochkurse
  set plaetze_frei = plaetze_frei - new.personen
  where id = new.kurs_id;
  return new;
end;
$$ language plpgsql;

create trigger on_buchung_created
  after insert on public.kursbuchungen
  for each row execute function reduce_plaetze();

-- Beispielkurs einfügen
insert into public.kochkurse (titel, beschreibung, datum, dauer_stunden, max_teilnehmer, plaetze_frei, preis, inhalte)
values (
  'Wild zerlegen & zubereiten',
  'Lerne von Grund auf wie man Wild fachgerecht zerlegt und zu köstlichen Gerichten verarbeitet. Für Anfänger und Fortgeschrittene geeignet.',
  now() + interval '14 days',
  4,
  12,
  8,
  89,
  ARRAY['Grundlagen der Wildzerlegung', 'Hygiene & Lebensmittelsicherheit', 'Klassische Wildgerichte', 'Marinieren & Würzen', 'Gemeinsames Essen am Ende']
);
