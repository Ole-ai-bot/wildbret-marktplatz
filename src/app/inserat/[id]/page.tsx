import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Weight, Crosshair, Package, Calendar } from "lucide-react";
import { formatPreis, KATEGORIEN, JAGD_METHODEN } from "@/lib/utils";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import type { Listing, Rating, SellerRating } from "@/types";
import { InquiryForm } from "@/components/listings/InquiryForm";
import { BuyButton } from "@/components/listings/BuyButton";
import { FavoriteButton } from "@/components/listings/FavoriteButton";
import { StarRating } from "@/components/ratings/StarRating";
import { SellerRatingBadge } from "@/components/ratings/SellerRatingBadge";
import Link from "next/link";

export default async function InseratDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data }, { data: ratingsData }, { data: ratingBadge }] = await Promise.all([
    supabase
      .from("listings")
      .select("*, seller:profiles(id, full_name, region, phone, avatar_url, bio, stripe_account_id)")
      .eq("id", id)
      .single(),
    supabase
      .from("ratings")
      .select("*, reviewer:profiles(full_name, avatar_url)")
      .eq("seller_id", (await supabase.from("listings").select("seller_id").eq("id", id).single()).data?.seller_id ?? "")
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("seller_ratings")
      .select("*")
      .eq("seller_id", (await supabase.from("listings").select("seller_id").eq("id", id).single()).data?.seller_id ?? "")
      .maybeSingle(),
  ]);

  if (!data) notFound();

  const listing = data as Listing;
  const ratings = (ratingsData ?? []) as Rating[];
  const kat = KATEGORIEN.find((k) => k.value === listing.kategorie);
  const jagdLabel = JAGD_METHODEN.find((j) => j.value === listing.jagd_methode)?.label;
  const seller = listing.seller as any;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">

        {/* Bilder */}
        <div className="flex flex-col gap-3">
          <div className="relative h-72 md:h-96 bg-stone-100 rounded-2xl overflow-hidden">
            {listing.images?.[0] ? (
              <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-stone-300 text-5xl">🦌</div>
            )}
            <div className="absolute top-3 right-3">
              <FavoriteButton listingId={listing.id} />
            </div>
          </div>
          {listing.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {listing.images.slice(1).map((img, i) => (
                <div key={i} className="relative h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden bg-stone-100">
                  <Image src={img} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-sm bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full font-medium">
                {listing.tier_art}
              </span>
              <span className="text-sm bg-earth-100 text-earth-700 px-2 py-0.5 rounded-full">
                {kat?.label}
              </span>
              {listing.status !== "aktiv" && (
                <span className="text-sm bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">
                  {listing.status === "verkauft" ? "Verkauft" : "Reserviert"}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold">{listing.title}</h1>
            <p className="text-3xl font-bold text-forest-700 mt-2">
              {formatPreis(listing.preis, listing.preis_pro_kg)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <InfoRow icon={<MapPin size={15} />} label="Region" value={listing.region} />
            {listing.gewicht_kg && (
              <InfoRow icon={<Weight size={15} />} label="Gewicht" value={`${listing.gewicht_kg} kg`} />
            )}
            <InfoRow icon={<Crosshair size={15} />} label="Jagdmethode" value={jagdLabel ?? ""} />
            <InfoRow
              icon={<Package size={15} />}
              label="Lieferung"
              value={[listing.abholung && "Abholung", listing.versand && "Versand"].filter(Boolean).join(" & ")}
            />
            <InfoRow
              icon={<Calendar size={15} />}
              label="Eingestellt"
              value={format(new Date(listing.created_at), "dd. MMM yyyy", { locale: de })}
            />
          </div>

          {listing.jagd_methode_detail && (
            <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-600">
              <p className="font-medium text-stone-800 mb-1">Details zur Jagd</p>
              <p>{listing.jagd_methode_detail}</p>
            </div>
          )}

          <div className="text-sm text-stone-600">
            <p className="font-medium text-stone-800 mb-1">Beschreibung</p>
            <p className="whitespace-pre-line">{listing.description}</p>
          </div>

          {/* Verkäufer */}
          {seller && (
            <Link
              href={`/jaeger/${seller.id}`}
              className="bg-forest-50 rounded-xl p-4 hover:bg-forest-100 transition block"
            >
              <p className="text-xs text-forest-600 font-medium mb-2">Anbieter</p>
              <div className="flex items-center gap-3">
                {seller.avatar_url ? (
                  <Image src={seller.avatar_url} alt="" width={40} height={40} className="rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-forest-200 flex items-center justify-center text-forest-700 font-bold">
                    {seller.full_name?.[0]}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{seller.full_name}</p>
                  {seller.region && <p className="text-xs text-stone-500">{seller.region}</p>}
                  <SellerRatingBadge rating={ratingBadge as SellerRating} />
                </div>
              </div>
            </Link>
          )}

          {listing.status === "aktiv" && (
            <div className="flex flex-col gap-3">
              {(listing.seller as any)?.stripe_account_id ? (
                <>
                  <BuyButton
                    listingId={listing.id}
                    versand={listing.versand}
                    abholung={listing.abholung}
                  />
                  <div className="flex items-center gap-3 my-1">
                    <div className="flex-1 h-px bg-stone-200" />
                    <span className="text-xs text-stone-400 uppercase tracking-wider">oder</span>
                    <div className="flex-1 h-px bg-stone-200" />
                  </div>
                </>
              ) : null}
              <InquiryForm listingId={listing.id} />
            </div>
          )}
        </div>
      </div>

      {/* Bewertungen */}
      {ratings.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-5">Bewertungen des Anbieters</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {ratings.map((r) => (
              <div key={r.id} className="bg-white rounded-xl border border-stone-100 p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center text-forest-700 text-sm font-bold">
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
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 bg-stone-50 rounded-xl p-3">
      <span className="text-stone-400 mt-0.5">{icon}</span>
      <div>
        <p className="text-xs text-stone-400">{label}</p>
        <p className="font-medium text-stone-800">{value}</p>
      </div>
    </div>
  );
}
