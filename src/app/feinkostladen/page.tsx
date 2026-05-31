import { MapPin, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SORTIMENT = [
  {
    kategorie: "Wild & Manufaktur",
    items: ["Wildwurst & Aufschnitt an der Theke", "Frischware vakuumiert", "Maultaschen & Schupfnudeln aus Wildbret", "Konserven & Gläser", "Fertiggerichte aus der Manufaktur"],
  },
  {
    kategorie: "Regionale Erzeuger",
    items: ["Odenwälder Trüffel (saisonal)", "Ziegenkäse aus Nußloch", "Forellen & Räucherfisch aus dem Odenwald", "Fisch vom Rheinfischer (Oktober – März)", "Sauerteigbrot täglich frisch"],
  },
  {
    kategorie: "Feinkost & Spezialitäten",
    items: ["Handgemachte Gins in kleinen Batches", "Kaltgepresste Bio-Öle aus der Pfalz", "Naturbelassene Essige & Balsamicos", "Frisch gerösteter Specialty Coffee", "Saisonales Gemüse direkt vom Feld"],
  },
  {
    kategorie: "Champagner",
    items: ["Champagne LUTUN — Brut", "Champagne LUTUN — Rosé", "Champagne LUTUN — Cuvée Prestige", "Champagne LUTUN — Fleur de Bois", "Champagne LUTUN — Millésime"],
  },
  {
    kategorie: "Wein & Getränke",
    items: ["Kuratierte Weine zur Wildküche", "Obstbrände aus der Region", "Frisch gepresste Säfte", "Kaffeespezialitäten"],
  },
  {
    kategorie: "Geschenke & Boxen",
    items: ["Wildbox des Monats (Abo)", "Feinkost-Geschenkboxen", "Gutscheine für Kochkurse", "Kuratierte Saisonboxen"],
  },
];

export default function FeinkostladenPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] bg-stone-950">
        <Image
          src="/images/raum-1.jpg"
          alt="Feinkostladen Revierküche"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-16">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">Heidelberg-Rohrbach</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">Feinkostladen</h1>
          <div className="w-10 h-px bg-earth-500 mb-6" />
          <p className="text-stone-300 text-lg max-w-xl leading-relaxed">
            Wild, Trüffel, Ziegenkäse, Forellen und Sauerteigbrot — alle Erzeuger sind
            persönlich bekannt und handverlesen.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Info-Grid */}
        <div className="grid md:grid-cols-3 gap-px bg-stone-200 mb-16">
          <div className="bg-white p-8">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} className="text-earth-600" />
              <p className="text-xs tracking-widest uppercase text-stone-400">Adresse</p>
            </div>
            <p className="font-medium text-stone-900">Rathausstraße 75</p>
            <p className="text-stone-500 text-sm mt-1">69126 Heidelberg-Rohrbach</p>
          </div>
          <div className="bg-white p-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-earth-600" />
              <p className="text-xs tracking-widest uppercase text-stone-400">Öffnungszeiten</p>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-stone-400">Mo – Fr</span><span>9 – 18 Uhr</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Samstag</span><span>9 – 14 Uhr</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Sonntag</span><span className="text-stone-300">Geschlossen</span></div>
            </div>
          </div>
          <div className="bg-white p-8">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">Konzept</p>
            <p className="text-stone-600 text-sm leading-relaxed">Vitrinen, Kühltheke und Regal — alles regional, alles handwerklich, alles mit Geschichte.</p>
          </div>
        </div>

        {/* Highlight Fotos — Ziegenkäse & Trüffel */}
        <div className="grid md:grid-cols-2 gap-px bg-stone-100 mb-16">
          <div className="relative h-72 bg-stone-900 overflow-hidden">
            <Image src="/images/ziegenkäse.jpg" alt="Nußlocher Ziegenkäse" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stone-950/80 to-transparent">
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">Nußlocher Ziegenkäsehof</p>
              <p className="text-white font-playfair text-xl font-bold">Ziegenkäse</p>
            </div>
          </div>
          <div className="relative h-72 bg-stone-900 overflow-hidden">
            <Image src="/images/trüffel.jpg" alt="Odenwälder Trüffel" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stone-950/80 to-transparent">
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">Neckar-Odenwald-Kreis</p>
              <p className="text-white font-playfair text-xl font-bold">Odenwälder Trüffel</p>
            </div>
          </div>
        </div>

        {/* Sortiment */}
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">Sortiment</p>
          <h2 className="font-playfair text-3xl font-bold mb-10">Was dich erwartet</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-100">
            {SORTIMENT.map((s) => (
              <div key={s.kategorie} className="bg-white p-8">
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">{s.kategorie}</p>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="text-sm text-stone-600 flex items-start gap-2">
                      <span className="w-px h-4 bg-earth-300 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Champagner */}
        <div className="grid md:grid-cols-2 gap-px bg-stone-100 mb-16">
          <div className="bg-stone-950 text-white p-10">
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-4">Exklusiv</p>
            <h2 className="font-playfair text-3xl font-bold mb-4">Champagne LUTUN</h2>
            <div className="w-8 h-px bg-stone-600 mb-6" />
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Fünf handverlesene Cuvées aus Courtagnon, Champagne — exklusiv
              erhältlich im Feinkostladen der Revierküche.
            </p>
            <a href="https://champagneimports.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-stone-600 hover:border-white text-stone-300 hover:text-white text-xs tracking-widest uppercase px-6 py-3 transition">
              Mehr erfahren <ArrowRight size={14} />
            </a>
          </div>
          <div className="relative h-64 md:h-auto bg-stone-900 overflow-hidden">
            <Image src="/images/champagner-glas.jpg" alt="Champagne LUTUN" fill className="object-cover" />
          </div>
        </div>

        {/* Erzeuger Banner */}
        <div className="bg-stone-950 text-white p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-2">Handverlesen</p>
            <h2 className="font-playfair text-2xl font-bold mb-2">10 regionale Erzeuger</h2>
            <p className="text-stone-400 text-sm">Alle persönlich bekannt — von Odenwälder Trüffeln bis zum Rheinfischer.</p>
          </div>
          <Link href="/erzeuger"
            className="flex-shrink-0 inline-flex items-center gap-2 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white text-xs tracking-widest uppercase px-6 py-3 transition">
            Erzeuger kennenlernen <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
