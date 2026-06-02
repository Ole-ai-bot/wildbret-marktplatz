"use client";

import { useCart } from "@/lib/cart-context";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateMenge, removeItem, totalPreis, totalItems } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-stone-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-stone-700" />
            <p className="font-playfair text-lg font-bold">Warenkorb</p>
            {totalItems > 0 && (
              <span className="text-xs text-stone-400">({totalItems})</span>
            )}
          </div>
          <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-stone-900 transition">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-stone-400 px-6">
            <ShoppingBag size={40} className="mb-4 opacity-30" />
            <p className="text-sm">Dein Warenkorb ist leer.</p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 text-xs tracking-widest uppercase text-forest-600 hover:text-forest-800 transition"
            >
              Weiter einkaufen
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-4 pb-4 border-b border-stone-50">
                  <div className="relative w-16 h-16 flex-shrink-0 bg-stone-100 overflow-hidden">
                    {item.bild ? (
                      <Image src={item.bild} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-300">
                        <ShoppingBag size={20} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-stone-900 leading-snug">{item.name}</p>
                    <p className="text-xs text-stone-400 mb-2">{item.gewicht}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-stone-200">
                        <button
                          onClick={() => updateMenge(item.slug, item.menge - 1)}
                          className="px-2 py-1 text-stone-500 hover:bg-stone-50 transition"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-sm">{item.menge}</span>
                        <button
                          onClick={() => updateMenge(item.slug, item.menge + 1)}
                          className="px-2 py-1 text-stone-500 hover:bg-stone-50 transition"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="font-semibold text-sm text-forest-800">
                        {(item.preis * item.menge).toFixed(2).replace(".", ",")} €
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.slug)}
                    className="text-stone-300 hover:text-red-500 transition self-start"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-stone-100 px-6 py-5 flex-shrink-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-stone-500">Zwischensumme</span>
                <span className="font-playfair text-xl font-bold text-stone-900">
                  {totalPreis.toFixed(2).replace(".", ",")} €
                </span>
              </div>
              <p className="text-xs text-stone-400 mb-4">zzgl. Versandkosten</p>
              <Link
                href="/warenkorb"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-stone-900 hover:bg-stone-800 text-white text-center text-sm font-medium py-3 transition"
              >
                Zur Kasse
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-xs tracking-widest uppercase text-stone-400 hover:text-stone-700 mt-3 transition"
              >
                Weiter einkaufen
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
