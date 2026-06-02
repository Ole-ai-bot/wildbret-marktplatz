"use client";

import { useState } from "react";
import { ShoppingCart, Loader2, Truck, Package } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function BuyButton({
  listingId,
  versand,
  abholung,
}: {
  listingId: string;
  versand?: boolean;
  abholung?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleBuy() {
    setLoading(true);
    setError("");
    try {
      // Sicherstellen, dass der Käufer eingeloggt ist
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/auth/login";
        return;
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listing_id: listingId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Fehler beim Starten des Kaufs");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleBuy}
        disabled={loading}
        className="bg-earth-600 hover:bg-earth-500 text-white font-semibold py-3 rounded-xl flex items-center gap-2 justify-center transition disabled:opacity-60"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <ShoppingCart size={18} />}
        {loading ? "Weiterleitung..." : "Jetzt kaufen"}
      </button>
      <div className="flex items-center justify-center gap-4 text-xs text-stone-400">
        {versand && (
          <span className="flex items-center gap-1"><Truck size={12} /> Versand möglich</span>
        )}
        {abholung && (
          <span className="flex items-center gap-1"><Package size={12} /> Abholung möglich</span>
        )}
      </div>
      <p className="text-xs text-stone-400 text-center">
        Sichere Bezahlung über Stripe · Käuferschutz
      </p>
      {error && <p className="text-red-500 text-xs text-center bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
    </div>
  );
}
