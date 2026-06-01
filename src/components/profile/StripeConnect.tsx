"use client";

import { useState, useEffect } from "react";
import { Loader2, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

interface ConnectStatus {
  connected: boolean;
  details_submitted: boolean;
  charges_enabled: boolean;
  payouts_enabled: boolean;
}

export function StripeConnect() {
  const [status, setStatus] = useState<ConnectStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    fetch("/api/stripe-connect")
      .then((r) => r.json())
      .then(setStatus)
      .finally(() => setLoading(false));
  }, []);

  async function handleConnect() {
    setConnecting(true);
    const res = await fetch("/api/stripe-connect", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setConnecting(false);
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
        <Loader2 size={20} className="animate-spin text-stone-300" />
      </div>
    );
  }

  const isFullyActive = status?.connected && status.details_submitted && status.charges_enabled;

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
      <h2 className="font-semibold mb-1">Zahlungskonto</h2>
      <p className="text-sm text-stone-500 mb-5">
        Um Verkäufe auf dem Marktplatz zu tätigen, benötigst du ein verbundenes Zahlungskonto.
        Bei jedem Verkauf erhältst du 90% direkt — 10% Plattformgebühr.
      </p>

      {isFullyActive ? (
        <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-4">
          <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-800">Zahlungskonto aktiv</p>
            <p className="text-xs text-green-600 mt-0.5">
              Zahlungen und Auszahlungen sind aktiviert. Du kannst Verkäufe empfangen.
            </p>
          </div>
        </div>
      ) : status?.connected && !status.details_submitted ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
            <AlertCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">Einrichtung unvollständig</p>
              <p className="text-xs text-amber-600 mt-0.5">
                Bitte schließe die Einrichtung deines Zahlungskontos ab.
              </p>
            </div>
          </div>
          <button
            onClick={handleConnect}
            disabled={connecting}
            className="bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium py-2.5 px-4 rounded-xl flex items-center gap-2 justify-center transition disabled:opacity-60"
          >
            {connecting ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
            Einrichtung fortsetzen
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={connecting}
          className="bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium py-2.5 px-4 rounded-xl flex items-center gap-2 justify-center transition disabled:opacity-60 w-full"
        >
          {connecting ? (
            <><Loader2 size={16} className="animate-spin" /> Wird eingerichtet...</>
          ) : (
            <>Zahlungskonto einrichten <ArrowRight size={16} /></>
          )}
        </button>
      )}
    </div>
  );
}
