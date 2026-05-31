import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { formatPreis, KATEGORIEN } from "@/lib/utils";
import type { Listing } from "@/types";

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  aktiv:       { label: "Aktiv",       cls: "bg-green-100 text-green-700" },
  verkauft:    { label: "Verkauft",    cls: "bg-stone-100 text-stone-500" },
  reserviert:  { label: "Reserviert", cls: "bg-amber-100 text-amber-700" },
  inaktiv:     { label: "Inaktiv",    cls: "bg-red-100 text-red-500" },
};

export default async function DashboardListingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .eq("seller_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Meine Inserate</h1>
        <Link
          href="/inserat/neu"
          className="bg-forest-700 hover:bg-forest-600 text-white text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
        >
          <Plus size={16} /> Neues Inserat
        </Link>
      </div>

      {!listings?.length ? (
        <div className="text-center py-20 text-stone-400">
          <p>Du hast noch keine Inserate.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {listings.map((l: Listing) => {
            const st = STATUS_LABELS[l.status] ?? STATUS_LABELS.inaktiv;
            const kat = KATEGORIEN.find((k) => k.value === l.kategorie);
            return (
              <div key={l.id} className="bg-white rounded-2xl border border-stone-100 shadow-sm flex gap-4 p-4 items-center">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
                  {l.images?.[0] && (
                    <Image src={l.images[0]} alt={l.title} fill className="object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.cls}`}>
                      {st.label}
                    </span>
                    <span className="text-xs text-stone-400">{kat?.label}</span>
                  </div>
                  <p className="font-medium truncate">{l.title}</p>
                  <p className="text-sm text-forest-700 font-semibold">
                    {formatPreis(l.preis, l.preis_pro_kg)}
                  </p>
                </div>
                <Link
                  href={`/dashboard/listings/${l.id}`}
                  className="text-stone-400 hover:text-forest-600 transition p-2"
                >
                  <Pencil size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
