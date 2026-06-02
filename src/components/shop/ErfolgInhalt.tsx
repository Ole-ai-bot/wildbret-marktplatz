"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function ErfolgInhalt() {
  const { clear } = useCart();

  // Warenkorb nach erfolgreichem Kauf leeren
  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white border border-stone-100 shadow-sm p-10 max-w-md w-full text-center">
        <CheckCircle2 size={56} className="text-forest-500 mx-auto mb-6" />
        <h1 className="font-playfair text-3xl font-bold mb-3">Vielen Dank!</h1>
        <p className="text-stone-500 mb-2">
          Deine Bestellung war erfolgreich. Du erhältst in Kürze eine
          Bestätigung per E-Mail.
        </p>
        <p className="text-stone-400 text-sm mb-8">
          Wir verpacken deine Produkte sorgfältig und versenden sie schnellstmöglich.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/shop"
            className="bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium py-3 transition">
            Weiter einkaufen
          </Link>
          <Link href="/" className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-700 transition">
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
