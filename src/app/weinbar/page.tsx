import { Wine, Clock, CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";

const ANGEBOTE = [
  {
    emoji: "🦌",
    titel: "Wildaufschnitt & Vesper",
    text: "Hausgemachter Wildaufschnitt, Ziegenkäse aus Nußloch und frisches Sauerteigbrot — der perfekte Einstieg in den Abend.",
  },
  {
    emoji: "🍷",
    titel: "Kuratierte Weinauswahl",
    text: "Weine, die zu Wild passen. Persönlich ausgewählt, mit Geschichte — kein Supermarktregal, sondern echte Empfehlungen.",
  },
  {
    emoji: "🍸",
    titel: "Handgemachter Gin",
    text: "\"Inge und der Honigbär\" aus Mosbach — handgemachte London Dry Gins in kleinen Batches, mit außergewöhnlichen Botanicals.",
  },
  {
    emoji: "☕",
    titel: "Specialty Coffee",
    text: "Frisch geröstet von der Privatrösterei Bonafede aus Hockenheim — Slow Roasting, Demeter-zertifiziert, Röster des Jahres 2016.",
  },
];

const EVENTS = [
  {
    titel: "Revierabend",
    beschreibung: "Jäger, Foodies und Neugierige kommen zusammen. Wild, Wein, Geschichten aus dem Revier.",
    turnus: "Monatlich",
  },
  {
    titel: "Erzeuger-Abend",
    beschreibung: "Ein Erzeuger stellt sich vor — Trüffelabend, Forellen-Verkostung, Ziegenkäse-Tasting.",
    turnus: "Saisonal",
  },
  {
    titel: "Nose to Tail Abend",
    beschreibung: "Das ganze Tier auf dem Tisch — von der Keule bis zur Wurst, begleitet von passenden Weinen.",
    turnus: "Quartalsweise",
  },
];

export default function WeinbarPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-purple-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-purple-700 text-purple-100 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Walk-in · Verkostung · Revierabende
          </span>
          <h1 className="text-4xl font-bold mb-4">Weinbar</h1>
          <p className="text-purple-200 text-lg max-w-2xl">
            Spontan vorbeikommen, einen Wein trinken, Wildaufschnitt probieren
            und Geschichten aus dem Revier hören. Die Weinbar ist der gesellige
            Kern der REVIERKÜCHE.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Angebote */}
        <h2 className="text-2xl font-bold mb-6">Was dich erwartet</h2>
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {ANGEBOTE.map((a) => (
            <div key={a.titel} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
              <span className="text-3xl mb-3 block">{a.emoji}</span>
              <h3 className="font-semibold text-stone-800 mb-2">{a.titel}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{a.text}</p>
            </div>
          ))}
        </div>

        {/* Öffnungszeiten */}
        <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} className="text-purple-600" />
            <h2 className="font-semibold text-purple-900">Weinbar-Zeiten</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between gap-4 text-stone-600">
                <span className="text-stone-400">Di – Fr ab</span><span>17:00 Uhr</span>
              </div>
              <div className="flex justify-between gap-4 text-stone-600">
                <span className="text-stone-400">Samstag ab</span><span>14:00 Uhr</span>
              </div>
            </div>
            <p className="text-stone-400 text-xs">
              Walk-in willkommen. Für Events & größere Gruppen empfehlen wir eine Reservierung.
            </p>
          </div>
        </div>

        {/* Events */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CalendarDays size={24} className="text-purple-500" />
          Events & Abende
        </h2>
        <div className="flex flex-col gap-4 mb-10">
          {EVENTS.map((e) => (
            <div key={e.titel} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-stone-800">{e.titel}</h3>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{e.turnus}</span>
                </div>
                <p className="text-stone-500 text-sm">{e.beschreibung}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Kochschule */}
        <div className="bg-stone-800 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-lg">Noch mehr erleben?</p>
            <p className="text-stone-300 text-sm">In der Kochschule wird Wild zum Gericht.</p>
          </div>
          <Link href="/kochschule"
            className="bg-amber-500 hover:bg-amber-400 text-white font-medium px-5 py-2.5 rounded-xl flex items-center gap-2 transition whitespace-nowrap">
            Zur Kochschule <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
