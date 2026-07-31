import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { ladeKategorien } from "@/lib/shop-products";

export const dynamic = "force-dynamic";

/**
 * Partner-Import: Kassensysteme (GastroAgent) laden Produkte direkt in den
 * Onlineshop. Zugang ueber einen gemeinsamen Schluessel (PARTNER_IMPORT_KEY,
 * Vercel-Env) im Header x-partner-key.
 *
 *   GET  -> Verbindungstest: { ok: true, shop: "Revierkueche" }
 *   POST -> Upsert je external_ref in shop_products; Antwort je Produkt
 *           { externalRef, status: "neu" | "aktualisiert", url }
 *
 * Die Produkte erscheinen im Shop neben der statischen Liste (Merge in
 * src/lib/shop-products.ts). Kategorien werden auf die bestehenden
 * Shop-Kategorien abgebildet; was nicht passt, landet in "Wildmanufaktur",
 * statt unsichtbar zu verschwinden.
 */
const zProdukt = z.object({
  externalRef: z.string().min(1).max(80),
  name: z.string().min(1).max(120),
  kurz: z.string().max(1000).default(""),
  priceCents: z.number().int().min(0).max(100_000_00),
  kategorie: z.string().max(80).optional(),
  gewicht: z.string().max(60).optional(),
  bild: z.string().max(4_000_000).optional(),
  /** USt-Schluessel des Kassensystems fuer den VERSAND (1 = 19 %, 2 = 7 %) */
  taxKey: z.number().int().min(1).max(7).optional(),
  erzeuger: z.string().max(120).optional(),
  aktiv: z.boolean().optional(),
});
const zBody = z.object({ products: z.array(zProdukt).min(1).max(200) });

function adminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

function berechtigt(req: NextRequest): boolean {
  const key = process.env.PARTNER_IMPORT_KEY;
  return !!key && req.headers.get("x-partner-key") === key;
}

/**
 * Partner-Kategorie -> Shop-Kategorie. Erst exakte ID, dann Namens-Treffer
 * (z. B. "Pesto, Confit & Kompott" oder nur "Confit"), sonst Wildmanufaktur.
 */
/**
 * Wunsch-Kategorie aufloesen: exakte ID, Namens-Treffer, Synonym - und wenn
 * alles fehlschlaegt, wird die Kategorie ANGELEGT statt den Artikel in ein
 * Sammelbecken zu stecken (Ole, 30.07.2026: "wie automatisieren wir das").
 * Nur ohne jeden Wunsch bleibt es beim Standard Wildmanufaktur.
 */
async function shopKategorie(db: ReturnType<typeof adminClient>, wunsch?: string): Promise<string> {
  if (!wunsch || !wunsch.trim()) return "wildmanufaktur";
  const w = wunsch.trim().toLowerCase();
  const alle = await ladeKategorien();
  const perId = alle.find((k) => k.id === w);
  if (perId) return perId.id;
  const perLabel = alle.find(
    (k) => k.label.toLowerCase() === w || k.label.toLowerCase().includes(w) || w.includes(k.label.toLowerCase()),
  );
  if (perLabel) return perLabel.id;
  for (const [id, begriffe] of Object.entries(SYNONYME)) {
    if (begriffe.some((b) => w.includes(b)) && alle.some((k) => k.id === id)) return id;
  }
  // Neu anlegen: Slug aus dem Namen, Umlaute aufgeloest.
  const slug = w
    .replace(/\u00e4/g, "ae").replace(/\u00f6/g, "oe").replace(/\u00fc/g, "ue").replace(/\u00df/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    .slice(0, 40);
  if (!slug) return "wildmanufaktur";
  const label = wunsch.trim().slice(0, 60);
  const res = await db.from("shop_categories").upsert({ id: slug, label }, { onConflict: "id", ignoreDuplicates: true });
  if (res.error) return "wildmanufaktur";
  return slug;
}

const SYNONYME: Record<string, string[]> = {
  gebaeck: ["kuchen", "geb\u00e4ck", "gebaeck", "dessert", "s\u00fcsses", "s\u00fc\u00dfes", "torte", "nachtisch"],
  "pesto-confit": ["confit", "pesto", "kompott", "aufstrich"],
  eingemachtes: ["marmelade", "gelee", "eingemacht", "sirup", "chutney"],
  oele: ["\u00f6l", "oel"],
  essig: ["essig", "balsamico"],
  kaese: ["k\u00e4se", "kaese"],
  butter: ["butter"],
  kaffee: ["kaffee", "espresso"],
  gewuerze: ["gew\u00fcrz", "gewuerz", "snack", "salz"],
  wildwurst: ["wurst", "schinken", "salami", "aufschnitt"],
  hund: ["hund", "barf"],
  geschenke: ["geschenk", "gutschein", "box"],
};

export async function GET(req: NextRequest) {
  if (!berechtigt(req)) return NextResponse.json({ error: "Unbekannter Schluessel" }, { status: 401 });
  // Kategorien mitliefern: Das Kassensystem zeigt sie beim Laden als Auswahl,
  // damit Artikel gezielt einsortiert werden statt im Sammelbecken zu landen.
  const kategorien = await ladeKategorien();
  return NextResponse.json({
    ok: true,
    shop: "Revierkueche",
    kategorien: kategorien.map((k) => ({ id: k.id, label: k.label })),
  });
}

export async function POST(req: NextRequest) {
  if (!berechtigt(req)) return NextResponse.json({ error: "Unbekannter Schluessel" }, { status: 401 });
  const parsed = zBody.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungueltiger Aufbau: products[] erwartet" }, { status: 400 });
  }

  const db = adminClient();
  const results: { externalRef: string; status: "neu" | "aktualisiert"; url: string }[] = [];

  for (const p of parsed.data.products) {
    const { data: vorhanden, error: leseFehler } = await db
      .from("shop_products")
      .select("id")
      .eq("external_ref", p.externalRef)
      .maybeSingle();
    if (leseFehler) return NextResponse.json({ error: leseFehler.message }, { status: 500 });

    const zeile = {
      external_ref: p.externalRef,
      name: p.name,
      kurz: p.kurz,
      kategorie: await shopKategorie(db, p.kategorie),
      preis_cents: p.priceCents,
      gewicht: p.gewicht ?? "",
      bild: p.bild ?? null,
      erzeuger: p.erzeuger ?? null,
      tax_key: p.taxKey ?? null,
      aktiv: p.aktiv ?? true,
      updated_at: new Date().toISOString(),
    };
    const schreib = vorhanden
      ? await db.from("shop_products").update(zeile).eq("id", vorhanden.id)
      : await db.from("shop_products").insert(zeile);
    if (schreib.error) return NextResponse.json({ error: schreib.error.message }, { status: 500 });

    results.push({
      externalRef: p.externalRef,
      status: vorhanden ? "aktualisiert" : "neu",
      url: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://www.xn--revierkche-geb.de"}/shop#${zeile.kategorie}`,
    });
  }

  return NextResponse.json({ results });
}
