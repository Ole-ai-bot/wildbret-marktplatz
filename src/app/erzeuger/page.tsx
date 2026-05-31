import { Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";

const ERZEUGER = [
  {
    emoji: "🐐",
    name: "Nußlocher Ziegenkäsehof",
    region: "Nußloch, Rhein-Neckar-Kreis",
    beschreibung: "Seit 1985 produzieren Stefanie Schott und Joachim Kamann handwerklichen Ziegenkäse — ausgezeichnet mit einem Stern auf dem \"Platz des guten Geschmacks\". Slow Food Partner, nur bei wenigen ausgesuchten Händlern in der Region erhältlich.",
    produkte: ["Ziegenbrie", "Ziegencamembert", "Frischkäse", "Ziegenquark"],
    tags: ["Slow Food", "Ausgezeichnet"],
  },
  {
    emoji: "🐟",
    name: "Forellenhof Lenz",
    region: "Oberzent-Hebstahl, Odenwald",
    beschreibung: "Dritte Generation Forellenzucht im klaren Quellwasser von Naturbächen. Tradition trifft Moderne — hochwertige Verarbeitung direkt nach dem Fang, heiß- und kaltgeräucherte Spezialitäten.",
    produkte: ["Regenbogenforellen", "Bachforellen", "Lachsforellen", "Geräuchertes"],
    tags: ["3. Generation", "Quellwasser"],
  },
  {
    emoji: "🍄",
    name: "Odenwälder Trüffel",
    region: "Neckar-Odenwald-Kreis",
    beschreibung: "Sybille und Kalli sammeln mit ihren speziell ausgebildeten Hunden Trüffel im Odenwald. Eines der wenigen privaten Trüffelsammel-Projekte der Region — ein echtes Alleinstellungsmerkmal.",
    produkte: ["Frische Trüffel (saisonal)", "Trüffelöl"],
    tags: ["Saisonal", "Einzigartig"],
  },
  {
    emoji: "🎣",
    name: "Rheinfischer Kuhn",
    region: "Karlsruhe, Rhein",
    beschreibung: "Lars und Hannes Kuhn sind die letzten hauptberuflichen Berufsfischer auf dem Rhein in Baden-Württemberg. Absolutes Alleinstellungsmerkmal — wilder Süßwasserfisch aus dem Rhein, kein Aquakultur-Produkt. Beliefern Sternerestaurants von Stuttgart bis in den Schwarzwald.",
    produkte: ["Zander", "Hecht", "Wels", "Barsch"],
    tags: ["Saisonal Okt–März", "Wild & Echt"],
  },
  {
    emoji: "🍞",
    name: "Südseite Bakery",
    region: "Heidelberg-Wieblingen",
    beschreibung: "Nur drei Zutaten: Mehl, Wasser, Salz. Kein Backmittel, keine künstliche Hefe — nur Sauerteig in Langzeitführung. 100% Bioland-Qualität. Täglich frisch.",
    produkte: ["Sauerteigbrot", "Baguette", "Focaccia", "Croissants"],
    tags: ["Bioland", "Täglich frisch"],
  },
  {
    emoji: "☕",
    name: "Privatrösterei Bonafede",
    region: "Hockenheim",
    beschreibung: "Seit 2006 röstet Rosario Bonafede nach dem Slow Roasting-Verfahren (max. 210°C). Seit 2020 Bio und Demeter-zertifiziert. Röster des Jahres 2016.",
    produkte: ["Espressobohnen", "Filterkaffee", "Bohnenmischungen"],
    tags: ["Demeter", "Röster des Jahres 2016"],
  },
  {
    emoji: "🍶",
    name: "THEO Essigmanufaktur",
    region: "Willstätt/Schwarzwald",
    beschreibung: "Fünfte Generation Essigbrauer-Familie. Seit 1868 naturbelassene Essige im Holzfass-Verfahren. Slow Food Partner, Bio/Bioland/Vegan-zertifiziert. Einzige familiengeführte Essig-Kellerei Deutschlands nach altem Reinheitsgebot.",
    produkte: ["Weinessig", "Balsamico", "Obstessig", "Fruchtbalsamico"],
    tags: ["5. Generation", "Seit 1868", "Slow Food"],
  },
  {
    emoji: "🫒",
    name: "Wasgau Ölmühle",
    region: "Hauenstein, Pfälzerwald",
    beschreibung: "Bio-Speiseölmühle in der Gläsernen Manufaktur im Luftkurort Hauenstein. Kaltgepresste, ungefilterte Bio-Speiseöle aus regionalen Rohstoffen. Slow Food Unterstützer, Bioland-zertifiziert.",
    produkte: ["Walnussöl", "Kürbiskernöl", "Leinöl", "Hanföl"],
    tags: ["Bioland", "Slow Food", "Kaltgepresst"],
  },
  {
    emoji: "🍸",
    name: "Inge & der Honigbär",
    region: "Mosbach, Neckar-Odenwald-Kreis",
    beschreibung: "Handgemachte London Dry Gins in kleinen Batches à 120 Flaschen mit außergewöhnlichen Botanicals aus aller Welt und eigenem Kräutergarten. Gegründet 2020.",
    produkte: ["London Dry Gins", "Sondereditions"],
    tags: ["Handgemacht", "Kleine Batches"],
  },
  {
    emoji: "🍎",
    name: "Obstbau Pfisterer",
    region: "Heidelberg-Kirchheim",
    beschreibung: "Familiengeführter Obstbaubetrieb mit eigenem Hofladen, Brennerei und Mosterei. Direktvermarkter seit Jahrzehnten in Heidelberg.",
    produkte: ["Saisonobst & -gemüse", "Obstbrände", "Fruchtsäfte"],
    tags: ["Direkt vom Hof", "Eigene Brennerei"],
  },
];

export default function ErzeugerPage() {
  return (
    <div>
      <div className="bg-forest-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-forest-600 text-forest-100 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Region Heidelberg · Odenwald · Pfalz
          </span>
          <h1 className="text-4xl font-bold mb-4">Unsere Erzeuger</h1>
          <p className="text-forest-200 text-lg max-w-2xl">
            Alle Partner sind persönlich bekannt und handverlesen — keine Handelsware,
            keine anonymen Lieferketten. Jedes Produkt hat ein Gesicht und eine Geschichte.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 gap-5">
          {ERZEUGER.map((e) => (
            <div key={e.name} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{e.emoji}</span>
                <div>
                  <h2 className="font-bold text-stone-900">{e.name}</h2>
                  <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                    <Leaf size={11} /> {e.region}
                  </p>
                </div>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">{e.beschreibung}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {e.produkte.map((p) => (
                  <span key={p} className="bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full">{p}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {e.tags.map((t) => (
                  <span key={t} className="bg-forest-100 text-forest-700 text-xs px-2 py-1 rounded-full font-medium">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-earth-50 rounded-2xl p-8 text-center border border-earth-100">
          <h2 className="text-xl font-bold mb-3">Alle Produkte im Onlineshop</h2>
          <p className="text-stone-500 text-sm mb-5 max-w-md mx-auto">
            Viele unserer Erzeugerprodukte sind online bestellbar — als Einzelprodukt, Geschenkbox oder als monatliche Wildbox.
          </p>
          <Link href="/marktplatz"
            className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-600 text-white font-medium px-6 py-2.5 rounded-xl transition">
            Zum Onlineshop <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
