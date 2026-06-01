import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { RatingForm } from "@/components/ratings/RatingForm";
import type { Order } from "@/types";

const STATUS: Record<string, { label: string; cls: string }> = {
  pending:   { label: "Ausstehend",   cls: "bg-yellow-100 text-yellow-700" },
  paid:      { label: "Bezahlt",      cls: "bg-blue-100 text-blue-700" },
  shipped:   { label: "Versendet",    cls: "bg-indigo-100 text-indigo-700" },
  delivered: { label: "Geliefert",    cls: "bg-green-100 text-green-700" },
  cancelled: { label: "Storniert",    cls: "bg-red-100 text-red-500" },
};

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const [{ data: bought }, { data: sold }] = await Promise.all([
    supabase
      .from("orders")
      .select("*, listing:listings(title, images), seller:profiles!orders_seller_id_fkey(full_name)")
      .eq("buyer_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("orders")
      .select("*, listing:listings(title), buyer:profiles!orders_buyer_id_fkey(full_name, email)")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  // Bereits bewertete Orders
  const { data: existingRatings } = await supabase
    .from("ratings")
    .select("order_id")
    .eq("reviewer_id", user.id);
  const ratedOrderIds = new Set((existingRatings ?? []).map((r: any) => r.order_id));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Bestellungen</h1>

      {/* Gekauft */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Meine Käufe</h2>
        {!bought?.length ? (
          <p className="text-stone-400 text-sm">Noch keine Käufe.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {bought.map((o: any) => {
              const st = STATUS[o.status] ?? STATUS.pending;
              const canRate = o.status === "delivered" && !ratedOrderIds.has(o.id);
              return (
                <div key={o.id} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="font-medium">{o.listing?.title ?? "—"}</p>
                      <p className="text-sm text-stone-400">
                        von {o.seller?.full_name} ·{" "}
                        {format(new Date(o.created_at), "dd. MMM yyyy", { locale: de })}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.cls}`}>
                        {st.label}
                      </span>
                      <p className="text-sm font-bold text-forest-700">
                        {(o.amount_cents / 100).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                  {canRate && (
                    <div className="border-t border-stone-100 pt-3 mt-1">
                      <RatingForm orderId={o.id} sellerId={o.seller_id} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Verkauft */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Meine Verkäufe</h2>
        {!sold?.length ? (
          <p className="text-stone-400 text-sm">Noch keine Verkäufe.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {sold.map((o: any) => {
              const st = STATUS[o.status] ?? STATUS.pending;
              return (
                <div key={o.id} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{o.listing?.title ?? "—"}</p>
                    <p className="text-sm text-stone-400">
                      Käufer: {o.buyer?.full_name} ({o.buyer?.email})
                    </p>
                    <p className="text-xs text-stone-300 mt-0.5">
                      {format(new Date(o.created_at), "dd. MMM yyyy", { locale: de })}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.cls}`}>
                      {st.label}
                    </span>
                    <p className="text-sm font-bold text-forest-700">
                      {(o.amount_cents / 100).toFixed(2)} €
                    </p>
                    {o.platform_fee_cents > 0 && (
                      <p className="text-xs text-stone-400">
                        davon {((o.amount_cents - o.platform_fee_cents) / 100).toFixed(2)} € an dich
                      </p>
                    )}
                    {o.status === "paid" && (
                      <MarkShippedButton orderId={o.id} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function MarkShippedButton({ orderId }: { orderId: string }) {
  // Server Action
  async function markShipped() {
    "use server";
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    await supabase.from("orders").update({ status: "shipped" }).eq("id", orderId);
  }
  return (
    <form action={markShipped}>
      <button
        type="submit"
        className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-2 py-1 rounded-lg transition"
      >
        Als versendet markieren
      </button>
    </form>
  );
}
