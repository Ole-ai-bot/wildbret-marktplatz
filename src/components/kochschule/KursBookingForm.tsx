"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, CheckCircle2 } from "lucide-react";

export function KursBookingForm({
  kursId,
  kursTitle,
  preis,
}: {
  kursId: string;
  kursTitle: string;
  preis: number;
}) {
  const [form, setForm] = useState({ name: "", email: "", telefon: "", personen: 1, nachricht: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const supabase = createClient();

    const { error } = await supabase.from("kursbuchungen").insert({
      kurs_id: kursId,
      name: form.name,
      email: form.email,
      telefon: form.telefon || null,
      personen: form.personen,
      nachricht: form.nachricht || null,
      status: "angefragt",
    });

    setStatus(error ? "error" : "done");
  }

  if (status === "done") {
    return (
      <div className="bg-green-50 rounded-xl p-6 text-center">
        <CheckCircle2 size={40} className="text-green-500 mx-auto mb-3" />
        <p className="font-semibold text-green-800">Buchungsanfrage gesendet!</p>
        <p className="text-green-600 text-sm mt-1">
          Wir melden uns per E-Mail um deine Buchung zu bestätigen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="font-semibold">Jetzt buchen</h2>
      <p className="text-sm text-stone-500">
        Gesamtpreis: <strong className="text-stone-800">{form.personen * preis} €</strong> ({form.personen} × {preis} €)
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name *">
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Dein Name" className={inputCls} />
        </Field>
        <Field label="E-Mail *">
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="deine@email.de" className={inputCls} />
        </Field>
        <Field label="Telefon">
          <input value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })}
            placeholder="+49 ..." className={inputCls} />
        </Field>
        <Field label="Anzahl Personen">
          <input type="number" min={1} max={10} value={form.personen}
            onChange={(e) => setForm({ ...form, personen: parseInt(e.target.value) })}
            className={inputCls} />
        </Field>
      </div>

      <Field label="Nachricht (optional)">
        <textarea value={form.nachricht} onChange={(e) => setForm({ ...form, nachricht: e.target.value })}
          rows={3} placeholder="Besondere Wünsche, Allergien, etc."
          className={`${inputCls} resize-none`} />
      </Field>

      {status === "error" && (
        <p className="text-red-500 text-sm">Fehler beim Senden. Bitte erneut versuchen.</p>
      )}

      <button type="submit" disabled={status === "sending"}
        className="bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 rounded-xl flex items-center gap-2 justify-center transition disabled:opacity-60">
        {status === "sending" ? <><Loader2 size={18} className="animate-spin" /> Wird gesendet...</> : "Buchungsanfrage senden"}
      </button>
    </form>
  );
}

const inputCls = "w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-stone-600">{label}</label>
      {children}
    </div>
  );
}
