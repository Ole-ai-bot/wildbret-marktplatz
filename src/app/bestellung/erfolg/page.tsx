import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default async function BestellungErfolgPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id) redirect("/");

  const supabase = await createClient();
  const { data: order } = await supabase
    .from("orders")
    .select("*, listing:listings(title)")
    .eq("stripe_session_id", session_id)
    .single();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <CheckCircle2 size={56} className="text-forest-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Bestellung erfolgreich!</h1>
        <p className="text-stone-500 mb-1">
          {order?.listing ? `„${(order.listing as any).title}"` : "Dein Produkt"} wurde gekauft.
        </p>
        <p className="text-stone-400 text-sm mb-8">
          Der Verkäufer wird sich in Kürze bei dir melden.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard/orders"
            className="bg-forest-700 hover:bg-forest-600 text-white font-medium py-2.5 rounded-xl transition"
          >
            Meine Bestellungen
          </Link>
          <Link href="/marktplatz" className="text-stone-400 hover:text-stone-600 text-sm">
            Zurück zum Marktplatz
          </Link>
        </div>
      </div>
    </div>
  );
}
