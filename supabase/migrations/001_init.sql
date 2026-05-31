-- Profiles
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text not null,
  phone text,
  region text,
  bio text,
  avatar_url text,
  is_jaeger boolean default false,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profiles sind öffentlich lesbar"
  on public.profiles for select using (true);

create policy "Nutzer kann eigenes Profil bearbeiten"
  on public.profiles for update using (auth.uid() = id);

-- Listings
create type tier_art as enum (
  'Reh','Hirsch','Wildschwein','Hase','Fasan','Ente','Rebhuhn','Fuchs','Sonstiges'
);

create type produkt_kategorie as enum (
  'ganzes_tier','teilzerwirkt','veredelt'
);

create type jagd_methode as enum (
  'ansitzjagd','drückjagd','bewegungsjagd','fallenjagd','sonstiges'
);

create type listing_status as enum (
  'aktiv','verkauft','reserviert','inaktiv'
);

create table public.listings (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text not null,
  tier_art tier_art not null,
  kategorie produkt_kategorie not null,
  jagd_methode jagd_methode not null,
  jagd_methode_detail text,
  gewicht_kg numeric(6,2),
  preis numeric(10,2) not null,
  preis_pro_kg boolean default false,
  region text not null,
  abholung boolean default true,
  versand boolean default false,
  status listing_status default 'aktiv',
  images text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.listings enable row level security;

create policy "Aktive Listings sind öffentlich lesbar"
  on public.listings for select using (status = 'aktiv');

create policy "Verkäufer sieht alle eigenen Listings"
  on public.listings for select using (auth.uid() = seller_id);

create policy "Verkäufer kann Listings erstellen"
  on public.listings for insert with check (auth.uid() = seller_id);

create policy "Verkäufer kann eigene Listings bearbeiten"
  on public.listings for update using (auth.uid() = seller_id);

create policy "Verkäufer kann eigene Listings löschen"
  on public.listings for delete using (auth.uid() = seller_id);

-- Inquiries
create table public.inquiries (
  id uuid default gen_random_uuid() primary key,
  listing_id uuid references public.listings(id) on delete cascade not null,
  buyer_id uuid references public.profiles(id) on delete cascade not null,
  message text not null,
  created_at timestamptz default now()
);

alter table public.inquiries enable row level security;

create policy "Käufer kann eigene Anfragen sehen"
  on public.inquiries for select using (auth.uid() = buyer_id);

create policy "Verkäufer kann Anfragen zu seinen Listings sehen"
  on public.inquiries for select using (
    auth.uid() = (select seller_id from public.listings where id = listing_id)
  );

create policy "Käufer kann Anfragen stellen"
  on public.inquiries for insert with check (auth.uid() = buyer_id);

-- Storage bucket für Produktbilder
insert into storage.buckets (id, name, public) values ('listing-images', 'listing-images', true);

create policy "Jeder kann Bilder lesen"
  on storage.objects for select using (bucket_id = 'listing-images');

create policy "Eingeloggte Nutzer können Bilder hochladen"
  on storage.objects for insert with check (
    bucket_id = 'listing-images' and auth.role() = 'authenticated'
  );

create policy "Nutzer kann eigene Bilder löschen"
  on storage.objects for delete using (
    bucket_id = 'listing-images' and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger listings_updated_at
  before update on public.listings
  for each row execute function update_updated_at();

-- Profile auto-create on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
