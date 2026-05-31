"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Send } from "lucide-react";

export function InquiryForm({ listingId }: { listingId: string }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/auth/login";
      return;
    }

    const { error } = await supabase.from("inquiries").insert({
      listing_id: listingId,
      buyer_id: user.id,
      message,
    });

    setStatus(error ? "error" : "sent");
  }

  if (status === "sent") {
    return (
      <div className="bg-forest-50 border border-forest-200 rounded-xl p-4 text-forest-700 text-sm">
        Deine Anfrage wurde gesendet! Der Anbieter meldet sich bei dir.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <p className="text-sm font-medium text-stone-700">Anfrage senden</p>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Deine Nachricht an den Anbieter..."
        required
        rows={3}
        className="border border-stone-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-forest-500"
      />
      {status === "error" && (
        <p className="text-red-500 text-xs">Fehler beim Senden. Bitte erneut versuchen.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-forest-700 hover:bg-forest-600 text-white font-medium px-4 py-2.5 rounded-xl flex items-center gap-2 justify-center transition disabled:opacity-60"
      >
        <Send size={16} />
        {status === "sending" ? "Wird gesendet..." : "Anfrage senden"}
      </button>
    </form>
  );
}
