import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { findeShopProdukt } from "@/lib/shop-products";
import { ustAufteilung } from "@/lib/ust";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const VERSAND_KOSTEN_CENTS = 590;
const VERSANDFREI_AB_CENTS = 7500;

export async function POST(req: NextRequest) {
  const { items } = await req.json();

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Warenkorb ist leer" }, { status: 400 });
  }

  // Preise serverseitig aus der Produktliste ermitteln (Client-Daten ignorieren)
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  // Positionen fuer die eigene Bestellzeile - mit eingefrorenem Steuersatz.
  const posten: {
    external_ref: string | null;
    name: string;
    menge: number;
    einzel_brutto_cents: number;
    brutto_cents: number;
    ust_prozent: number;
    netto_cents: number;
    ust_cents: number;
  }[] = [];
  let warenwertCents = 0;

  for (const { slug, menge } of items) {
    const product = await findeShopProdukt(String(slug));
    if (!product) continue;
    const qty = Math.max(1, Math.min(99, parseInt(menge) || 1));
    const unitAmount = Math.round(product.preis * 100);
    warenwertCents += unitAmount * qty;

    const satz = product.ustProzent ?? 7;
    const brutto = unitAmount * qty;
    const { netto, ust } = ustAufteilung(brutto, satz);
    posten.push({
      external_ref: String(slug).startsWith("ga-") ? String(slug).slice(3) : null,
      name: product.name,
      menge: qty,
      einzel_brutto_cents: unitAmount,
      brutto_cents: brutto,
      ust_prozent: satz,
      netto_cents: netto,
      ust_cents: ust,
    });

    lineItems.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: product.name,
          description: product.gewicht,
          images: product.bild
            ? [`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}${product.bild}`]
            : [],
        },
        unit_amount: unitAmount,
      },
      quantity: qty,
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "Keine gültigen Produkte" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  // Versand als eigener Posten (kostenlos ab Schwelle)
  const versandCents = warenwertCents >= VERSANDFREI_AB_CENTS ? 0 : VERSAND_KOSTEN_CENTS;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: versandCents, currency: "eur" },
          display_name: versandCents === 0 ? "Kostenloser Versand" : "Standardversand",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 5 },
          },
        },
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["DE", "AT"],
    },
    success_url: `${baseUrl}/bestellung/erfolg?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/warenkorb`,
    metadata: { typ: "shop" },
  });

  // Bestellung festhalten - vorerst "offen". Der Stripe-Webhook setzt sie auf
  // bezahlt. Ohne diesen Datensatz gaebe es ausser Stripe keinen Nachweis.
  try {
    const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { data: order, error } = await db
      .from("shop_orders")
      .insert({
        stripe_session_id: session.id,
        status: "offen",
        brutto_cents: warenwertCents + versandCents,
        versand_cents: versandCents,
      })
      .select("id")
      .single();
    if (!error && order) {
      await db.from("shop_order_items").insert(posten.map((p) => ({ ...p, order_id: order.id })));
    }
  } catch {
    // Die Zahlung darf an unserer Buchfuehrung nicht scheitern: Der Webhook
    // legt die Bestellung notfalls nach.
  }

  return NextResponse.json({ url: session.url });
}
