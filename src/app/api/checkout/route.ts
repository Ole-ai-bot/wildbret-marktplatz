import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Plattform-Provision: 10%
const PLATFORM_FEE_PERCENT = 10;

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });
  }

  const { listing_id } = await req.json();

  const { data: listing } = await supabase
    .from("listings")
    .select("*, seller:profiles(full_name, email, stripe_account_id)")
    .eq("id", listing_id)
    .eq("status", "aktiv")
    .single();

  if (!listing) {
    return NextResponse.json({ error: "Inserat nicht gefunden" }, { status: 404 });
  }

  const seller = listing.seller as any;

  // Prüfe ob Verkäufer Stripe Connect hat
  if (!seller?.stripe_account_id) {
    return NextResponse.json(
      { error: "Der Verkäufer hat noch kein Zahlungskonto eingerichtet." },
      { status: 400 }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const amountCents = Math.round(listing.preis * 100);
  const platformFeeCents = Math.round(amountCents * (PLATFORM_FEE_PERCENT / 100));

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
          unit_amount: amountCents,
        },
        quantity: 1,
      },
    ],
    // Stripe Connect: Zahlung geht an Verkäufer, Provision an Plattform
    payment_intent_data: {
      application_fee_amount: platformFeeCents,
      transfer_data: {
        destination: seller.stripe_account_id,
      },
    },
    shipping_address_collection: listing.versand
      ? { allowed_countries: ["DE", "AT", "CH"] }
      : undefined,
    metadata: {
      listing_id,
      buyer_id: user.id,
      seller_id: listing.seller_id,
      platform_fee_cents: platformFeeCents.toString(),
    },
    success_url: `${baseUrl}/bestellung/erfolg?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/inserat/${listing_id}`,
  });

  // Order mit Fee-Info anlegen
  await supabase.from("orders").insert({
    listing_id,
    buyer_id: user.id,
    seller_id: listing.seller_id,
    stripe_session_id: session.id,
    amount_cents: amountCents,
    platform_fee_cents: platformFeeCents,
    status: "pending",
  });

  return NextResponse.json({ url: session.url });
}
