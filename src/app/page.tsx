import Link from "next/link";
import { ArrowRight, ShoppingBag, UtensilsCrossed, ChefHat, Wine, Leaf, MapPin, Users } from "lucide-react";

const BEREICHE = [
  {
    href: "/marktplatz",
    icon: <ShoppingBag size={40} className="text-forest-300" />,
    label: "Onlineshop",
    description: "Frisches Wildbret & veredelete Feinkost — bundesweiter Kühlversand. Wildbox des Monats, Geschenkboxen und mehr.",
    bg: "bg-forest-800",
    hover: "hover:bg-forest-700",
    cta: "Zum Shop",
    badge: "Bundesweiter Versand",
  },
  {
    href: "/feinkostladen",
    icon: <UtensilsCrossed size={40} className="text-earth-300" />,
    label: "Feinkostladen",
    description: "Wild, Ziegenkäse, Trüffel, Forellen, Sauerteigbrot und mehr — alles von handverlesenen regionalen Erzeugern.",
    bg: "bg-earth-800",
    hover: "hover:bg-earth-700",
    cta: "Mehr erfahren",
    badge: "Heidelberg-Rohrbach",
  },
  {
    href: "/weinbar",
    icon: <Wine size={40} className="text-purple-300" />,
    label: "Weinbar",
    description: "Spontankauf, Verkostung & Revierabende. Wildaufschnitt, Ziegenkäse, kuratierte Weine und handgemachter Gin.",
    bg: "bg-purple-900",
    hover: "hover:bg-purple-800",
    cta: "Entdecken",
    badge: "Walk-in",
  },
  {
    href: "/kochschule",
    icon: <ChefHat size={40} className="text-amber-300" />,
    label: "Kochschule",
    description: "Wild von der Zerlegung bis zum fertigen Gericht. Kochkurse, Events und Nose-to-Tail-Abende im Manufaktur-Ambiente.",
    bg: "bg-stone-800",
    hover: "hover:bg-stone-700",
    cta: "Kurse entdecken",
    badge: "Kurse & Events",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-forest-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('/hero-forest.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-4xl mx-auto px-4 py-24 text-center">
          <span className="inline-block bg-forest-600 text-forest-100 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Vom Revier auf den Tisch
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Revierküche
          </h1>
          <p className="text-forest-200 text-lg md:text-xl max-w-2xl mx-auto mb-4">
            Wildmanufaktur · Feinkostladen · Weinbar · Kochschule
          </p>
          <p className="text-forest-300 text-base max-w-xl mx-auto mb-10">
            Handwerklich veredeltes Wildbret und erlesene regionale Produkte —
            transparent, nachhaltig und direkt von der Quelle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marktplatz"
              className="bg-forest-500 hover:bg-forest-400 text-white font-semibold px-8 py-3 rounded-xl flex items-center gap-2 justify-center transition">
              Zum Onlineshop <ArrowRight size={18} />
            </Link>
            <Link href="/feinkostladen"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3 rounded-xl transition">
              Uns besuchen
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Bereiche */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4">
        {BEREICHE.map((b) => (
          <Link key={b.href} href={b.href}
            className={`${b.bg} ${b.hover} text-white p-8 flex flex-col gap-5 transition-colors group min-h-[280px]`}>
            <div className="flex items-center justify-between">
              {b.icon}
              <span className="text-xs font-medium bg-white/10 px-3 py-1 rounded-full">{b.badge}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">{b.label}</h2>
              <p className="text-white/65 text-sm leading-relaxed">{b.description}</p>
            </div>
            <span className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
              {b.cta} <ArrowRight size={16} />
            </span>
          </Link>
        ))}
      </section>

      {/* Unsere Philosophie */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Unsere Philosophie</h2>
          <p className="text-stone-500 max-w-2xl mx-auto">
            REVIERKÜCHE versteht sich als kuratorischer Feinkost-Knotenpunkt der Region
            Heidelberg und Odenwald. Jedes Produkt steht für eine klare Haltung:
            regional, handwerklich, nachhaltig.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Leaf className="text-forest-500" size={28} />, title: "100% Regional & Wild", text: "Wildbret von lokalen Jägern aus dem 100 km-Umkreis — waidgerecht erlegt, kürzeste Transportwege, maximale Frische." },
            { icon: <MapPin className="text-earth-500" size={28} />, title: "Handverlesene Erzeuger", text: "Alle Partner sind persönlich bekannt — von Odenwälder Trüffeln über Rheinfischer bis zu Ziegenkäse aus Nußloch." },
            { icon: <Users className="text-amber-500" size={28} />, title: "Nose to Tail", text: "Wir verwerten das ganze Tier — von der Keule bis zur Wurst. Nichts wird verschwendet, alles wird veredelt." },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
              <div className="mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Erzeuger Teaser */}
      <section className="bg-stone-50 border-t border-stone-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Unsere Erzeuger-Partner</h2>
          <p className="text-stone-500 mb-8 max-w-xl mx-auto">
            Ziegenkäse, Forellen, Trüffel, Sauerteigbrot, Gin, Kaffee — alles aus der Region,
            alles handwerklich, alles mit Geschichte.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["Nußlocher Ziegenkäsehof", "Forellenhof Lenz", "Odenwälder Trüffel", "Rheinfischer", "Südseide Bakery", "Inge & der Honigbär", "Privatrösterei Bonafede", "THEO Essigmanufaktur"].map((name) => (
              <span key={name} className="bg-white border border-stone-200 text-stone-600 text-sm px-4 py-2 rounded-full shadow-sm">
                {name}
              </span>
            ))}
          </div>
          <Link href="/erzeuger"
            className="inline-flex items-center gap-2 text-forest-700 font-medium hover:text-forest-500 transition">
            Alle Erzeuger kennenlernen <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
