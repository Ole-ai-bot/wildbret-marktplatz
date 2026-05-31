import Link from "next/link";
import Image from "next/image";
import { MapPin, Weight, Tag } from "lucide-react";
import type { Listing } from "@/types";
import { formatPreis, KATEGORIEN } from "@/lib/utils";
import { cn } from "@/lib/utils";

const KATEGORIE_COLORS: Record<string, string> = {
  ganzes_tier:  "bg-earth-100 text-earth-800",
  teilzerwirkt: "bg-forest-100 text-forest-800",
  veredelt:     "bg-amber-100 text-amber-800",
};

export function ListingCard({ listing }: { listing: Listing }) {
  const kat = KATEGORIEN.find((k) => k.value === listing.kategorie);
  const imgSrc = listing.images?.[0] ?? "/placeholder-wild.jpg";

  return (
    <Link
      href={`/inserat/${listing.id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div className="relative h-48 bg-stone-100">
        <Image src={imgSrc} alt={listing.title} fill className="object-cover" />
        <span
          className={cn(
            "absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full",
            KATEGORIE_COLORS[listing.kategorie]
          )}
        >
          {kat?.label}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-stone-400 mb-0.5">{listing.tier_art}</p>
            <h3 className="font-semibold text-stone-900 line-clamp-2 leading-snug">
              {listing.title}
            </h3>
          </div>
          <span className="text-forest-700 font-bold text-lg whitespace-nowrap">
            {formatPreis(listing.preis, listing.preis_pro_kg)}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-3 text-xs text-stone-500">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {listing.region}
          </span>
          {listing.gewicht_kg && (
            <span className="flex items-center gap-1">
              <Weight size={12} /> {listing.gewicht_kg} kg
            </span>
          )}
          <span className="flex items-center gap-1">
            <Tag size={12} />
            {listing.abholung && "Abholung"}
            {listing.abholung && listing.versand && " · "}
            {listing.versand && "Versand"}
          </span>
        </div>
      </div>
    </Link>
  );
}
