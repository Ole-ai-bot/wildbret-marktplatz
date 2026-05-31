"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Leaf } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ full_name: "", email: "", password: "", is_jaeger: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.full_name } },
    });

    if (signUpError) { setError(signUpError.message); setLoading(false); return; }

    if (data.user && form.is_jaeger) {
      await supabase.from("profiles").update({ is_jaeger: true }).eq("id", data.user.id);
    }

    router.push("/marktplatz");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-forest-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="flex items-center gap-2 mb-6">
          <Leaf className="text-forest-600" size={24} />
          <span className="font-bold text-lg">Revierküche</span>
        </div>
        <h1 className="text-xl font-bold mb-1">Konto erstellen</h1>
        <p className="text-stone-400 text-sm mb-6">Kostenlos registrieren.</p>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            placeholder="Vollständiger Name" className={inputCls}
          />
          <input
            type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="E-Mail" className={inputCls}
          />
          <input
            type="password" required minLength={6} value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Passwort (min. 6 Zeichen)" className={inputCls}
          />

          <label className="flex items-start gap-3 bg-forest-50 rounded-xl p-3 cursor-pointer">
            <input
              type="checkbox" checked={form.is_jaeger}
              onChange={(e) => setForm({ ...form, is_jaeger: e.target.checked })}
              className="mt-0.5 rounded"
            />
            <div>
              <p className="text-sm font-medium text-forest-800">Ich bin Jäger</p>
              <p className="text-xs text-stone-500">Ermöglicht dir, Inserate einzustellen.</p>
            </div>
          </label>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit" disabled={loading}
            className="bg-forest-700 hover:bg-forest-600 text-white font-medium py-2.5 rounded-xl transition disabled:opacity-60"
          >
            {loading ? "Registrieren..." : "Konto erstellen"}
          </button>
        </form>

        <p className="text-center text-sm text-stone-400 mt-5">
          Bereits registriert?{" "}
          <Link href="/auth/login" className="text-forest-600 font-medium hover:underline">
            Anmelden
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputCls = "w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500";
