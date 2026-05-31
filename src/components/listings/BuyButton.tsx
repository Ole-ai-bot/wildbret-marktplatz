"use client";

import { useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";

export function BuyButton({ listingId }: { listingId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleBuy() {
    setLoading(true);
    setError("");
    try {
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
    <div className="flex flex-col gap-1">
      <button
        onClick={handleBuy}
        disabled={loading}
        className="bg-earth-600 hover:bg-earth-500 text-white font-semibold py-3 rounded-xl flex items-center gap-2 justify-center transition disabled:opacity-60"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <ShoppingCart size={18} />}
        {loading ? "Weiterleitung..." : "Jetzt kaufen"}
      </button>
      {error && <p className="text-red-500 text-xs text-center">{error}</p>}
    </div>
  );
}
