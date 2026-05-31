import { MapPin, Clock, UtensilsCrossed, Leaf, Fish, Milk } from "lucide-react";

const SORTIMENT = [
  {
    kategorie: "Wild & Manufaktur",
    icon: "🦌",
    items: ["Wildwurst & Aufschnitt an der Theke", "Frischware vakuumiert", "Maultaschen & Schupfnudeln aus Wildbret", "Konserven & Gläser", "Fertiggerichte aus der Manufaktur"],
  },
  {
    kategorie: "Regionale Erzeuger",
    icon: "🌿",
    items: ["Odenwälder Trüffel (saisonal)", "Ziegenkäse aus Nußloch", "Forellen & Räucherfisch aus dem Odenwald", "Fisch vom Rheinfischer (Oktober–März)", "Sauerteigbrot täglich frisch"],
  },
  {
    kategorie: "Feinkost & Spezialitäten",
    icon: "🍯",
    items: ["Handgemachte Gins & Spirituosen", "Kaltgepresste Bio-Öle (Pfalz)", "Naturbelassene Essige & Balsamicos", "Freshly gerösteter Specialty Coffee", "Saisonales Gemüse & Obst direkt vom Feld"],
  },
  {
    kategorie: "Wein & Getränke",
    icon: "🍷",
    items: ["Kuratierte Weinauswahl zur Wildküche", "Obstbrände & Schnäpse aus der Region", "Frisch gepresste Säfte", "Kaffeespezialitäten"],
  },
  {
    kategorie: "Geschenke & Boxen",
    icon: "🎁",
    items: ["Wildbox des Monats (Abo)", "Feinkost-Geschenkboxen", "Gutscheine für Kochkurse", "Merchandise & Zubehör", "Kuratierte Saisonboxen"],
  },
];

export default function FeinkostladenPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-earth-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-earth-600 text-earth-100 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Heidelberg-Rohrbach
          </span>
          <h1 className="text-4xl font-bold mb-4">Feinkostladen</h1>
          <p className="text-earth-200 text-lg max-w-2xl">
            Besuche uns und entdecke handwerklich veredeltes Wildbret, Trüffel aus dem Odenwald,
            Ziegenkäse aus Nußloch, Forellen aus dem Quellwasser und vieles mehr —
            alles von persönlich bekannten Erzeugern aus der Region.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <InfoCard icon={<MapPin className="text-earth-500" size={20} />} title="Adresse">
            <p>Rathausstraße 75</p>
            <p>69126 Heidelberg-Rohrbach</p>
          </InfoCard>
          <InfoCard icon={<Clock className="text-earth-500" size={20} />} title="Öffnungszeiten">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between gap-4"><span className="text-stone-400">Mo – Fr</span><span>9:00 – 18:00</span></div>
              <div className="flex justify-between gap-4"><span className="text-stone-400">Samstag</span><span>9:00 – 14:00</span></div>
              <div className="flex justify-between gap-4"><span className="text-stone-400">Sonntag</span><span className="text-stone-400">Geschlossen</span></div>
            </div>
          </InfoCard>
          <InfoCard icon={<UtensilsCrossed className="text-earth-500" size={20} />} title="Konzept">
            <p className="text-sm">Vitrinen, Kühltheke & Regal — alles regional, alles handwerklich, alles mit Geschichte.</p>
          </InfoCard>
        </div>

        {/* Sortiment */}
        <h2 className="text-2xl font-bold mb-6">Unser Sortiment</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {SORTIMENT.map((s) => (
            <div key={s.kategorie} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{s.icon}</span>
                <h3 className="font-semibold text-stone-800">{s.kategorie}</h3>
              </div>
              <ul className="flex flex-col gap-2">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="w-1.5 h-1.5 bg-earth-400 rounded-full flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Erzeuger Highlight */}
        <div className="bg-forest-50 rounded-2xl p-8 border border-forest-100">
          <div className="flex items-center gap-2 mb-4">
            <Leaf size={20} className="text-forest-600" />
            <h2 className="font-semibold text-forest-900">Handverlesene Erzeuger</h2>
          </div>
          <p className="text-stone-600 text-sm mb-5 max-w-2xl">
            Alle unsere Erzeuger sind persönlich bekannt und handverlesen — keine Handelsware,
            keine anonymen Lieferketten. Jedes Produkt hat ein Gesicht und eine Geschichte.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Nußlocher Ziegenkäsehof", "Forellenhof Lenz", "Odenwälder Trüffel", "Rheinfischer Kuhn", "Südseite Bakery", "Privatrösterei Bonafede", "THEO Essigmanufaktur", "Wasgau Ölmühle", "Inge & der Honigbär", "Obstbau Pfisterer"].map((name) => (
              <span key={name} className="bg-white border border-forest-200 text-forest-700 text-xs px-3 py-1.5 rounded-full">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-3">{icon}<h3 className="font-semibold text-stone-800">{title}</h3></div>
      <div className="text-stone-600 text-sm">{children}</div>
    </div>
  );
}
