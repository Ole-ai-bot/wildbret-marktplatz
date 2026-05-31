import { MapPin, Clock, Phone, Mail, UtensilsCrossed } from "lucide-react";

export default function FeinkostladenPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="inline-block bg-earth-100 text-earth-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
          Vor Ort
        </span>
        <h1 className="text-3xl font-bold mb-3">Feinkostladen</h1>
        <p className="text-stone-500 text-lg max-w-xl">
          Besuche uns in unserem Laden und entdecke erlesene Wild-Spezialitäten,
          regionale Produkte und persönliche Beratung.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Infos */}
        <div className="flex flex-col gap-5">
          <InfoCard icon={<MapPin className="text-earth-500" size={22} />} title="Adresse">
            <p>Musterstraße 1</p>
            <p>12345 Musterstadt</p>
          </InfoCard>

          <InfoCard icon={<Clock className="text-earth-500" size={22} />} title="Öffnungszeiten">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <span className="text-stone-500">Mo – Fr</span><span>9:00 – 18:00 Uhr</span>
              <span className="text-stone-500">Samstag</span><span>9:00 – 14:00 Uhr</span>
              <span className="text-stone-500">Sonntag</span><span className="text-stone-400">Geschlossen</span>
            </div>
          </InfoCard>

          <InfoCard icon={<Phone className="text-earth-500" size={22} />} title="Kontakt">
            <a href="tel:+491234567890" className="hover:text-earth-600 transition">+49 123 456 7890</a>
          </InfoCard>

          <InfoCard icon={<Mail className="text-earth-500" size={22} />} title="E-Mail">
            <a href="mailto:info@revierkueche.de" className="hover:text-earth-600 transition">
              info@revierkueche.de
            </a>
          </InfoCard>
        </div>

        {/* Sortiment */}
        <div className="bg-earth-50 rounded-2xl p-6 border border-earth-100">
          <div className="flex items-center gap-2 mb-5">
            <UtensilsCrossed size={20} className="text-earth-600" />
            <h2 className="font-semibold text-earth-900">Unser Sortiment</h2>
          </div>
          <ul className="flex flex-col gap-3">
            {[
              "Frisches Wildfleisch der Saison",
              "Wildwürste & Aufschnitt",
              "Marinaden & Gewürze",
              "Regionale Feinkost",
              "Wildgerechtes Zubehör",
              "Geschenksets & Präsentkörbe",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-stone-700">
                <span className="w-1.5 h-1.5 bg-earth-500 rounded-full flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Google Maps Placeholder */}
      <div className="mt-10 bg-stone-100 rounded-2xl h-64 flex items-center justify-center border border-stone-200">
        <div className="text-center text-stone-400">
          <MapPin size={32} className="mx-auto mb-2" />
          <p className="text-sm">Kartenansicht</p>
          <p className="text-xs mt-1">Google Maps hier einbetten</p>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-semibold text-stone-800">{title}</h3>
      </div>
      <div className="text-stone-600 text-sm">{children}</div>
    </div>
  );
}
