import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ListingCard } from "@/components/listings/ListingCard";
import type { Listing } from "@/types";
import { Heart } from "lucide-react";

export default async function FavoritenPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: favs } = await supabase
    .from("favorites")
    .select("listing:listings(*, seller:profiles(full_name, region))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const listings = (favs ?? []).map((f: any) => f.listing).filter(Boolean) as Listing[];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Heart size={22} className="text-red-500 fill-red-500" />
        Merkliste
      </h1>

      {!listings.length ? (
        <div className="text-center py-16 text-stone-400">
          <p>Noch keine Inserate gemerkt.</p>
          <a href="/marktplatz" className="text-forest-600 text-sm mt-2 inline-block hover:underline">
            Zum Marktplatz
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  );
}
