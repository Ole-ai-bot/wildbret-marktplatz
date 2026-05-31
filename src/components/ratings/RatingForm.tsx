"use client";

import { useState } from "react";
import { StarRating } from "./StarRating";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

interface RatingFormProps {
  orderId: string;
  sellerId: string;
  onDone?: () => void;
}

export function RatingForm({ orderId, sellerId, onDone }: RatingFormProps) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (stars === 0) return;
    setStatus("saving");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("ratings").insert({
      order_id: orderId,
      reviewer_id: user.id,
      seller_id: sellerId,
      stars,
      comment: comment || null,
    });

    setStatus(error ? "error" : "done");
    if (!error) onDone?.();
  }

  if (status === "done") {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800 text-sm">
        Danke für deine Bewertung!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <p className="text-sm font-medium">Verkäufer bewerten</p>
      <StarRating value={stars} onChange={setStars} size={28} />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Dein Kommentar (optional)"
        rows={3}
        className="border border-stone-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-forest-500"
      />
      {status === "error" && <p className="text-red-500 text-xs">Fehler. Bitte erneut versuchen.</p>}
      <button
        type="submit"
        disabled={stars === 0 || status === "saving"}
        className="bg-amber-500 hover:bg-amber-400 text-white font-medium py-2 rounded-xl flex items-center gap-2 justify-center transition disabled:opacity-50"
      >
        {status === "saving" && <Loader2 size={16} className="animate-spin" />}
        Bewertung absenden
      </button>
    </form>
  );
}
