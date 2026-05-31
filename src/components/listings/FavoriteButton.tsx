"use client";

import { Heart } from "lucide-react";
import { useFavorite } from "@/hooks/useFavorite";
import { cn } from "@/lib/utils";

export function FavoriteButton({ listingId }: { listingId: string }) {
  const { isFav, toggle, loading } = useFavorite(listingId);

  return (
    <button
      onClick={(e) => { e.preventDefault(); toggle(); }}
      disabled={loading}
      className={cn(
        "p-2 rounded-full transition",
        isFav
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-white/80 text-stone-400 hover:text-red-400"
      )}
      aria-label={isFav ? "Aus Merkliste entfernen" : "Merken"}
    >
      <Heart size={18} className={isFav ? "fill-red-500" : ""} />
    </button>
  );
}
