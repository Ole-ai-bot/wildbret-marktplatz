import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Service-Role-Client für Webhook (kein Auth-Context)
function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Webhook signature invalid" }, { status: 400 });
  }

  const supabase = adminClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { listing_id, buyer_id, seller_id, typ } = session.metadata ?? {};

    // Shop-Bestellungen (eigene Feinkost) laufen nicht ueber den Marktplatz -
    // sie bekommen ihren eigenen Datensatz und werden ans Kassensystem
    // zurueckgemeldet.
    if (typ === "shop") {
      const { data: order } = await supabase
        .from("shop_orders")
        .update({
          status: "bezahlt",
          bezahlt_at: new Date().toISOString(),
          email: session.customer_details?.email ?? null,
          name: session.shipping_details?.name ?? session.customer_details?.name ?? null,
          adresse: session.shipping_details?.address ?? null,
        })
        .eq("stripe_session_id", session.id)
        .select("id")
        .maybeSingle();
      if (order) await meldeAnKasse(supabase, order.id);
      return NextResponse.json({ received: true });
    }

    // Order auf paid setzen
    await supabase
      .from("orders")
      .update({
        status: "paid",
        stripe_payment_intent: session.payment_intent as string,
        shipping_name: session.shipping_details?.name ?? null,
        shipping_address: session.shipping_details?.address
          ? JSON.stringify(session.shipping_details.address)
          : null,
      })
      .eq("stripe_session_id", session.id);

    // Listing als reserviert markieren
    await supabase
      .from("listings")
      .update({ status: "reserviert" })
      .eq("id", listing_id);

    // Notification für Verkäufer
    await supabase.from("notifications").insert({
      user_id: seller_id,
      type: "order_paid",
      title: "Neue Bestellung eingegangen!",
      body: "Jemand hat eines deiner Produkte gekauft.",
      link: `/dashboard/orders`,
    });

    // Notification für Käufer
    await supabase.from("notifications").insert({
      user_id: buyer_id,
      type: "order_paid",
      title: "Bestellung bestätigt",
      body: "Deine Zahlung war erfolgreich. Der Verkäufer wird sich melden.",
      link: `/dashboard/orders`,
    });
  }

  return NextResponse.json({ received: true });
}


/**
 * Bezahlten Shop-Kauf ans Kassensystem melden - damit der Umsatz dort in der
 * Auswertung erscheint (getrennt vom Kassenjournal, es ist kein
 * Kassengeschaeft). Scheitert die Meldung, bleibt gemeldet_at leer: Die
 * Bestellung ist trotzdem sauber gespeichert und laesst sich nachmelden. Eine
 * fehlgeschlagene Meldung darf den Zahlungsablauf nie stoeren.
 */
async function meldeAnKasse(db: ReturnType<typeof adminClient>, orderId: string): Promise<void> {
  const ziel = process.env.GASTROAGENT_URL;
  const key = process.env.PARTNER_IMPORT_KEY;
  if (!ziel || !key) return;
  try {
    const { data: order } = await db
      .from("shop_orders")
      .select("id, stripe_session_id, brutto_cents, versand_cents, bezahlt_at")
      .eq("id", orderId)
      .maybeSingle();
    if (!order) return;
    const { data: items } = await db
      .from("shop_order_items")
      .select("name, menge, brutto_cents, ust_prozent, netto_cents, ust_cents")
      .eq("order_id", orderId);
    if (!items?.length) return;

    const res = await fetch(`${ziel.replace(/\/+$/, "")}/api/online-sales`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-partner-key": key },
      body: JSON.stringify({
        externalOrderId: order.stripe_session_id,
        paidAt: order.bezahlt_at ?? new Date().toISOString(),
        bruttoCents: order.brutto_cents,
        versandCents: order.versand_cents ?? 0,
        positionen: items.map((i) => ({
          name: i.name,
          menge: i.menge,
          bruttoCents: i.brutto_cents,
          ustProzent: Number(i.ust_prozent),
          nettoCents: i.netto_cents,
          ustCents: i.ust_cents,
        })),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (res.ok) {
      await db.from("shop_orders").update({ gemeldet_at: new Date().toISOString() }).eq("id", orderId);
    }
  } catch {
    // Stillschweigend: nachmeldbar ueber gemeldet_at is null.
  }
}
