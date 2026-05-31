"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function useFavorite(listingId: string) {
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) return;
      const { data } = await supabase
        .from("favorites")
        .select("listing_id")
        .eq("user_id", user.id)
        .eq("listing_id", listingId)
        .maybeSingle();
      if (!cancelled) setIsFav(!!data);
    }
    check();
    return () => { cancelled = true; };
  }, [listingId]);

  async function toggle() {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = "/auth/login"; return; }

    if (isFav) {
      await supabase.from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("listing_id", listingId);
      setIsFav(false);
    } else {
      await supabase.from("favorites").insert({ user_id: user.id, listing_id: listingId });
      setIsFav(true);
    }
    setLoading(false);
  }

  return { isFav, toggle, loading };
}
