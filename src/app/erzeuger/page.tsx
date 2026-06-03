import { MapPin } from "lucide-react";
import Image from "next/image";

interface Erzeuger {
  name: string;
  region: string;
  beschreibung: string;
  produkte: string[];
  tags: string[];
  bild?: string;
  bildAlt?: string;
}

const ERZEUGER: Erzeuger[] = [
  {
    name: "Nußlocher Ziegenkäsehof",
    region: "Nußloch, Rhein-Neckar-Kreis",
    beschreibung: "Seit 1985 handwerklicher Ziegenkäse aus der Milch von rund 100 Bunten Deutschen Edelziegen — ausgezeichnet mit dem \"Platz des guten Geschmacks\" und Slow Food Partner. Nur bei wenigen ausgesuchten Händlern der Region erhältlich.",
    produkte: ["Ziegenbrie", "Ziegencamembert", "Frischkäse", "Ziegenquark", "Ziegenjoghurt"],
    tags: ["Slow Food", "Ausgezeichnet seit 1985"],
    bild: "/images/erzeuger/ziegenkäse-produkt.jpg",
    bildAlt: "Ziegenkäse vom Nußlocher Ziegenkäsehof",
  },
  {
    name: "Forellenhof Lenz",
    region: "Oberzent-Hebstahl, Odenwald",
    beschreibung: "Familienunternehmen in dritter Generation. Forellenzucht im klaren Quellwasser von Naturbächen — Tradition trifft Moderne. Hochwertige Verarbeitung direkt nach dem Fang, heiß- und kaltgeräucherte Spezialitäten.",
    produkte: ["Regenbogenforellen", "Bachforellen", "Lachsforellen", "Graved Art", "Räucherfisch"],
    tags: ["3. Generation", "Natürliches Quellwasser"],
    bild: "/images/forelle.jpg",
    bildAlt: "Forellengericht vom Forellenhof Lenz",
  },
  {
    name: "Odenwälder Trüffel",
    region: "Adelsheim, Neckar-Odenwald-Kreis",
    beschreibung: "Mit speziell ausgebildeten Hunden werden Trüffel im Odenwald gesammelt — eines der wenigen privaten Trüffelprojekte der Region. Saisonal angeboten, ein echtes Alleinstellungsmerkmal.",
    produkte: ["Frische Trüffel (saisonal)", "Trüffelöl"],
    tags: ["Saisonal Herbst/Winter", "Einzigartig regional"],
    bild: "/images/trüffel.jpg",
    bildAlt: "Frische Odenwälder Trüffel",
  },
  {
    name: "Rheinfischer — Fischerei Kuhn",
    region: "Karlsruhe, Rhein",
    beschreibung: "Die letzten hauptberuflichen Berufsfischer auf dem Rhein in Baden-Württemberg. Wilder Süßwasserfisch aus dem Rhein zwischen Mannheim und Karlsruhe — kein Aquakultur-Produkt. Beliefern Sternerestaurants von Stuttgart bis in den Schwarzwald.",
    produkte: ["Zander", "Hecht", "Wels", "Barsch"],
    tags: ["Saisonal Okt – März", "Wildfang Rhein"],
  },
  {
    name: "Wasgau Ölmühle",
    region: "Hauenstein, Pfälzerwald",
    beschreibung: "Bio-Speiseölmühle in der Gläsernen Manufaktur im Pfälzerwald. Kaltgepresste, ungefilterte Bio-Öle aus regionalen Rohstoffen — Walnüsse aus der Pfalz, Raps, Kürbiskerne. Slow Food Unterstützer, Bioland-zertifiziert.",
    produkte: ["Walnussöl", "Kürbiskernöl", "Leinöl", "Hanföl", "Rapsöl"],
    tags: ["Bioland", "Slow Food", "Kaltgepresst"],
    bild: "/images/produkte/walnussoel.png",
    bildAlt: "Walnussöl der Wasgau Ölmühle",
  },
  {
    name: "THEO Essigmanufaktur",
    region: "Willstätt, Schwarzwald",
    beschreibung: "Essigbrauer-Familie in fünfter Generation. Seit 1868 naturbelassene Essige und Balsamicos im Holzfass-Verfahren, ohne Farbstoffe oder Zusätze. Einzige familiengeführte Essig-Kellerei Deutschlands nach altem Reinheitsgebot. Slow Food Partner, Bio-zertifiziert.",
    produkte: ["Weinessig", "Balsamico", "Obstessig", "Fruchtbalsamico"],
    tags: ["5. Generation", "Seit 1868", "Slow Food"],
  },
  {
    name: "Privatrösterei Bonafede",
    region: "Hockenheim",
    beschreibung: "Seit 2006 nach dem Slow-Roasting-Verfahren bei maximal 210°C geröstet. Bio und Demeter-zertifiziert, Röster des Jahres 2016. Bis zu 18 frisch geröstete Bohnenmischungen.",
    produkte: ["Espressobohnen", "Filterkaffee", "Bohnenmischungen"],
    tags: ["Demeter", "Röster des Jahres 2016"],
  },
  {
    name: "Südseite Bakery",
    region: "Heidelberg-Wieblingen",
    beschreibung: "Nur drei Zutaten: Mehl, Wasser, Salz. Kein Backmittel, keine künstliche Hefe — ausschließlich Sauerteig in Langzeitführung. 100% Bioland-Qualität. Täglich frisch.",
    produkte: ["Sauerteigbrot", "Baguette", "Focaccia", "Croissants"],
    tags: ["Bioland", "Täglich frisch"],
  },
  {
    name: "Inge & der Honigbär",
    region: "Mosbach, Neckar-Odenwald-Kreis",
    beschreibung: "Handgemachte London Dry Gins in kleinen Batches à 120 Flaschen mit außergewöhnlichen Botanicals aus eigenem Kräutergarten. Gegründet 2020.",
    produkte: ["London Dry Gin", "Sondereditions"],
    tags: ["Handgemacht", "Kleine Batches"],
  },
  {
    name: "Obstbau Pfisterer",
    region: "Heidelberg-Kirchheim",
    beschreibung: "Familiengeführter Obstbaubetrieb mit eigenem Hofladen, Brennerei und Mosterei. Direktvermarkter seit Jahrzehnten in Heidelberg, mit eigenen Obstbränden und frisch gepressten Säften.",
    produkte: ["Saisonobst", "Obstbrände", "Fruchtsäfte", "Eingemachtes"],
    tags: ["Direkt vom Hof", "Eigene Brennerei"],
  },
  {
    name: "Gemüserei Heidelberg",
    region: "Heidelberg",
    beschreibung: "Kleinstrukturierter Marktgarten-Betrieb auf Basis solidarischer Landwirtschaft (SoLaWi). Anbau nach ökologischen No-Dig-Prinzipien, ganz ohne Pestizide, Herbizide oder Insektizide.",
    produkte: ["Salate", "Kohlrabi", "Tomaten", "Paprika", "Kürbis", "Grünkohl"],
    tags: ["SoLaWi", "No-Dig", "Pestizidfrei"],
  },
  {
    name: "Handschuhsheimer Feld",
    region: "Heidelberg-Handschuhsheim",
    beschreibung: "Frisches Gemüse und Obst vom Handschuhsheimer Feld — einer der ältesten und fruchtbarsten Marktgärtnerei-Regionen Heidelbergs. Saisonal direkt vom Feld.",
    produkte: ["Saisonales Gemüse", "Saisonales Obst"],
    tags: ["Regional", "Saisonal"],
  },
  {
    name: "Rhein-Austern — AusterRegion",
    region: "Wattenmeer / Nordsee",
    beschreibung: "Handgeerntete Austern, einzeln und per Hand von lokalen Fischern aus dem Wattenmeer gesammelt. Konsequent nachhaltige Meeresfrüchte als exklusives Feinkost-Highlight.",
    produkte: ["Austern (handgeerntet)"],
    tags: ["Nachhaltig", "Handgeerntet"],
  },
  {
    name: "Butterbrudis",
    region: "Manufaktur",
    beschreibung: "Handgeknetete Butter-Spezialitäten in kleinen Chargen — von klassischer Salzbutter bis zu außergewöhnlichen Kreationen wie Miso-, Karamell- und Algenbutter.",
    produkte: ["Salzbutter", "Misobutter", "Bärlauchbutter", "Karamellbutter", "Algenbutter"],
    tags: ["Handgeknetet", "Kleine Chargen"],
  },
  {
    name: "Olivenöl von Antonella",
    region: "Italien",
    beschreibung: "Extra natives Olivenöl, persönlich ausgewählt und direkt von der Erzeugerin bezogen — fruchtig, pfeffrig und ehrlich. Kein anonymes Handelsöl.",
    produkte: ["Olivenöl extra vergine"],
    tags: ["Direktbezug", "Extra vergine"],
  },
  {
    name: "Ruby Cube — von Till",
    region: "Manufaktur",
    beschreibung: "Ein besonderer rubinroter Essig, handgemacht in kleinen Mengen. Fruchtig-würzig mit Tiefe und Charakter — eine echte Rarität für die Feinkostküche.",
    produkte: ["Ruby Cube Essig"],
    tags: ["Handgemacht", "Rarität"],
  },
  {
    name: "Heimische Jäger",
    region: "100-km-Umkreis um Heidelberg",
    beschreibung: "Ein Netzwerk lokaler Jägerinnen und Jäger aus Odenwald, Kraichgau, Pfalz und Rhein-Neckar-Ebene. Das Wild wird waidgerecht erlegt und direkt geliefert — kürzeste Transportwege, maximale Frische. Der Kernrohstoff der Manufaktur.",
    produkte: ["Reh", "Hirsch", "Wildschwein", "Hase", "Wildgeflügel"],
    tags: ["Waidgerecht", "100 km Umkreis"],
    bild: "/images/hirsch.jpg",
    bildAlt: "Wild aus heimischen Revieren",
  },
];

export default function ErzeugerPage() {
  return (
    <div>
      <div className="relative h-[55vh] min-h-[380px] bg-stone-950">
        <Image
          src="/images/erzeuger/forellenhof-quellbach.jpg"
          alt="Quellbach im Odenwald"
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
            keine anonymen Lieferketten. Jedes Produkt hat eine Geschichte.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-10">
          {ERZEUGER.length} Erzeuger-Partner
        </p>
        <div className="flex flex-col divide-y divide-stone-100">
          {ERZEUGER.map((e, i) => (
            <div key={e.name} className={`py-10 grid md:grid-cols-3 ${e.bild ? "gap-0" : "gap-8"}`}>
              {e.bild ? (
                <>
                  <div className="relative h-48 md:h-auto overflow-hidden bg-stone-100">
                    <Image src={e.bild} alt={e.bildAlt ?? e.name} fill className="object-cover" />
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
                      {e.produkte.map((p) => (
                        <span key={p} className="bg-stone-100 text-stone-600 text-xs px-3 py-1">{p}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {e.tags.map((t) => (
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
                      {e.produkte.map((p) => (
                        <span key={p} className="bg-stone-100 text-stone-600 text-xs px-3 py-1">{p}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {e.tags.map((t) => (
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
