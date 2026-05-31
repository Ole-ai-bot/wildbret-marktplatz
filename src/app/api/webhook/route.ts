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
    const { listing_id, buyer_id, seller_id } = session.metadata ?? {};

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
