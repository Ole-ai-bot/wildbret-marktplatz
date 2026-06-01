import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const KATEGORIEN = [
  { id: "wildmanufaktur", label: "Wildmanufaktur" },
  { id: "oele", label: "Öle" },
  { id: "essig", label: "Essig & Balsamico" },
  { id: "kaese", label: "Käse" },
];

const PRODUKTE = [
  // Wildmanufaktur
  {
    slug: "wildrillette",
    name: "Wildrillette",
    kategorie: "wildmanufaktur",
    kurz: "Handwerklich veredeltes Wildbret — langsam gegart, fein gezupft, aromatisch abgeschmeckt.",
    preis: 8.90,
    gewicht: "180g",
    bild: "/images/hirsch.jpg",
  },
  {
    slug: "wildjus",
    name: "Wildjus",
    kategorie: "wildmanufaktur",
    kurz: "Intensiver Wildfond aus gerösteten Knochen und Wurzelgemüse — die perfekte Basis für Saucen und Schmorgerichte.",
    preis: 12.50,
    gewicht: "350ml",
    bild: "/images/wildschwein.jpg",
  },

  // Öle — Wasgau Ölmühle
  {
    slug: "walnussoel-pfalz",
    name: "Walnussöl aus der Pfalz",
    kategorie: "oele",
    kurz: "Kaltgepresst aus Pfälzer Walnüssen. Nussig, intensiv, ungefiltert — ideal zu Wild und Wintersalaten.",
    preis: 14.90,
    gewicht: "250ml",
    erzeuger: "Wasgau Ölmühle",
  },
  {
    slug: "kuerbiskernoel",
    name: "Kürbiskernöl",
    kategorie: "oele",
    kurz: "Dunkelgrün, vollmundig, charakterstark. Kaltgepresst aus steirischen Kürbiskernen in der Pfälzer Manufaktur.",
    preis: 12.90,
    gewicht: "250ml",
    erzeuger: "Wasgau Ölmühle",
  },
  {
    slug: "leinoel",
    name: "Leinöl",
    kategorie: "oele",
    kurz: "Frisch gepresst, ungefiltert, naturbelassen. Reich an Omega-3 — am besten pur auf Quark oder Kartoffeln.",
    preis: 9.90,
    gewicht: "250ml",
    erzeuger: "Wasgau Ölmühle",
  },
  {
    slug: "hanfoel",
    name: "Hanföl",
    kategorie: "oele",
    kurz: "Nussig-kräuterig mit perfektem Omega-Verhältnis. Kaltgepresst aus regionalen Hanfsamen.",
    preis: 11.90,
    gewicht: "250ml",
    erzeuger: "Wasgau Ölmühle",
  },

  // Essig — THEO Essigmanufaktur
  {
    slug: "weinessig",
    name: "Weinessig",
    kategorie: "essig",
    kurz: "Naturbelassen im Holzfass gereift. Seit 1868 nach altem Reinheitsgebot — ohne Farbstoffe oder Zusätze.",
    preis: 8.50,
    gewicht: "250ml",
    erzeuger: "THEO Essigmanufaktur",
  },
  {
    slug: "balsamico",
    name: "Balsamico",
    kategorie: "essig",
    kurz: "Dunkler, samtiger Balsamico aus dem Holzfass. Fünfte Generation Essigbrauer — Slow Food Partner.",
    preis: 12.90,
    gewicht: "250ml",
    erzeuger: "THEO Essigmanufaktur",
  },
  {
    slug: "fruchtbalsamico-heidelbeere",
    name: "Fruchtbalsamico Heidelbeere",
    kategorie: "essig",
    kurz: "Schwarzwald-Heidelbeeren treffen auf samtigen Balsamico. Perfekt zu Wildgerichten und reifem Käse.",
    preis: 11.50,
    gewicht: "250ml",
    erzeuger: "THEO Essigmanufaktur",
  },
  {
    slug: "obstessig",
    name: "Obstessig",
    kategorie: "essig",
    kurz: "Aus Schwarzwald-Früchten destilliert, naturbelassen vergoren. Fruchtig, mild, vielseitig einsetzbar.",
    preis: 9.50,
    gewicht: "250ml",
    erzeuger: "THEO Essigmanufaktur",
  },

  // Käse — Nußlocher Ziegenkäsehof
  {
    slug: "ziegenbrie",
    name: "Ziegenbrie",
    kategorie: "kaese",
    kurz: "Cremig-mild mit feiner weißer Rinde. Slow Food Partner, ausgezeichnet mit dem \"Platz des guten Geschmacks\".",
    preis: 6.90,
    gewicht: "ca. 150g",
    erzeuger: "Nußlocher Ziegenkäsehof",
    bild: "/images/ziegenkäse.jpg",
  },
  {
    slug: "ziegencamembert",
    name: "Ziegencamembert",
    kategorie: "kaese",
    kurz: "Vollmundig und würzig mit cremigem Kern. Handgemacht in Nußloch aus der Milch von 100 Bunten Deutschen Edelziegen.",
    preis: 7.50,
    gewicht: "ca. 200g",
    erzeuger: "Nußlocher Ziegenkäsehof",
  },
  {
    slug: "ziegenfrischkaese-kraeuter",
    name: "Ziegenfrischkäse Kräuter",
    kategorie: "kaese",
    kurz: "Frisch, leicht und aromatisch. Mit feinen Kräutern veredelt — perfekt auf Sauerteigbrot oder als Vesper.",
    preis: 5.50,
    gewicht: "ca. 120g",
    erzeuger: "Nußlocher Ziegenkäsehof",
  },
];

export default function ShopPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-stone-950 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-6">Revierküche</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">Onlineshop</h1>
          <div className="w-10 h-px bg-forest-500 mb-6" />
          <p className="text-stone-400 text-lg max-w-xl leading-relaxed">
            Handwerklich veredelte Wildprodukte und erlesene Feinkost von unseren
            regionalen Erzeugern — direkt zu dir nach Hause.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Kategorien als Anker */}
        <div className="flex flex-wrap gap-3 mb-16">
          {KATEGORIEN.map((k) => (
            <a key={k.id} href={`#${k.id}`}
              className="border border-stone-200 hover:border-stone-400 text-stone-600 hover:text-stone-900 text-xs tracking-widest uppercase px-5 py-2.5 transition">
              {k.label}
            </a>
          ))}
          <Link href="/marktplatz"
            className="border border-forest-200 text-forest-600 hover:border-forest-400 hover:text-forest-800 text-xs tracking-widest uppercase px-5 py-2.5 transition">
            Wildbret-Marktplatz
          </Link>
        </div>

        {/* Produkte nach Kategorie */}
        {KATEGORIEN.map((kat) => {
          const items = PRODUKTE.filter((p) => p.kategorie === kat.id);
          return (
            <div key={kat.id} id={kat.id} className="mb-20">
              <div className="flex items-end justify-between mb-8 border-b border-stone-200 pb-4">
                <div>
                  <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                    {items.length} {items.length === 1 ? "Produkt" : "Produkte"}
                  </p>
                  <h2 className="font-playfair text-3xl font-bold">{kat.label}</h2>
                </div>
                {items[0]?.erzeuger && (
                  <p className="text-xs text-stone-400 hidden md:block">{items[0].erzeuger}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-100">
                {items.map((p) => (
                  <div key={p.slug} className="bg-white group">
                    {p.bild && (
                      <div className="relative h-48 overflow-hidden">
                        <Image src={p.bild} alt={p.name} fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-6">
                      {p.erzeuger && (
                        <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">{p.erzeuger}</p>
                      )}
                      <h3 className="font-playfair text-lg font-bold text-stone-900 mb-1">{p.name}</h3>
                      <p className="text-stone-500 text-sm leading-relaxed mb-4">{p.kurz}</p>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="font-playfair text-xl font-bold text-forest-800">
                            {p.preis.toFixed(2).replace(".", ",")} €
                          </p>
                          <p className="text-xs text-stone-400">{p.gewicht}</p>
                        </div>
                        <button className="bg-stone-900 hover:bg-stone-800 text-white text-xs tracking-widest uppercase px-4 py-2.5 transition">
                          In den Warenkorb
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Marktplatz Hinweis */}
        <div className="bg-stone-950 text-white p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-2">Für Jäger</p>
            <h2 className="font-playfair text-2xl font-bold mb-2">Wildbret-Marktplatz</h2>
            <p className="text-stone-400 text-sm max-w-md">
              Du bist Jäger und möchtest dein Wildbret direkt vermarkten?
              Auf unserem Marktplatz inserierst du kostenlos — wir vermitteln den Kontakt.
            </p>
          </div>
          <Link href="/marktplatz"
            className="flex-shrink-0 inline-flex items-center gap-2 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white text-xs tracking-widest uppercase px-6 py-3 transition">
            Zum Marktplatz <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
