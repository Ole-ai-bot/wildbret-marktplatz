import { createClient } from "@supabase/supabase-js";
import { KATEGORIEN, PRODUKTE, type Kategorie, type Product } from "@/lib/products";

/**
 * Shop-Sortiment = statische Liste (products.ts) + per Partner-Import geladene
 * Produkte (shop_products, siehe /api/partner-import). Die Partner-Produkte
 * tragen den Slug "partner-<external_ref>", damit Checkout und Warenkorb sie
 * eindeutig von den statischen unterscheiden koennen.
 */
export const PARTNER_SLUG_PREFIX = "partner-";

type ShopProductRow = {
  external_ref: string;
  name: string;
  kurz: string;
  kategorie: string;
  preis_cents: number;
  gewicht: string;
  bild: string | null;
  erzeuger: string | null;
  tag: string | null;
  tax_key: number | null;
};

function anonClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    global: {
      // Next 14 legt fetch-Antworten im Data Cache ab - auch auf Seiten mit
      // force-dynamic. Ohne no-store fror die Produktliste beim ersten Aufruf
      // nach dem Deploy ein: ein frisch aus dem Kassensystem geladener Artikel
      // tauchte nicht auf (Ole, 30.07.2026, "Kuchen to go").
      fetch: (url, init) => fetch(url, { ...init, cache: "no-store" }),
    },
  });
}

function zuProdukt(r: ShopProductRow): Product {
  return {
    slug: PARTNER_SLUG_PREFIX + r.external_ref,
    name: r.name,
    kategorie: r.kategorie,
    kurz: r.kurz,
    preis: r.preis_cents / 100,
    gewicht: r.gewicht,
    ...(r.bild ? { bild: r.bild } : {}),
    ...(r.erzeuger ? { erzeuger: r.erzeuger } : {}),
    ...(r.tag ? { tag: r.tag } : {}),
    ustProzent: ustProzentAus(r.tax_key),
  };
}

/**
 * USt-Schluessel des Kassensystems -> Prozentsatz. Ohne Angabe 7 %: Der Shop
 * verkauft Lebensmittel, das ist der Regelfall. Wer 19 % braucht (Wein,
 * Spirituosen), setzt im Kassensystem den Versand-Satz - dann kommt er hier
 * an, statt geraten zu werden.
 */
export function ustProzentAus(taxKey: number | null | undefined): number {
  if (taxKey === 1) return 19;
  if (taxKey === 2) return 7;
  if (taxKey === 3) return 10.7;
  if (taxKey === 4) return 5.5;
  if (taxKey === 5 || taxKey === 6 || taxKey === 7) return 0;
  return 7;
}

/** Alle verkaeuflichen Produkte: statisch + Partner-Import. Nie werfend — faellt auf die statische Liste zurueck. */
export async function ladeShopProdukte(): Promise<Product[]> {
  try {
    const { data, error } = await anonClient()
      .from("shop_products")
      .select("external_ref,name,kurz,kategorie,preis_cents,gewicht,bild,erzeuger,tag,tax_key")
      .eq("aktiv", true)
      .order("name");
    if (error || !data) return PRODUKTE;
    return [...PRODUKTE, ...data.map((r) => zuProdukt(r as ShopProductRow))];
  } catch {
    return PRODUKTE;
  }
}

/** Einzelnes Produkt fuer den Checkout aufloesen (statisch oder Partner). */
export async function findeShopProdukt(slug: string): Promise<Product | null> {
  const statisch = PRODUKTE.find((p) => p.slug === slug);
  if (statisch) return statisch;
  if (!slug.startsWith(PARTNER_SLUG_PREFIX)) return null;
  try {
    const { data } = await anonClient()
      .from("shop_products")
      .select("external_ref,name,kurz,kategorie,preis_cents,gewicht,bild,erzeuger,tag,tax_key")
      .eq("external_ref", slug.slice(PARTNER_SLUG_PREFIX.length))
      .eq("aktiv", true)
      .maybeSingle();
    return data ? zuProdukt(data as ShopProductRow) : null;
  } catch {
    return null;
  }
}

/**
 * Alle Shop-Kategorien: feste Liste + per Partner-Import angelegte. Die Seite
 * rendert damit auch Rubriken, die es erst seit einem Import gibt (z. B.
 * "Wein"). Faellt die Datenbank aus, bleibt die feste Liste.
 */
export async function ladeKategorien(): Promise<Kategorie[]> {
  try {
    const { data, error } = await anonClient()
      .from("shop_categories")
      .select("id,label,sort_order")
      .order("sort_order")
      .order("label");
    if (error || !data) return KATEGORIEN;
    const eigene = (data as { id: string; label: string }[]).filter(
      (k) => !KATEGORIEN.some((s) => s.id === k.id),
    );
    return [...KATEGORIEN, ...eigene.map((k) => ({ id: k.id, label: k.label }))];
  } catch {
    return KATEGORIEN;
  }
}
