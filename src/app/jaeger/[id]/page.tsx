import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { ListingCard } from "@/components/listings/ListingCard";
import { SellerRatingBadge } from "@/components/ratings/SellerRatingBadge";
import { StarRating } from "@/components/ratings/StarRating";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import type { Listing, SellerRating, Rating } from "@/types";

export default async function JaegerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: profile }, { data: listings }, { data: ratingBadge }, { data: ratings }] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", id).single(),
      supabase
        .from("listings")
        .select("*, seller:profiles(full_name, region)")
        .eq("seller_id", id)
        .eq("status", "aktiv")
        .order("created_at", { ascending: false }),
      supabase.from("seller_ratings").select("*").eq("seller_id", id).maybeSingle(),
      supabase
        .from("ratings")
        .select("*, reviewer:profiles!ratings_reviewer_id_fkey(full_name)")
        .eq("seller_id", id)
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

  if (!profile) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profil-Header */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 mb-8">
        <div className="flex items-center gap-5">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.full_name}
              width={72}
              height={72}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-18 h-18 rounded-full bg-forest-200 flex items-center justify-center text-forest-700 text-3xl font-bold w-[72px] h-[72px]">
              {profile.full_name?.[0]}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{profile.full_name}</h1>
            {profile.region && (
              <p className="text-stone-500 text-sm flex items-center gap-1 mt-1">
                <MapPin size={14} /> {profile.region}
              </p>
            )}
            <div className="mt-2">
              <SellerRatingBadge rating={ratingBadge as SellerRating} />
            </div>
          </div>
        </div>
        {profile.bio && (
          <p className="text-stone-600 text-sm mt-4 border-t border-stone-100 pt-4">
            {profile.bio}
          </p>
        )}
      </div>

      {/* Aktive Inserate */}
      <h2 className="text-xl font-bold mb-4">Aktuelle Angebote</h2>
      {listings?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {listings.map((l) => <ListingCard key={l.id} listing={l as Listing} />)}
        </div>
      ) : (
        <p className="text-stone-400 text-sm mb-10">Keine aktiven Angebote.</p>
      )}

      {/* Bewertungen */}
      {(ratings ?? []).length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4">Bewertungen</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {(ratings as Rating[]).map((r) => (
              <div key={r.id} className="bg-white rounded-xl border border-stone-100 p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center text-forest-700 font-bold text-sm">
                    {(r.reviewer as any)?.full_name?.[0] ?? "?"}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{(r.reviewer as any)?.full_name}</p>
                    <p className="text-xs text-stone-400">
                      {format(new Date(r.created_at), "dd. MMM yyyy", { locale: de })}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <StarRating value={r.stars} readonly size={14} />
                  </div>
                </div>
                {r.comment && <p className="text-sm text-stone-600">{r.comment}</p>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
