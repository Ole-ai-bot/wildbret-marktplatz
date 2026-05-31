import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ChefHat, Clock, Users, Euro, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

export default async function KochschulePage() {
  const supabase = await createClient();
  const { data: kurse } = await supabase
    .from("kochkurse")
    .select("*")
    .gte("datum", new Date().toISOString())
    .order("datum", { ascending: true });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="inline-block bg-amber-100 text-amber-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
          Kurse & Events
        </span>
        <h1 className="text-3xl font-bold mb-3">Kochschule</h1>
        <p className="text-stone-500 text-lg max-w-xl">
          Lerne Wild von der Pike auf kennen — von der Zerlegung bis zum
          fertigen Gericht. Für Anfänger und Fortgeschrittene.
        </p>
      </div>

      {/* Kurse */}
      {!kurse?.length ? (
        <div className="bg-amber-50 rounded-2xl p-10 text-center border border-amber-100">
          <ChefHat size={40} className="mx-auto text-amber-300 mb-3" />
          <p className="font-medium text-stone-700">Neue Kurse werden bald veröffentlicht!</p>
          <p className="text-stone-400 text-sm mt-1">Schau bald wieder vorbei.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {kurse.map((kurs: any) => (
            <Link
              key={kurs.id}
              href={`/kochschule/kurs/${kurs.id}`}
              className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-5"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h2 className="font-semibold text-stone-900">{kurs.titel}</h2>
                {kurs.plaetze_frei > 0 ? (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {kurs.plaetze_frei} Plätze frei
                  </span>
                ) : (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                    Ausgebucht
                  </span>
                )}
              </div>
              <p className="text-sm text-stone-500 mb-4 line-clamp-2">{kurs.beschreibung}</p>
              <div className="flex flex-wrap gap-3 text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <CalendarDays size={12} />
                  {format(new Date(kurs.datum), "dd. MMM yyyy", { locale: de })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {kurs.dauer_stunden}h
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  max. {kurs.max_teilnehmer}
                </span>
                <span className="flex items-center gap-1 font-semibold text-amber-600">
                  <Euro size={12} />
                  {kurs.preis}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
