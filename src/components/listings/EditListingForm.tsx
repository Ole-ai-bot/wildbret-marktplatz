"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TIER_ARTEN, KATEGORIEN, JAGD_METHODEN } from "@/lib/utils";
import { Loader2, Trash2 } from "lucide-react";
import type { Listing, ListingStatus } from "@/types";

const STATUS_OPTIONS: { value: ListingStatus; label: string }[] = [
  { value: "aktiv",      label: "Aktiv" },
  { value: "reserviert", label: "Reserviert" },
  { value: "verkauft",   label: "Verkauft" },
  { value: "inaktiv",    label: "Inaktiv (versteckt)" },
];

export function EditListingForm({ listing }: { listing: Listing }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: listing.title,
    description: listing.description,
    tier_art: listing.tier_art,
    kategorie: listing.kategorie,
    jagd_methode: listing.jagd_methode,
    jagd_methode_detail: listing.jagd_methode_detail ?? "",
    gewicht_kg: listing.gewicht_kg?.toString() ?? "",
    preis: listing.preis.toString(),
    preis_pro_kg: listing.preis_pro_kg,
    region: listing.region,
    abholung: listing.abholung,
    versand: listing.versand,
    barzahlung: listing.barzahlung ?? false,
    status: listing.status,
  });
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  function set(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.from("listings").update({
      ...form,
      gewicht_kg: form.gewicht_kg ? parseFloat(form.gewicht_kg) : null,
      preis: parseFloat(form.preis),
    }).eq("id", listing.id);

    if (error) { setError(error.message); setLoading(false); return; }
    router.push("/dashboard/listings");
  }

  async function handleDelete() {
    if (!confirm("Inserat wirklich löschen?")) return;
    setDeleting(true);
    const supabase = createClient();
    await supabase.from("listings").delete().eq("id", listing.id);
    router.push("/dashboard/listings");
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-5">
      <Section title="Produkt">
        <Field label="Titel *">
          <input value={form.title} onChange={(e) => set("title", e.target.value)} required className={inputCls} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Tierart">
            <select value={form.tier_art} onChange={(e) => set("tier_art", e.target.value)} className={inputCls}>
              {TIER_ARTEN.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Kategorie">
            <select value={form.kategorie} onChange={(e) => set("kategorie", e.target.value)} className={inputCls}>
              {KATEGORIEN.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Beschreibung">
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
            rows={4} className={`${inputCls} resize-none`} />
        </Field>
      </Section>

      <Section title="Jagd">
        <Field label="Jagdmethode">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {JAGD_METHODEN.map((m) => (
              <label key={m.value}
                className={`flex items-center gap-2 border rounded-xl px-3 py-2.5 cursor-pointer text-sm transition ${
                  form.jagd_methode === m.value ? "border-forest-500 bg-forest-50 text-forest-800 font-medium" : "border-stone-200"
                }`}>
                <input type="radio" name="jagd_methode" value={m.value}
                  checked={form.jagd_methode === m.value} onChange={() => set("jagd_methode", m.value)} className="hidden" />
                {m.label}
              </label>
            ))}
          </div>
        </Field>
        <Field label="Details (optional)">
          <textarea value={form.jagd_methode_detail} onChange={(e) => set("jagd_methode_detail", e.target.value)}
            rows={2} className={`${inputCls} resize-none`} />
        </Field>
      </Section>

      <Section title="Preis & Status">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Preis (€)">
            <input type="number" step="0.01" value={form.preis}
              onChange={(e) => set("preis", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Gewicht (kg)">
            <input type="number" step="0.1" value={form.gewicht_kg}
              onChange={(e) => set("gewicht_kg", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Status">
            <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputCls}>
              {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </Field>
          <Field label="Region">
            <input value={form.region} onChange={(e) => set("region", e.target.value)} className={inputCls} />
          </Field>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.abholung} onChange={(e) => set("abholung", e.target.checked)} className="rounded" />
            Abholung
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.versand} onChange={(e) => set("versand", e.target.checked)} className="rounded" />
            Versand
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.preis_pro_kg} onChange={(e) => set("preis_pro_kg", e.target.checked)} className="rounded" />
            Preis/kg
          </label>
        </div>
        {form.abholung && (
          <label className="flex items-center gap-2 text-sm cursor-pointer bg-earth-50 rounded-xl p-3 border border-earth-100">
            <input type="checkbox" checked={form.barzahlung} onChange={(e) => set("barzahlung", e.target.checked)} className="rounded" />
            Barzahlung bei Abholung akzeptieren
          </label>
        )}
      </Section>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={loading}
          className="flex-1 bg-forest-700 hover:bg-forest-600 text-white font-medium py-2.5 rounded-xl flex items-center gap-2 justify-center transition disabled:opacity-60">
          {loading && <Loader2 size={16} className="animate-spin" />}
          Speichern
        </button>
        <button type="button" onClick={handleDelete} disabled={deleting}
          className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl transition">
          <Trash2 size={18} />
        </button>
      </div>
    </form>
  );
}

const inputCls = "w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex flex-col gap-4">
      <h2 className="font-semibold text-stone-800">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-stone-600">{label}</label>
      {children}
    </div>
  );
}
