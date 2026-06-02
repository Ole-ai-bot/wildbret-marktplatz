"use client";

import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, ShoppingBag, Loader2, ArrowLeft } from "lucide-react";

const VERSAND_KOSTEN = 5.90;
const VERSANDFREI_AB = 75;

export default function WarenkorbPage() {
  const { items, updateMenge, removeItem, totalPreis, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const versand = totalPreis >= VERSANDFREI_AB || totalPreis === 0 ? 0 : VERSAND_KOSTEN;
  const gesamt = totalPreis + versand;

  async function handleCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout-shop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug, menge: i.menge })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fehler beim Checkout");
      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <ShoppingBag size={48} className="mx-auto text-stone-300 mb-6" />
        <h1 className="font-playfair text-3xl font-bold mb-3">Dein Warenkorb ist leer</h1>
        <p className="text-stone-500 mb-8">Entdecke unsere handwerkliche Feinkost im Onlineshop.</p>
        <Link href="/shop"
          className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium px-6 py-3 transition">
          Zum Onlineshop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link href="/shop" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-stone-400 hover:text-stone-700 transition mb-8">
        <ArrowLeft size={14} /> Weiter einkaufen
      </Link>

      <h1 className="font-playfair text-4xl font-bold mb-10">Warenkorb</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="flex flex-col divide-y divide-stone-100 border-y border-stone-100">
            {items.map((item) => (
              <div key={item.slug} className="flex gap-5 py-5">
                <div className="relative w-20 h-20 flex-shrink-0 bg-stone-100 overflow-hidden">
                  {item.bild ? (
                    <Image src={item.bild} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                      <ShoppingBag size={22} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-stone-900">{item.name}</p>
                  <p className="text-sm text-stone-400 mb-3">{item.gewicht}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-stone-200">
                      <button onClick={() => updateMenge(item.slug, item.menge - 1)}
                        className="px-2.5 py-1.5 text-stone-500 hover:bg-stone-50 transition">
                        <Minus size={13} />
                      </button>
                      <span className="px-4 text-sm">{item.menge}</span>
                      <button onClick={() => updateMenge(item.slug, item.menge + 1)}
                        className="px-2.5 py-1.5 text-stone-500 hover:bg-stone-50 transition">
                        <Plus size={13} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.slug)}
                      className="text-stone-300 hover:text-red-500 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="font-semibold text-forest-800 whitespace-nowrap">
                  {(item.preis * item.menge).toFixed(2).replace(".", ",")} €
                </p>
              </div>
            ))}
          </div>
          <button onClick={clear} className="mt-4 text-xs tracking-widest uppercase text-stone-400 hover:text-red-500 transition">
            Warenkorb leeren
          </button>
        </div>

        {/* Zusammenfassung */}
        <div className="lg:col-span-1">
          <div className="bg-stone-50 border border-stone-100 p-6 sticky top-20">
            <h2 className="font-playfair text-xl font-bold mb-5">Zusammenfassung</h2>
            <div className="space-y-3 text-sm border-b border-stone-200 pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-stone-500">Zwischensumme</span>
                <span>{totalPreis.toFixed(2).replace(".", ",")} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Versand</span>
                <span>{versand === 0 ? "Kostenlos" : `${versand.toFixed(2).replace(".", ",")} €`}</span>
              </div>
              {versand > 0 && (
                <p className="text-xs text-stone-400">
                  Noch {(VERSANDFREI_AB - totalPreis).toFixed(2).replace(".", ",")} € bis zum kostenlosen Versand
                </p>
              )}
            </div>
            <div className="flex justify-between items-end mb-6">
              <span className="font-medium">Gesamt</span>
              <span className="font-playfair text-2xl font-bold text-forest-800">
                {gesamt.toFixed(2).replace(".", ",")} €
              </span>
            </div>

            {error && (
              <p className="text-red-500 text-xs bg-red-50 px-3 py-2 mb-4">{error}</p>
            )}

            <button onClick={handleCheckout} disabled={loading}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium py-3.5 transition disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Weiterleitung...</> : "Zur Kasse"}
            </button>
            <p className="text-xs text-stone-400 text-center mt-3">
              Sichere Bezahlung über Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
