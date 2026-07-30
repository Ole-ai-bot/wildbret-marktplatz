"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { KATEGORIEN, PRODUKTE } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

export function ProductGrid({ products = PRODUKTE }: { products?: Product[] }) {
  return (
    <>
      {/* Kategorien als Anker */}
      <div className="flex flex-wrap gap-2 mb-16">
        {KATEGORIEN.map((k) => (
          <a key={k.id} href={`#${k.id}`}
            className="border border-stone-200 hover:border-stone-400 text-stone-600 hover:text-stone-900 text-xs tracking-widest uppercase px-4 py-2 transition">
            {k.label}
          </a>
        ))}
        <Link href="/marktplatz"
          className="border border-forest-200 text-forest-600 hover:border-forest-400 hover:text-forest-800 text-xs tracking-widest uppercase px-4 py-2 transition ml-auto">
          Wildbret-Marktplatz
        </Link>
      </div>

      {/* Produkte nach Kategorie */}
      {KATEGORIEN.map((kat) => {
        const items = products.filter((p) => p.kategorie === kat.id);
        if (!items.length) return null;
        const erzeuger = items.find((p) => p.erzeuger)?.erzeuger;
        return (
          <div key={kat.id} id={kat.id} className="mb-20 scroll-mt-20">
            <div className="flex items-end justify-between mb-8 border-b border-stone-200 pb-4">
              <div>
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                  {items.length} {items.length === 1 ? "Produkt" : "Produkte"}
                </p>
                <h2 className="font-playfair text-3xl font-bold">{kat.label}</h2>
              </div>
              {erzeuger && (
                <p className="text-xs text-stone-400 hidden md:block">{erzeuger}</p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-100">
              {items.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Marktplatz Hinweis */}
      <div className="bg-stone-950 text-white p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-2">Für Jäger</p>
          <h2 className="font-playfair text-2xl font-bold mb-2">Wildbret-Marktplatz</h2>
          <p className="text-stone-400 text-sm max-w-md">
            Du bist Jäger und möchtest dein Wildbret direkt vermarkten?
            Auf unserem Marktplatz inserierst du kostenlos — wir vermitteln den Kontakt.
          </p>
        </div>
        <Link href="/marktplatz"
          className="flex-shrink-0 inline-flex items-center gap-2 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white text-xs tracking-widest uppercase px-6 py-3 transition">
          Zum Marktplatz <ArrowRight size={14} />
        </Link>
      </div>
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="bg-white group flex flex-col">
      {product.bild && (
        <div className="relative h-48 overflow-hidden">
          {product.bild.startsWith("/") ? (
            <Image src={product.bild} alt={product.name} fill
              className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            // Partner-Import: Bild kommt als https- oder Data-URL aus dem
            // Kassensystem - next/image kann beides hier nicht optimieren.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.bild} alt={product.name}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
          )}
          {product.tag && (
            <span className="absolute top-3 left-3 bg-forest-700 text-white text-xs tracking-widest uppercase px-2 py-1">
              {product.tag}
            </span>
          )}
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        {product.erzeuger && (
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">{product.erzeuger}</p>
        )}
        <h3 className="font-playfair text-lg font-bold text-stone-900 mb-1">{product.name}</h3>
        <p className="text-stone-500 text-sm leading-relaxed mb-4 flex-1">{product.kurz}</p>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-playfair text-xl font-bold text-forest-800">
              {product.preis.toFixed(2).replace(".", ",")} €
            </p>
            <p className="text-xs text-stone-400">{product.gewicht}</p>
          </div>
          <button
            onClick={handleAdd}
            className={`text-xs tracking-widest uppercase px-4 py-2.5 transition flex items-center gap-1.5 ${
              added
                ? "bg-forest-600 text-white"
                : "bg-stone-900 hover:bg-stone-800 text-white"
            }`}
          >
            {added ? (
              <><Check size={14} /> Hinzugefügt</>
            ) : (
              "In den Warenkorb"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
