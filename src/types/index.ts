export type TierArt =
  | "Reh"
  | "Hirsch"
  | "Wildschwein"
  | "Hase"
  | "Fasan"
  | "Ente"
  | "Rebhuhn"
  | "Fuchs"
  | "Sonstiges";

export type ProduktKategorie = "ganzes_tier" | "teilzerwirkt" | "veredelt";
export type JagdMethode = "ansitzjagd" | "drückjagd" | "bewegungsjagd" | "fallenjagd" | "sonstiges";
export type ListingStatus = "aktiv" | "verkauft" | "reserviert" | "inaktiv";
export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";
export type NotificationType = "new_inquiry" | "new_message" | "order_paid" | "order_shipped" | "new_rating";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  region?: string;
  bio?: string;
  avatar_url?: string;
  is_jaeger: boolean;
  created_at: string;
}

export interface SellerRating {
  seller_id: string;
  avg_stars: number;
  total_ratings: number;
}

export interface Listing {
  id: string;
  seller_id: string;
  seller?: Profile;
  title: string;
  description: string;
  tier_art: TierArt;
  kategorie: ProduktKategorie;
  jagd_methode: JagdMethode;
  jagd_methode_detail?: string;
  gewicht_kg?: number;
  preis: number;
  preis_pro_kg: boolean;
  region: string;
  abholung: boolean;
  versand: boolean;
  status: ListingStatus;
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  listing_id: string;
  listing?: Listing;
  buyer_id: string;
  buyer?: Profile;
  seller_id: string;
  seller?: Profile;
  stripe_session_id?: string;
  stripe_payment_intent?: string;
  amount_cents: number;
  status: OrderStatus;
  shipping_name?: string;
  shipping_address?: string;
  created_at: string;
  updated_at: string;
}

export interface Rating {
  id: string;
  order_id: string;
  reviewer_id: string;
  reviewer?: Profile;
  seller_id: string;
  stars: number;
  comment?: string;
  created_at: string;
}

export interface Inquiry {
  id: string;
  listing_id: string;
  listing?: Listing;
  buyer_id: string;
  buyer?: Profile;
  message: string;
  created_at: string;
  messages?: Message[];
}

export interface Message {
  id: string;
  inquiry_id: string;
  sender_id: string;
  sender?: Profile;
  content: string;
  read_at?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body?: string;
  link?: string;
  read_at?: string;
  created_at: string;
}

export interface PushSubscription {
  endpoint: string;
  p256dh: string;
  auth: string;
}
