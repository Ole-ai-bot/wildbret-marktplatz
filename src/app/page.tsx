import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const BEREICHE = [
  {
    href: "/marktplatz",
    label: "Onlineshop",
    sub: "Bundesweiter Versand",
    description: "Handwerklich veredeltes Wildbret und Feinkost — direkt nach Hause. Wildbox des Monats, Geschenkboxen, Saisonprodukte.",
    bg: "bg-forest-950",
    border: "border-forest-800",
    accent: "text-forest-400",
  },
  {
    href: "/feinkostladen",
    label: "Feinkostladen",
    sub: "Heidelberg-Rohrbach",
    description: "Wild, Trüffel, Ziegenkäse, Forellen, Sauerteigbrot — von handverlesenen Erzeugern aus der Region Heidelberg und Odenwald.",
    bg: "bg-earth-950",
    border: "border-earth-800",
    accent: "text-earth-400",
  },
  {
    href: "/weinbar",
    label: "Weinbar",
    sub: "Walk-in · Verkostung",
    description: "Wildaufschnitt, Ziegenkäse und kuratierte Weine. Revierabende, Erzeuger-Tastings und ein Gin aus dem Neckar-Odenwald-Kreis.",
    bg: "bg-stone-950",
    border: "border-stone-700",
    accent: "text-stone-400",
  },
  {
    href: "/kochschule",
    label: "Kochschule",
    sub: "Kurse & Events",
    description: "Von der Zerlegung bis zum fertigen Gericht. Nose-to-Tail, Wild trifft Trüffel, Rhein & Revier — im Manufaktur-Ambiente.",
    bg: "bg-stone-900",
    border: "border-stone-700",
    accent: "text-amber-500",
  },
];

const PRODUKTE = [
  {
    bild: "/images/hirsch.jpg",
    label: "Hirsch",
    beschreibung: "Hirschfilet auf Rahmwirsing, getrüffeltem Kaiserschmarrn und Wildjus",
    href: "/marktplatz",
  },
  {
    bild: "/images/wildschwein.jpg",
    label: "Wildschwein",
    beschreibung: "Zweierlei vom Wildschwein mit Topfenknödeln und Rosenkohl an Trüffeljus",
    href: "/marktplatz",
  },
  {
    bild: "/images/forelle.jpg",
    label: "Forelle",
    beschreibung: "Forelle vom Forellenhof Lenz — aus natürlichem Quellwasser des Odenwalds",
    href: "/feinkostladen",
  },
  {
    bild: "/images/trüffel.jpg",
    label: "Odenwälder Trüffel",
    beschreibung: "Handgepflückte Trüffel aus dem Neckar-Odenwald-Kreis — saisonal",
    href: "/erzeuger",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="bg-stone-950 text-white">
        <div className="max-w-5xl mx-auto px-6 py-28 md:py-40">
          <p className="text-stone-500 text-xs tracking-widest uppercase mb-8">
            Vom Revier auf den Tisch — Heidelberg
          </p>
          <h1 className="font-playfair text-6xl md:text-8xl font-bold leading-none mb-6 text-white">
            Revier&shy;küche
          </h1>
          <p className="text-stone-400 text-lg md:text-xl max-w-lg mb-4 leading-relaxed">
            Wildmanufaktur · Feinkostladen · Weinbar · Kochschule
          </p>
          <div className="w-12 h-px bg-forest-500 mb-8" />
          <p className="text-stone-500 text-base max-w-md leading-relaxed mb-12">
            Handwerklich veredeltes Wildbret und erlesene regionale Produkte —
            transparent, nachhaltig und direkt von der Quelle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/marktplatz"
              className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-600 text-white text-sm font-medium px-6 py-3 transition">
              Zum Onlineshop <ArrowRight size={16} />
            </Link>
            <Link href="/feinkostladen"
              className="inline-flex items-center gap-2 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white text-sm font-medium px-6 py-3 transition">
              Uns besuchen
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Bereiche */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-stone-800">
        {BEREICHE.map((b, i) => (
          <Link key={b.href} href={b.href}
            className={`${b.bg} text-white p-8 md:p-10 flex flex-col gap-8 group min-h-[300px] border-b md:border-b-0 md:border-r ${b.border} last:border-r-0 hover:brightness-110 transition-all`}>
            <div>
              <p className={`text-xs tracking-widest uppercase mb-3 ${b.accent}`}>{b.sub}</p>
              <h2 className="font-playfair text-2xl font-bold text-white leading-snug">{b.label}</h2>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed flex-1">{b.description}</p>
            <span className={`flex items-center gap-2 text-xs tracking-widest uppercase ${b.accent} group-hover:gap-3 transition-all`}>
              Entdecken <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </section>

      {/* Produkte mit echten Fotos */}
      <section className="bg-white border-b border-stone-100">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Aus der Manufaktur</p>
              <h2 className="font-playfair text-4xl font-bold">Unsere Produkte</h2>
            </div>
            <Link href="/marktplatz"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-stone-400 hover:text-stone-800 transition">
              Alle Produkte <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-100">
            {PRODUKTE.map((p) => (
              <Link key={p.label} href={p.href} className="group bg-white overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={p.bild}
                    alt={p.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">{p.label}</p>
                  <p className="text-stone-600 text-sm leading-snug">{p.beschreibung}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophie */}
      <section className="bg-white border-b border-stone-100">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">Unsere Haltung</p>
              <h2 className="font-playfair text-4xl font-bold leading-tight mb-6">
                Regional.<br />Handwerklich.<br />Transparent.
              </h2>
              <div className="w-8 h-px bg-forest-500 mb-6" />
              <p className="text-stone-500 leading-relaxed mb-4">
                REVIERKÜCHE versteht sich als kuratorischer Feinkost-Knotenpunkt der
                Region Heidelberg und Odenwald. Jedes Produkt steht für eine klare
                Haltung: persönlich bekannt, handwerklich erzeugt, keine anonymen Lieferketten.
              </p>
              <p className="text-stone-500 leading-relaxed">
                Wild von lokalen Jägern aus dem 100-km-Umkreis — waidgerecht erlegt,
                kürzeste Transportwege, maximale Frische.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-stone-100">
              {[
                { zahl: "100 km", label: "Einzugsgebiet Wildnetz" },
                { zahl: "10+", label: "Regionale Erzeuger" },
                { zahl: "0", label: "Anonyme Lieferketten" },
                { zahl: "100%", label: "Nose to Tail" },
              ].map((s) => (
                <div key={s.label} className="bg-white p-8">
                  <p className="font-playfair text-3xl font-bold text-forest-800 mb-1">{s.zahl}</p>
                  <p className="text-stone-400 text-xs tracking-wide uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wild Boar Burger Feature */}
      <section className="bg-stone-950 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2">
          <div className="relative h-80 md:h-auto">
            <Image
              src="/images/wildboar-burger.jpg"
              alt="Pulled Wild Boar Burger"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-10 md:p-16 flex flex-col justify-center">
            <p className="text-xs tracking-widest uppercase text-forest-400 mb-4">Aus der Kochschule</p>
            <h2 className="font-playfair text-3xl font-bold mb-4">
              Wild neu denken
            </h2>
            <div className="w-8 h-px bg-forest-600 mb-6" />
            <p className="text-stone-400 text-sm leading-relaxed mb-8">
              Pulled Wild Boar Burger, Hirschfilet auf Trüffelkaiserschmarrn,
              Rheinzander mit Belugalinsen — in unserer Kochschule zeigen wir,
              wie vielseitig Wildbret sein kann.
            </p>
            <Link href="/kochschule"
              className="inline-flex items-center gap-2 border border-forest-700 hover:border-forest-400 text-forest-400 hover:text-white text-xs tracking-widest uppercase px-6 py-3 transition w-fit">
              Kochkurse entdecken <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Erzeuger */}
      <section className="bg-stone-950 text-white py-20 px-6 border-t border-stone-900">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-500 mb-4">Handverlesen</p>
              <h2 className="font-playfair text-4xl font-bold">Unsere Erzeuger</h2>
            </div>
            <Link href="/erzeuger"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-stone-400 hover:text-white transition">
              Alle kennenlernen <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-800">
            {[
              { name: "Nußlocher Ziegenkäsehof", ort: "Nußloch" },
              { name: "Forellenhof Lenz", ort: "Odenwald" },
              { name: "Odenwälder Trüffel", ort: "Adelsheim" },
              { name: "Rheinfischer Kuhn", ort: "Karlsruhe" },
              { name: "Südseite Bakery", ort: "Heidelberg" },
              { name: "Privatrösterei Bonafede", ort: "Hockenheim" },
              { name: "THEO Essigmanufaktur", ort: "Schwarzwald" },
              { name: "Inge & der Honigbär", ort: "Mosbach" },
            ].map((e) => (
              <Link key={e.name} href="/erzeuger"
                className="bg-stone-900 hover:bg-stone-800 transition p-6 group">
                <p className="text-white text-sm font-medium leading-snug mb-1 group-hover:text-forest-300 transition">{e.name}</p>
                <p className="text-stone-500 text-xs">{e.ort}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
