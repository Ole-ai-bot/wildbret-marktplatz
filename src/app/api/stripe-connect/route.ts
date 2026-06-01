import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Stripe Connect Account erstellen und Onboarding starten
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_account_id, email, full_name")
    .eq("id", user.id)
    .single();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  let accountId = profile?.stripe_account_id;

  // Neues Connect-Konto erstellen falls keins existiert
  if (!accountId) {
    const account = await stripe.accounts.create({
      type: "express",
      country: "DE",
      email: profile?.email ?? user.email,
      business_type: "individual",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      metadata: { user_id: user.id },
    });
    accountId = account.id;

    await supabase
      .from("profiles")
      .update({ stripe_account_id: accountId })
      .eq("id", user.id);
  }

  // Onboarding-Link generieren
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${baseUrl}/dashboard/profile`,
    return_url: `${baseUrl}/dashboard/profile?stripe=success`,
    type: "account_onboarding",
  });

  return NextResponse.json({ url: accountLink.url });
}

// Status des Connect-Accounts abfragen
export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_account_id")
    .eq("id", user.id)
    .single();

  if (!profile?.stripe_account_id) {
    return NextResponse.json({ connected: false, details_submitted: false });
  }

  const account = await stripe.accounts.retrieve(profile.stripe_account_id);

  return NextResponse.json({
    connected: true,
    details_submitted: account.details_submitted,
    charges_enabled: account.charges_enabled,
    payouts_enabled: account.payouts_enabled,
  });
}
