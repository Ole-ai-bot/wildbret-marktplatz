import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });
  }

  const { listing_id } = await req.json();

  const { data: listing } = await supabase
    .from("listings")
    .select("*, seller:profiles(full_name, email)")
    .eq("id", listing_id)
    .eq("status", "aktiv")
    .single();

  if (!listing) {
    return NextResponse.json({ error: "Inserat nicht gefunden" }, { status: 404 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: listing.title,
            description: `${listing.tier_art} · ${listing.region}`,
            images: listing.images?.slice(0, 1) ?? [],
          },
          unit_amount: Math.round(listing.preis * 100),
        },
        quantity: 1,
      },
    ],
    shipping_address_collection: listing.versand
      ? { allowed_countries: ["DE", "AT", "CH"] }
      : undefined,
    metadata: {
      listing_id,
      buyer_id: user.id,
      seller_id: listing.seller_id,
    },
    success_url: `${baseUrl}/bestellung/erfolg?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/inserat/${listing_id}`,
  });

  // Order als pending anlegen
  await supabase.from("orders").insert({
    listing_id,
    buyer_id: user.id,
    seller_id: listing.seller_id,
    stripe_session_id: session.id,
    amount_cents: Math.round(listing.preis * 100),
    status: "pending",
  });

  return NextResponse.json({ url: session.url });
}
