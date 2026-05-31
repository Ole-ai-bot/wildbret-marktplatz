"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { createClient } from "@/lib/supabase/client";
import { TIER_ARTEN, KATEGORIEN, JAGD_METHODEN } from "@/lib/utils";
import { ImagePlus, X, Loader2 } from "lucide-react";
import Image from "next/image";
import type { TierArt, ProduktKategorie, JagdMethode } from "@/types";

interface FormData {
  title: string;
  description: string;
  tier_art: TierArt | "";
  kategorie: ProduktKategorie | "";
  jagd_methode: JagdMethode | "";
  jagd_methode_detail: string;
  gewicht_kg: string;
  preis: string;
  preis_pro_kg: boolean;
  region: string;
  abholung: boolean;
  versand: boolean;
}

export function NewListingForm() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState<FormData>({
    title: "", description: "", tier_art: "", kategorie: "",
    jagd_methode: "", jagd_methode_detail: "", gewicht_kg: "",
    preis: "", preis_pro_kg: false, region: "", abholung: true, versand: false,
  });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback((accepted: File[]) => {
    const combined = [...images, ...accepted].slice(0, 8);
    setImages(combined);
    setPreviews(combined.map((f) => URL.createObjectURL(f)));
  }, [images]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 8,
  });

  function removeImage(i: number) {
    const next = images.filter((_, idx) => idx !== i);
    setImages(next);
    setPreviews(next.map((f) => URL.createObjectURL(f)));
  }

  function set(key: keyof FormData, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function uploadImages(userId: string): Promise<string[]> {
    const urls: string[] = [];
    for (const file of images) {
      const ext = file.name.split(".").pop();
      const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage
        .from("listing-images")
        .upload(path, file, { cacheControl: "3600" });
      if (error) throw error;
      const { data } = supabase.storage.from("listing-images").getPublicUrl(path);
      urls.push(data.publicUrl);
    }
    return urls;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }

      const imageUrls = await uploadImages(user.id);

      const { data, error: insertError } = await supabase.from("listings").insert({
        seller_id: user.id,
        title: form.title,
        description: form.description,
        tier_art: form.tier_art as TierArt,
        kategorie: form.kategorie as ProduktKategorie,
        jagd_methode: form.jagd_methode as JagdMethode,
        jagd_methode_detail: form.jagd_methode_detail || null,
        gewicht_kg: form.gewicht_kg ? parseFloat(form.gewicht_kg) : null,
        preis: parseFloat(form.preis),
        preis_pro_kg: form.preis_pro_kg,
        region: form.region,
        abholung: form.abholung,
        versand: form.versand,
        images: imageUrls,
        status: "aktiv",
      }).select().single();

      if (insertError) throw insertError;
      router.push(`/inserat/${data.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      {/* Bilder */}
      <Section title="Fotos" hint="Bis zu 8 Bilder (erstes Bild = Titelbild)">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition ${
            isDragActive ? "border-forest-500 bg-forest-50" : "border-stone-200 hover:border-forest-400"
          }`}
        >
          <input {...getInputProps()} />
          <ImagePlus size={32} className="mx-auto text-stone-300 mb-2" />
          <p className="text-sm text-stone-500">
            Bilder hier ablegen oder <span className="text-forest-600 font-medium">auswählen</span>
          </p>
          <p className="text-xs text-stone-400 mt-1">JPG, PNG, WEBP — max. 8 Bilder</p>
        </div>

        {previews.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-3">
            {previews.map((src, i) => (
              <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100">
                <Image src={src} alt="" fill className="object-cover" />
                {i === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 text-center text-white text-[10px] bg-black/50 py-0.5">
                    Titel
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Basisinfos */}
      <Section title="Produkt">
        <div className="flex flex-col gap-4">
          <Field label="Titel *">
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              required
              placeholder="z.B. Rehkeule frisch, 2 kg"
              className={inputCls}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Tierart *">
              <select
                value={form.tier_art}
                onChange={(e) => set("tier_art", e.target.value)}
                required
                className={inputCls}
              >
                <option value="">Bitte wählen</option>
                {TIER_ARTEN.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>

            <Field label="Kategorie *">
              <select
                value={form.kategorie}
                onChange={(e) => set("kategorie", e.target.value)}
                required
                className={inputCls}
              >
                <option value="">Bitte wählen</option>
                {KATEGORIEN.map((k) => (
                  <option key={k.value} value={k.value}>{k.label}</option>
                ))}
              </select>
            </Field>
          </div>

          {form.kategorie && (
            <p className="text-xs text-stone-500 bg-stone-50 rounded-xl px-3 py-2">
              {KATEGORIEN.find((k) => k.value === form.kategorie)?.description}
            </p>
          )}

          <Field label="Beschreibung *">
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              required
              rows={4}
              placeholder="Beschreibe das Produkt: Zustand, Besonderheiten, etc."
              className={`${inputCls} resize-none`}
            />
          </Field>
        </div>
      </Section>

      {/* Jagdmethode */}
      <Section title="Jagd" hint="Transparenz schafft Vertrauen">
        <div className="flex flex-col gap-4">
          <Field label="Jagdmethode *">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {JAGD_METHODEN.map((m) => (
                <label
                  key={m.value}
                  className={`flex items-center gap-2 border rounded-xl px-3 py-2.5 cursor-pointer text-sm transition ${
                    form.jagd_methode === m.value
                      ? "border-forest-500 bg-forest-50 text-forest-800 font-medium"
                      : "border-stone-200 hover:border-forest-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="jagd_methode"
                    value={m.value}
                    checked={form.jagd_methode === m.value}
                    onChange={() => set("jagd_methode", m.value)}
                    required
                    className="hidden"
                  />
                  {m.label}
                </label>
              ))}
            </div>
          </Field>

          <Field label="Details zur Jagd (optional)">
            <textarea
              value={form.jagd_methode_detail}
              onChange={(e) => set("jagd_methode_detail", e.target.value)}
              rows={2}
              placeholder="z.B. Erlegt am Waldrand bei Sonnenuntergang, kurzer Schuss, kein Anschuss"
              className={`${inputCls} resize-none`}
            />
          </Field>
        </div>
      </Section>

      {/* Preis & Gewicht */}
      <Section title="Preis & Gewicht">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Preis (€) *">
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.preis}
              onChange={(e) => set("preis", e.target.value)}
              required
              placeholder="0.00"
              className={inputCls}
            />
          </Field>

          <Field label="Gewicht (kg)">
            <input
              type="number"
              step="0.1"
              min="0"
              value={form.gewicht_kg}
              onChange={(e) => set("gewicht_kg", e.target.value)}
              placeholder="z.B. 4.5"
              className={inputCls}
            />
          </Field>
        </div>

        <label className="flex items-center gap-2 text-sm cursor-pointer mt-2">
          <input
            type="checkbox"
            checked={form.preis_pro_kg}
            onChange={(e) => set("preis_pro_kg", e.target.checked)}
            className="rounded"
          />
          Preis gilt pro kg
        </label>
      </Section>

      {/* Region & Lieferung */}
      <Section title="Abholung & Lieferung">
        <Field label="Region / Ort *">
          <input
            value={form.region}
            onChange={(e) => set("region", e.target.value)}
            required
            placeholder="z.B. Schwarzwald / Baden-Württemberg"
            className={inputCls}
          />
        </Field>

        <div className="flex gap-6 mt-3">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={form.abholung}
              onChange={(e) => set("abholung", e.target.checked)}
              className="rounded"
            />
            Abholung möglich
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={form.versand}
              onChange={(e) => set("versand", e.target.checked)}
              className="rounded"
            />
            Versand möglich
          </label>
        </div>
      </Section>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-forest-700 hover:bg-forest-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-60"
      >
        {loading ? <><Loader2 size={18} className="animate-spin" /> Wird veröffentlicht...</> : "Inserat veröffentlichen"}
      </button>
    </form>
  );
}

const inputCls = "w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white";

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex flex-col gap-4">
      <div>
        <h2 className="font-semibold text-stone-800">{title}</h2>
        {hint && <p className="text-xs text-stone-400 mt-0.5">{hint}</p>}
      </div>
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
