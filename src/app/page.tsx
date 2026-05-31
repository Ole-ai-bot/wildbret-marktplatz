import Link from "next/link";
import { ArrowRight, Leaf, MapPin, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-forest-800 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-forest.jpg')" }}
        />
        <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
          <span className="inline-block bg-forest-600 text-forest-100 text-sm font-medium px-3 py-1 rounded-full mb-6">
            Direkt vom Jäger
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Regionales Wildbret<br />aus der Natur
          </h1>
          <p className="text-forest-200 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Kaufe frisches Wildfleisch direkt beim Jäger — ganz, teilzerwirkt oder veredelt.
            Transparent, regional, nachhaltig.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marktplatz"
              className="bg-forest-500 hover:bg-forest-400 text-white font-semibold px-8 py-3 rounded-xl flex items-center gap-2 justify-center transition"
            >
              Zum Marktplatz <ArrowRight size={18} />
            </Link>
            <Link
              href="/inserat/neu"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-8 py-3 rounded-xl transition"
            >
              Produkt inserieren
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-20 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Leaf className="text-forest-500" size={28} />,
            title: "100% Wild & Regional",
            text: "Kein Zuchtfleisch. Jedes Tier wurde in freier Wildbahn erlegt.",
          },
          {
            icon: <MapPin className="text-earth-500" size={28} />,
            title: "Direkt aus deiner Region",
            text: "Filtere nach Bundesland oder Landkreis und kauf lokal.",
          },
          {
            icon: <ShieldCheck className="text-forest-500" size={28} />,
            title: "Transparent & sicher",
            text: "Jagdmethode, Gewicht und Herkunft sind immer angegeben.",
          },
        ].map((f) => (
          <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
            <div className="mb-4">{f.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-stone-500 text-sm">{f.text}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-earth-50 border-t border-earth-100">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Du bist Jäger?</h2>
          <p className="text-stone-500 mb-8">
            Inseriere dein Wildbret kostenlos und erreiche Käufer direkt in deiner Region.
          </p>
          <Link
            href="/auth/register"
            className="bg-forest-700 hover:bg-forest-600 text-white font-semibold px-8 py-3 rounded-xl inline-flex items-center gap-2 transition"
          >
            Jetzt kostenlos registrieren <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
