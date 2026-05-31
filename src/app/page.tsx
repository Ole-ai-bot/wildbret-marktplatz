import Link from "next/link";
import { ArrowRight, ShoppingBag, UtensilsCrossed, ChefHat } from "lucide-react";

const BEREICHE = [
  {
    href: "/marktplatz",
    icon: <ShoppingBag size={36} className="text-forest-300" />,
    label: "Onlineshop",
    description: "Frisches Wildbret direkt vom Jäger — ganz, teilzerwirkt oder veredelt. Regional, transparent, nachhaltig.",
    bg: "bg-forest-800",
    hover: "hover:bg-forest-700",
    cta: "Zum Shop",
    badge: "Wildbret & mehr",
  },
  {
    href: "/feinkostladen",
    icon: <UtensilsCrossed size={36} className="text-earth-300" />,
    label: "Feinkostladen",
    description: "Unser Laden in deiner Nähe — erlesene Wild-Spezialitäten, regionale Produkte und persönliche Beratung.",
    bg: "bg-earth-800",
    hover: "hover:bg-earth-700",
    cta: "Mehr erfahren",
    badge: "Vor Ort",
  },
  {
    href: "/kochschule",
    icon: <ChefHat size={36} className="text-amber-300" />,
    label: "Kochschule",
    description: "Lerne Wild richtig zubereiten — in unseren Kochkursen von der Zerlegung bis zum fertigen Gericht.",
    bg: "bg-stone-800",
    hover: "hover:bg-stone-700",
    cta: "Kurse entdecken",
    badge: "Kurse & Events",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-forest-900 text-white py-20 px-4 text-center">
        <span className="inline-block bg-forest-600 text-forest-100 text-sm font-medium px-3 py-1 rounded-full mb-6">
          Vom Revier auf den Tisch
        </span>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Revierküche
        </h1>
        <p className="text-forest-300 text-lg md:text-xl max-w-2xl mx-auto">
          Deine Welt rund ums Wild — Onlineshop, Feinkostladen und Kochschule unter einem Dach.
        </p>
      </section>

      {/* 3 Bereiche */}
      <section className="grid md:grid-cols-3 flex-1">
        {BEREICHE.map((b) => (
          <Link
            key={b.href}
            href={b.href}
            className={`${b.bg} ${b.hover} text-white p-10 flex flex-col gap-6 transition-colors group`}
          >
            <div className="flex items-center justify-between">
              {b.icon}
              <span className="text-xs font-medium bg-white/10 px-3 py-1 rounded-full">
                {b.badge}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">{b.label}</h2>
              <p className="text-white/70 text-sm leading-relaxed">{b.description}</p>
            </div>
            <span className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
              {b.cta} <ArrowRight size={16} />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
