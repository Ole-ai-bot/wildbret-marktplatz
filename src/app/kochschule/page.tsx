import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ChefHat, Clock, Users, Euro, CalendarDays, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

const KURS_FORMATE = [
  {
    emoji: "🦌",
    titel: "Wild zerlegen & zubereiten",
    text: "Von der Zerlegung bis zum fertigen Gericht — lerne die Grundlagen der Wildküche von Grund auf. Für Anfänger und Fortgeschrittene.",
  },
  {
    emoji: "🍄",
    titel: "Wild trifft Trüffel",
    text: "Odenwälder Trüffel und heimisches Wild — eine außergewöhnliche Kombination in einem unvergesslichen Kochkurs.",
  },
  {
    emoji: "🎣",
    titel: "Rhein & Revier",
    text: "Wilder Rhein-Fisch trifft heimisches Wild. Gemeinsam mit dem Rheinfischer — ein Format, das es nirgendwo sonst gibt.",
  },
  {
    emoji: "🐽",
    titel: "Nose to Tail",
    text: "Das ganze Tier auf dem Tisch. Wir verwerten alles — von der Keule bis zur Wurst. Nachhaltig, handwerklich, lehrreich.",
  },
];

export default async function KochschulePage() {
  const supabase = await createClient();
  const { data: kurse } = await supabase
    .from("kochkurse")
    .select("*")
    .gte("datum", new Date().toISOString())
    .order("datum", { ascending: true })
    .limit(6);

  return (
    <div>
      {/* Hero */}
      <div className="bg-stone-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-stone-600 text-stone-100 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Kurse & Events
          </span>
          <h1 className="text-4xl font-bold mb-4">Kochschule</h1>
          <p className="text-stone-200 text-lg max-w-2xl">
            Lerne Wild von der Pike auf kennen — von der Zerlegung bis zum fertigen Gericht.
            Im Manufaktur-Ambiente, mit regionalen Erzeugern als Gäste und echtem Handwerk
            statt Supermarkt-Kochen.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Kurs-Formate */}
        <h2 className="text-2xl font-bold mb-6">Unsere Kurs-Formate</h2>
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {KURS_FORMATE.map((f) => (
            <div key={f.titel} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
              <span className="text-3xl mb-3 block">{f.emoji}</span>
              <h3 className="font-semibold text-stone-800 mb-2">{f.titel}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>

        {/* Aktuelle Kurse */}
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <CalendarDays size={22} className="text-amber-500" />
          Aktuelle Termine
        </h2>
        <p className="text-stone-400 text-sm mb-6">Sichere dir jetzt deinen Platz — die Kurse sind auf kleine Gruppen begrenzt.</p>

        {!kurse?.length ? (
          <div className="bg-amber-50 rounded-2xl p-10 text-center border border-amber-100">
            <ChefHat size={40} className="mx-auto text-amber-300 mb-3" />
            <p className="font-medium text-stone-700">Neue Termine kommen bald!</p>
            <p className="text-stone-400 text-sm mt-1">Schau bald wieder vorbei oder schreib uns.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {kurse.map((kurs: any) => (
              <Link key={kurs.id} href={`/kochschule/kurs/${kurs.id}`}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h2 className="font-semibold text-stone-900">{kurs.titel}</h2>
                  {kurs.plaetze_frei > 0 ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {kurs.plaetze_frei} Plätze frei
                    </span>
                  ) : (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Ausgebucht</span>
                  )}
                </div>
                <p className="text-sm text-stone-500 mb-4 line-clamp-2">{kurs.beschreibung}</p>
                <div className="flex flex-wrap gap-3 text-xs text-stone-500">
                  <span className="flex items-center gap-1"><CalendarDays size={12} />{format(new Date(kurs.datum), "dd. MMM yyyy", { locale: de })}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{kurs.dauer_stunden}h</span>
                  <span className="flex items-center gap-1"><Users size={12} />max. {kurs.max_teilnehmer}</span>
                  <span className="flex items-center gap-1 font-semibold text-amber-600"><Euro size={12} />{kurs.preis}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-forest-800 text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg mb-1">Gruppenanfragen & Events</p>
            <p className="text-forest-200 text-sm">Private Kochkurse, Firmenevents, Revierabende — wir planen mit euch.</p>
          </div>
          <Link href="/kontakt"
            className="bg-forest-500 hover:bg-forest-400 text-white font-medium px-6 py-2.5 rounded-xl flex items-center gap-2 transition whitespace-nowrap">
            Anfrage stellen <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
