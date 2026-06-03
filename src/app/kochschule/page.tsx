import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { ChefHat, Clock, Users, Euro, CalendarDays, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

const KURS_FORMATE = [
  { titel: "Wild zerlegen & zubereiten", text: "Von der Zerlegung bis zum fertigen Gericht — lerne die Grundlagen der Wildküche von Grund auf. Für Anfänger und Fortgeschrittene." },
  { titel: "Wild trifft Trüffel", text: "Odenwälder Trüffel und heimisches Wild — eine außergewöhnliche Kombination in einem unvergesslichen Kochkurs." },
  { titel: "Rhein & Revier", text: "Wilder Rhein-Fisch trifft heimisches Wild. Gemeinsam mit dem Rheinfischer — ein Format, das es nirgendwo sonst gibt." },
  { titel: "Nose to Tail", text: "Das ganze Tier auf dem Tisch. Wir verwerten alles — von der Keule bis zur Wurst. Nachhaltig, handwerklich, lehrreich." },
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
      {/* Hero — geteiltes Bild */}
      <div className="grid md:grid-cols-2 min-h-[50vh]">
        <div className="relative h-64 md:h-auto bg-stone-950 overflow-hidden">
          <Image
            src="/images/wildboar-burger.jpg"
            alt="Kochschule Revierküche"
            fill
            className="object-cover opacity-80"
            priority
          />
        </div>
        <div className="bg-stone-950 text-white p-10 md:p-16 flex flex-col justify-center">
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-6">Kurse & Events</p>
          <h1 className="font-playfair text-5xl font-bold mb-4">Kochschule</h1>
          <div className="w-10 h-px bg-amber-600 mb-6" />
          <p className="text-stone-400 text-base leading-relaxed">
            Lerne Wild von der Pike auf kennen — von der Zerlegung bis zum
            fertigen Gericht. Im Manufaktur-Ambiente, mit echtem Handwerk.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Kurs-Formate */}
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">Formate</p>
          <h2 className="font-playfair text-3xl font-bold mb-10">Unsere Kurs-Formate</h2>
          <div className="grid md:grid-cols-2 gap-px bg-stone-100">
            {KURS_FORMATE.map((f) => (
              <div key={f.titel} className="bg-white p-8">
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">{f.titel}</p>
                <p className="text-stone-600 text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fotos — Hirsch & Chef */}
        <div className="grid md:grid-cols-3 gap-px bg-stone-100 mb-16">
          <div className="relative h-64 overflow-hidden">
            <Image src="/images/hirsch.jpg" alt="Hirschfilet" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-stone-950/80 to-transparent">
              <p className="text-white text-xs tracking-widest uppercase">Hirschfilet</p>
            </div>
          </div>
          <div className="relative h-64 overflow-hidden">
            <Image src="/images/wildschwein.jpg" alt="Wildschwein" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-stone-950/80 to-transparent">
              <p className="text-white text-xs tracking-widest uppercase">Wildschwein</p>
            </div>
          </div>
          <div className="relative h-64 overflow-hidden">
            <Image src="/images/forelle.jpg" alt="Forellengericht" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-stone-950/80 to-transparent">
              <p className="text-white text-xs tracking-widest uppercase">Fisch & Wild</p>
            </div>
          </div>
        </div>

        {/* Aktuelle Kurse */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays size={16} className="text-amber-500" />
            <p className="text-xs tracking-widest uppercase text-stone-400">Termine</p>
          </div>
          <h2 className="font-playfair text-3xl font-bold mb-4">Aktuelle Kurse</h2>
          <p className="text-stone-400 text-sm mb-10">Die Kurse sind auf kleine Gruppen begrenzt — sichere dir jetzt deinen Platz.</p>

          {!kurse?.length ? (
            <div className="bg-amber-50 border border-amber-100 p-10 text-center">
              <ChefHat size={36} className="mx-auto text-amber-300 mb-3" />
              <p className="font-medium text-stone-700">Neue Termine kommen bald!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-px bg-stone-100">
              {kurse.map((kurs: any) => (
                <Link key={kurs.id} href={`/kochschule/kurs/${kurs.id}`}
                  className="bg-white p-8 hover:bg-stone-50 transition group">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <h2 className="font-playfair text-lg font-bold text-stone-900 group-hover:text-forest-700 transition">{kurs.titel}</h2>
                    {kurs.plaetze_frei > 0 ? (
                      <span className="text-xs border border-green-200 text-green-700 px-2 py-0.5 whitespace-nowrap">{kurs.plaetze_frei} frei</span>
                    ) : (
                      <span className="text-xs border border-red-200 text-red-500 px-2 py-0.5">Ausgebucht</span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500 mb-6 line-clamp-2">{kurs.beschreibung}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-stone-400">
                    <span className="flex items-center gap-1"><CalendarDays size={12} />{format(new Date(kurs.datum), "dd. MMM yyyy", { locale: de })}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{kurs.dauer_stunden}h</span>
                    <span className="flex items-center gap-1"><Users size={12} />max. {kurs.max_teilnehmer}</span>
                    <span className="flex items-center gap-1 text-amber-600 font-semibold"><Euro size={12} />{kurs.preis}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Ziegenkäse Feature */}
        <div className="grid md:grid-cols-2 gap-px bg-stone-100 mb-16">
          <div className="relative h-64 md:h-auto overflow-hidden">
            <Image src="/images/ziegenkäse-dessert.jpg" alt="Nußlocher Ziegenkäse mit Aprikose und Lavendel" fill className="object-cover" />
          </div>
          <div className="bg-white p-10 flex flex-col justify-center">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Kursbeispiel</p>
            <h2 className="font-playfair text-2xl font-bold mb-4">Nußlocher Ziegenkäse mit Aprikose und Lavendel</h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">
              In unseren Kochkursen arbeiten wir mit den Produkten unserer Erzeuger.
              Der Ziegenkäse vom Nußlocher Ziegenkäsehof trifft auf regionales Obst
              und aromatischen Lavendel — ein Dessert mit Geschichte.
            </p>
            <Link href="/erzeuger"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-stone-400 hover:text-stone-800 transition">
              Unsere Erzeuger <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* CTA Gruppenanfragen */}
        <div className="bg-forest-800 text-white p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-widest uppercase text-forest-400 mb-2">Gruppenanfragen & Events</p>
            <h2 className="font-playfair text-2xl font-bold mb-1">Private Kochkurse & Firmenevents</h2>
            <p className="text-forest-200 text-sm">Revierabende, Teamevents, Hochzeiten — wir planen mit euch.</p>
          </div>
          <a href="mailto:info@revierkueche.de"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-500 text-white text-xs tracking-widest uppercase px-6 py-3 transition">
            Anfrage stellen <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
