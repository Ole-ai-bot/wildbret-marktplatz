import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { createClient } from "@supabase/supabase-js";

// VAPID nur konfigurieren wenn gültige Keys vorhanden sind (verhindert Build-Crash).
function configureVapid(): boolean {
  const pub = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const priv = process.env.VAPID_PRIVATE_KEY;
  const mail = process.env.VAPID_CONTACT_EMAIL;
  if (!pub || !priv || !mail || pub.length < 80) return false;
  try {
    webpush.setVapidDetails("mailto:" + mail, pub, priv);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  // Nur intern aufrufbar (Service-Role)
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!configureVapid()) {
    return NextResponse.json({ error: "Push nicht konfiguriert" }, { status: 503 });
  }

  const { user_id, title, body, link } = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: subs } = await supabase
    .from("push_subscriptions")
    .select("*")
    .eq("user_id", user_id);

  if (!subs?.length) return NextResponse.json({ sent: 0 });

  const payload = JSON.stringify({ title, body, link });
  let sent = 0;

  for (const sub of subs) {
    try {
      await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload
      );
      sent++;
    } catch {
      // Expired subscription — löschen
      await supabase.from("push_subscriptions").delete().eq("id", sub.id);
    }
  }

  return NextResponse.json({ sent });
}
