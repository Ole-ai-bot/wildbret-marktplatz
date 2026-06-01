import { MapPin } from "lucide-react";
import Image from "next/image";

const ERZEUGER = [
  {
    name: "Nußlocher Ziegenkäsehof",
    region: "Nußloch, Rhein-Neckar-Kreis",
    beschreibung: "Seit 1985 handwerklicher Ziegenkäse — ausgezeichnet mit dem \"Platz des guten Geschmacks\" und Slow Food Partner. Nur bei wenigen ausgesuchten Händlern in der Region erhältlich.",
    produkte: ["Ziegenbrie", "Ziegencamembert", "Frischkäse", "Ziegenquark"],
    tags: ["Slow Food", "Ausgezeichnet seit 1985"],
    bild: "/images/erzeuger/ziegenkäsehof-award.jpg",
    bildAlt: "Nußlocher Ziegenkäsehof — Auszeichnung Platz des guten Geschmacks",
  },
  {
    name: "Forellenhof Lenz",
    region: "Oberzent-Hebstahl, Odenwald",
    beschreibung: "Dritte Generation Forellenzucht im klaren Quellwasser von Naturbächen. Tradition trifft Moderne — hochwertige Verarbeitung direkt nach dem Fang.",
    produkte: ["Regenbogenforellen", "Bachforellen", "Kaltgeräuchertes", "Graved Art"],
    tags: ["3. Generation", "Natürliches Quellwasser"],
    bild: "/images/erzeuger/forellenhof-forelle.jpg",
    bildAlt: "Forellenhof Lenz — frische Forelle aus dem Quellwasser",
  },
  {
    name: "Odenwälder Trüffel",
    region: "Neckar-Odenwald-Kreis",
    beschreibung: "Sybille und Kalli sammeln mit speziell ausgebildeten Hunden Trüffel im Odenwald — eines der wenigen privaten Trüffelsammel-Projekte der Region. Echtes Alleinstellungsmerkmal.",
    produkte: ["Frische Trüffel (saisonal)", "Trüffelöl"],
    tags: ["Saisonal Herbst/Winter", "Einzigartig regional"],
    bild: "/images/trüffel.jpg",
    bildAlt: "Odenwälder Trüffel — frisch gesammelt",
  },
  {
    name: "Rheinfischer Kuhn",
    region: "Karlsruhe, Rhein",
    beschreibung: "Die letzten hauptberuflichen Berufsfischer auf dem Rhein in Baden-Württemberg. Wilder Süßwasserfisch aus dem Rhein — kein Aquakultur-Produkt. Beliefern Sternerestaurants von Stuttgart bis in den Schwarzwald.",
    produkte: ["Zander", "Hecht", "Wels", "Barsch"],
    tags: ["Saisonal Okt – März", "Wild & Einmalig"],
  },
  {
    name: "Südseite Bakery",
    region: "Heidelberg-Wieblingen",
    beschreibung: "Nur drei Zutaten: Mehl, Wasser, Salz. Kein Backmittel, keine künstliche Hefe — ausschließlich Sauerteig in Langzeitführung. 100% Bioland-Qualität. Täglich frisch.",
    produkte: ["Sauerteigbrot", "Baguette", "Focaccia", "Croissants"],
    tags: ["Bioland", "Täglich frisch"],
  },
  {
    name: "Privatrösterei Bonafede",
    region: "Hockenheim",
    beschreibung: "Seit 2006 nach dem Slow Roasting-Verfahren (max. 210°C). Bio und Demeter-zertifiziert seit 2020. Röster des Jahres 2016. Bis zu 18 frisch geröstete Bohnenmischungen.",
    produkte: ["Espressobohnen", "Filterkaffee", "Bohnenmischungen"],
    tags: ["Demeter", "Röster des Jahres 2016"],
  },
  {
    name: "THEO Essigmanufaktur",
    region: "Willstätt, Schwarzwald",
    beschreibung: "Fünfte Generation Essigbrauer seit 1868. Naturbelassene Essige im Holzfass-Verfahren ohne Farbstoffe oder Zusätze. Slow Food Partner, Bio/Bioland/Vegan-zertifiziert.",
    produkte: ["Weinessig", "Balsamico", "Obstessig", "Fruchtbalsamico"],
    tags: ["5. Generation", "Seit 1868", "Slow Food"],
    bild: "/images/erzeuger/theo-portrait.jpg",
    bildAlt: "Theo F. Berl — Essigbrauer in 5. Generation",
  },
  {
    name: "Wasgau Ölmühle",
    region: "Hauenstein, Pfälzerwald",
    beschreibung: "Bio-Speiseölmühle in der Gläsernen Manufaktur. Kaltgepresste, ungefilterte Bio-Öle aus regionalen Rohstoffen — Walnüsse aus der Pfalz, Raps, Kürbiskerne. Bioland-zertifiziert.",
    produkte: ["Walnussöl", "Kürbiskernöl", "Leinöl", "Hanföl"],
    tags: ["Bioland", "Slow Food", "Kaltgepresst"],
  },
  {
    name: "Inge & der Honigbär",
    region: "Mosbach, Neckar-Odenwald-Kreis",
    beschreibung: "Handgemachte London Dry Gins in kleinen Batches à 120 Flaschen mit außergewöhnlichen Botanicals aus eigenem Kräutergarten. Gegründet 2020 von Eric Kletti.",
    produkte: ["London Dry Gin", "Sondereditions"],
    tags: ["Handgemacht", "120 Flaschen pro Batch"],
  },
  {
    name: "Obstbau Pfisterer",
    region: "Heidelberg-Kirchheim",
    beschreibung: "Familiengeführter Obstbaubetrieb mit eigenem Hofladen, Brennerei und Mosterei. Direktvermarkter seit Jahrzehnten in Heidelberg. Eigene Obstbrände und frisch gepresste Säfte.",
    produkte: ["Saisonobst", "Obstbrände", "Fruchtsäfte", "Eingemachtes"],
    tags: ["Direkt vom Hof", "Eigene Brennerei"],
  },
];

export default function ErzeugerPage() {
  return (
    <div>
      <div className="relative h-[55vh] min-h-[380px] bg-stone-950">
        <Image
          src="/images/erzeuger/forellenhof-quellbach.jpg"
          alt="Quellbach im Odenwald — Forellenhof Lenz"
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-16">
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-6">
            Region Heidelberg · Odenwald · Pfalz · Schwarzwald
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">Unsere Erzeuger</h1>
          <div className="w-10 h-px bg-forest-500 mb-6" />
          <p className="text-stone-300 text-lg max-w-2xl leading-relaxed">
            Alle Partner sind persönlich bekannt und handverlesen. Kein Handel,
            keine anonymen Lieferketten. Jedes Produkt hat ein Gesicht und eine Geschichte.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col divide-y divide-stone-100">
          {ERZEUGER.map((e: any, i: number) => (
            <div key={e.name} className={`py-10 ${e.bild ? "grid md:grid-cols-3 gap-0" : "grid md:grid-cols-3 gap-8"}`}>
              {e.bild ? (
                <>
                  <div className="relative h-48 md:h-auto overflow-hidden bg-stone-100">
                    <Image src={e.bild} alt={e.bildAlt} fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-stone-950/70 to-transparent">
                      <p className="text-white text-xs tracking-widest uppercase">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-2 p-6 md:p-8">
                    <h2 className="font-playfair text-xl font-bold text-stone-900 mb-1">{e.name}</h2>
                    <p className="text-xs text-stone-400 flex items-center gap-1 mb-4">
                      <MapPin size={11} /> {e.region}
                    </p>
                    <p className="text-stone-600 text-sm leading-relaxed mb-5">{e.beschreibung}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {e.produkte.map((p: string) => (
                        <span key={p} className="bg-stone-100 text-stone-600 text-xs px-3 py-1">{p}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {e.tags.map((t: string) => (
                        <span key={t} className="border border-forest-200 text-forest-700 text-xs px-3 py-1">{t}</span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
              <div>
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-playfair text-xl font-bold text-stone-900 mb-2">{e.name}</h2>
                <p className="text-xs text-stone-400 flex items-center gap-1">
                  <MapPin size={11} /> {e.region}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-stone-600 text-sm leading-relaxed mb-5">{e.beschreibung}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {e.produkte.map((p: string) => (
                    <span key={p} className="bg-stone-100 text-stone-600 text-xs px-3 py-1">{p}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {e.tags.map((t: string) => (
                    <span key={t} className="border border-forest-200 text-forest-700 text-xs px-3 py-1">{t}</span>
                  ))}
                </div>
              </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
