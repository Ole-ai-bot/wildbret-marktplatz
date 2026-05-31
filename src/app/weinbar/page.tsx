import { Clock, ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

const ANGEBOTE = [
  { titel: "Wildaufschnitt & Vesper", text: "Hausgemachter Wildaufschnitt, Ziegenkäse aus Nußloch und frisches Sauerteigbrot — der perfekte Einstieg in den Abend." },
  { titel: "Kuratierte Weinauswahl", text: "Weine, die zu Wild passen. Persönlich ausgewählt, mit Geschichte — kein Supermarktregal, sondern echte Empfehlungen." },
  { titel: "Handgemachter Gin", text: "\"Inge und der Honigbär\" aus Mosbach — London Dry Gins in kleinen Batches à 120 Flaschen, mit außergewöhnlichen Botanicals." },
  { titel: "Specialty Coffee", text: "Frisch geröstet von der Privatrösterei Bonafede aus Hockenheim — Slow Roasting, Demeter-zertifiziert, Röster des Jahres 2016." },
];

const EVENTS = [
  { titel: "Revierabend", beschreibung: "Jäger, Foodies und Neugierige kommen zusammen. Wild, Wein, Geschichten aus dem Revier.", turnus: "Monatlich" },
  { titel: "Erzeuger-Abend", beschreibung: "Ein Erzeuger stellt sich vor — Trüffelabend, Forellen-Verkostung, Ziegenkäse-Tasting.", turnus: "Saisonal" },
  { titel: "Nose to Tail Abend", beschreibung: "Das ganze Tier auf dem Tisch — von der Keule bis zur Wurst, begleitet von passenden Weinen.", turnus: "Quartalsweise" },
];

export default function WeinbarPage() {
  return (
    <div>
      <div className="bg-stone-950 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-6">Walk-in · Verkostung · Revierabende</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">Weinbar</h1>
          <div className="w-10 h-px bg-stone-600 mb-8" />
          <p className="text-stone-400 text-lg max-w-2xl leading-relaxed">
            Spontan vorbeikommen, einen Wein trinken, Wildaufschnitt probieren und
            Geschichten aus dem Revier hören. Die Weinbar ist der gesellige Kern der Revierküche.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Angebote */}
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">Angebot</p>
          <h2 className="font-playfair text-3xl font-bold mb-10">Was dich erwartet</h2>
          <div className="grid md:grid-cols-2 gap-px bg-stone-100">
            {ANGEBOTE.map((a) => (
              <div key={a.titel} className="bg-white p-8">
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">{a.titel}</p>
                <p className="text-stone-600 text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Öffnungszeiten */}
        <div className="grid md:grid-cols-2 gap-px bg-stone-100 mb-16">
          <div className="bg-white p-8">
            <div className="flex items-center gap-2 mb-5">
              <Clock size={16} className="text-stone-400" />
              <p className="text-xs tracking-widest uppercase text-stone-400">Weinbar-Zeiten</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-stone-400">Di – Fr</span><span>ab 17:00 Uhr</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Samstag</span><span>ab 14:00 Uhr</span></div>
            </div>
            <p className="text-stone-400 text-xs mt-4">Walk-in willkommen. Für Events & größere Gruppen empfehlen wir eine Reservierung.</p>
          </div>
          <div className="bg-stone-50 p-8 flex flex-col justify-between">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Reservierung</p>
            <p className="text-stone-600 text-sm leading-relaxed mb-6">Für Revierabende, Gruppen oder besondere Anlässe — wir freuen uns auf deine Nachricht.</p>
            <a href="mailto:info@revierkueche.de"
              className="inline-flex items-center gap-2 border border-stone-300 hover:border-stone-600 text-stone-600 hover:text-stone-900 text-xs tracking-widest uppercase px-5 py-2.5 transition w-fit">
              Reservieren <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Events */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays size={16} className="text-stone-400" />
            <p className="text-xs tracking-widest uppercase text-stone-400">Programm</p>
          </div>
          <h2 className="font-playfair text-3xl font-bold mb-10">Events & Abende</h2>
          <div className="flex flex-col divide-y divide-stone-100">
            {EVENTS.map((e) => (
              <div key={e.titel} className="py-7 flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                <div className="md:w-48 flex-shrink-0">
                  <p className="font-playfair text-lg font-bold text-stone-900">{e.titel}</p>
                  <p className="text-xs tracking-widest uppercase text-stone-400 mt-1">{e.turnus}</p>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed flex-1">{e.beschreibung}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-stone-950 text-white p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-2">Noch mehr erleben</p>
            <h2 className="font-playfair text-2xl font-bold">In der Kochschule wird Wild zum Gericht.</h2>
          </div>
          <Link href="/kochschule"
            className="flex-shrink-0 inline-flex items-center gap-2 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white text-xs tracking-widest uppercase px-6 py-3 transition">
            Zur Kochschule <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
