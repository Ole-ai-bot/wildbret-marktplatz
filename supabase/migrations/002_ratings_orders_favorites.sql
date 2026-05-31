-- Orders / Bestellungen
create type order_status as enum ('pending','paid','shipped','delivered','cancelled');

create table public.orders (
  id uuid default gen_random_uuid() primary key,
  listing_id uuid references public.listings(id) on delete set null,
  buyer_id uuid references public.profiles(id) on delete cascade not null,
  seller_id uuid references public.profiles(id) on delete cascade not null,
  stripe_session_id text unique,
  stripe_payment_intent text,
  amount_cents integer not null,
  status order_status default 'pending',
  shipping_name text,
  shipping_address text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.orders enable row level security;

create policy "Käufer sieht eigene Bestellungen"
  on public.orders for select using (auth.uid() = buyer_id);

create policy "Verkäufer sieht eigene Bestellungen"
  on public.orders for select using (auth.uid() = seller_id);

create policy "System kann Bestellungen anlegen"
  on public.orders for insert with check (auth.uid() = buyer_id);

create trigger orders_updated_at
  before update on public.orders
  for each row execute function update_updated_at();

-- Ratings / Bewertungen
create table public.ratings (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade unique not null,
  reviewer_id uuid references public.profiles(id) on delete cascade not null,
  seller_id uuid references public.profiles(id) on delete cascade not null,
  stars integer check (stars between 1 and 5) not null,
  comment text,
  created_at timestamptz default now()
);

alter table public.ratings enable row level security;

create policy "Bewertungen sind öffentlich lesbar"
  on public.ratings for select using (true);

create policy "Käufer kann bewerten"
  on public.ratings for insert with check (auth.uid() = reviewer_id);

-- Avg-Rating als materialized view
create or replace view public.seller_ratings as
  select
    seller_id,
    round(avg(stars)::numeric, 1) as avg_stars,
    count(*) as total_ratings
  from public.ratings
  group by seller_id;

-- Favorites / Merkliste
create table public.favorites (
  user_id uuid references public.profiles(id) on delete cascade,
  listing_id uuid references public.listings(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, listing_id)
);

alter table public.favorites enable row level security;

create policy "Nutzer sieht eigene Favoriten"
  on public.favorites for select using (auth.uid() = user_id);

create policy "Nutzer kann Favoriten hinzufügen"
  on public.favorites for insert with check (auth.uid() = user_id);

create policy "Nutzer kann Favoriten entfernen"
  on public.favorites for delete using (auth.uid() = user_id);

-- Messages / Nachrichten (thread-basiert auf inquiries aufbauend)
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  inquiry_id uuid references public.inquiries(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  read_at timestamptz,
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

create policy "Beteiligte können Nachrichten lesen"
  on public.messages for select using (
    auth.uid() = sender_id or
    auth.uid() = (select buyer_id from public.inquiries where id = inquiry_id) or
    auth.uid() = (select l.seller_id from public.listings l
                  join public.inquiries i on i.listing_id = l.id
                  where i.id = inquiry_id)
  );

create policy "Beteiligte können Nachrichten senden"
  on public.messages for insert with check (auth.uid() = sender_id);

-- Push subscriptions
create table public.push_subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  endpoint text not null,
  p256dh text not null,
  auth text not null,
  created_at timestamptz default now(),
  unique(user_id, endpoint)
);

alter table public.push_subscriptions enable row level security;

create policy "Nutzer verwaltet eigene Push-Subscriptions"
  on public.push_subscriptions for all using (auth.uid() = user_id);

-- notifications table
create type notification_type as enum (
  'new_inquiry','new_message','order_paid','order_shipped','new_rating'
);

create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type notification_type not null,
  title text not null,
  body text,
  link text,
  read_at timestamptz,
  created_at timestamptz default now()
);

alter table public.notifications enable row level security;

create policy "Nutzer sieht eigene Notifications"
  on public.notifications for all using (auth.uid() = user_id);
