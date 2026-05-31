"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Leaf } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
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
        <h1 className="text-xl font-bold mb-1">Willkommen zurück</h1>
        <p className="text-stone-400 text-sm mb-6">Melde dich an, um fortzufahren.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail" className={inputCls}
          />
          <input
            type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort" className={inputCls}
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="bg-forest-700 hover:bg-forest-600 text-white font-medium py-2.5 rounded-xl transition disabled:opacity-60"
          >
            {loading ? "Anmelden..." : "Anmelden"}
          </button>
        </form>

        <p className="text-center text-sm text-stone-400 mt-5">
          Noch kein Konto?{" "}
          <Link href="/auth/register" className="text-forest-600 font-medium hover:underline">
            Registrieren
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputCls = "w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500";
