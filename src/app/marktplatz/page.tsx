import { createClient } from "@/lib/supabase/server";
import { ListingCard } from "@/components/listings/ListingCard";
import { TIER_ARTEN, KATEGORIEN } from "@/lib/utils";
import type { Listing } from "@/types";

interface SearchParams {
  tier?: string;
  kategorie?: string;
  region?: string;
  barzahlung?: string;
}

export default async function MarktplatzPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("listings")
    .select("*, seller:profiles(full_name, region, avatar_url)")
    .eq("status", "aktiv")
    .order("created_at", { ascending: false });

  if (params.tier) query = query.eq("tier_art", params.tier);
  if (params.kategorie) query = query.eq("kategorie", params.kategorie);
  if (params.region) query = query.ilike("region", `%${params.region}%`);
  if (params.barzahlung === "1") query = query.eq("barzahlung", true);

  const { data: listings } = await query;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Marktplatz</h1>

      {/* Filter */}
      <form className="flex flex-wrap gap-3 mb-8">
        <select
          name="tier"
          defaultValue={params.tier ?? ""}
          className="border border-stone-200 rounded-xl px-3 py-2 text-sm bg-white"
        >
          <option value="">Alle Tierarten</option>
          {TIER_ARTEN.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          name="kategorie"
          defaultValue={params.kategorie ?? ""}
          className="border border-stone-200 rounded-xl px-3 py-2 text-sm bg-white"
        >
          <option value="">Alle Kategorien</option>
          {KATEGORIEN.map((k) => (
            <option key={k.value} value={k.value}>{k.label}</option>
          ))}
        </select>

        <input
          name="region"
          defaultValue={params.region ?? ""}
          placeholder="Region / Ort"
          className="border border-stone-200 rounded-xl px-3 py-2 text-sm bg-white"
        />

        <label className="flex items-center gap-2 text-sm bg-white border border-stone-200 rounded-xl px-3 py-2 cursor-pointer">
          <input
            type="checkbox"
            name="barzahlung"
            value="1"
            defaultChecked={params.barzahlung === "1"}
            className="rounded"
          />
          Barzahlung möglich
        </label>

        <button
          type="submit"
          className="bg-forest-700 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-forest-600 transition"
        >
          Filtern
        </button>
        <a href="/marktplatz" className="text-stone-400 hover:text-stone-600 px-2 py-2 text-sm">
          Zurücksetzen
        </a>
      </form>

      {/* Grid */}
      {listings && listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l as Listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-stone-400">
          <p className="text-lg">Keine Inserate gefunden.</p>
          <p className="text-sm mt-1">Versuche andere Filter oder sei der Erste!</p>
        </div>
      )}
    </div>
  );
}
