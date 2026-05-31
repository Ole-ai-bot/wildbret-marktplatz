import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Users, Euro, ChefHat } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { KursBookingForm } from "@/components/kochschule/KursBookingForm";

export default async function KursDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: kurs } = await supabase
    .from("kochkurse")
    .select("*")
    .eq("id", id)
    .single();

  if (!kurs) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <ChefHat size={24} className="text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{kurs.titel}</h1>
            <p className="text-stone-500 mt-1">{kurs.beschreibung}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <CalendarDays size={16} />, label: "Datum", value: format(new Date(kurs.datum), "dd. MMM yyyy", { locale: de }) },
            { icon: <Clock size={16} />, label: "Dauer", value: `${kurs.dauer_stunden} Stunden` },
            { icon: <Users size={16} />, label: "Plätze frei", value: `${kurs.plaetze_frei} / ${kurs.max_teilnehmer}` },
            { icon: <Euro size={16} />, label: "Preis", value: `${kurs.preis} €` },
          ].map((item) => (
            <div key={item.label} className="bg-stone-50 rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </div>
              <p className="font-semibold text-stone-800 text-sm">{item.value}</p>
            </div>
          ))}
        </div>

        {kurs.inhalte && (
          <div className="mb-8">
            <h2 className="font-semibold mb-3">Kursinhalte</h2>
            <ul className="flex flex-col gap-2">
              {kurs.inhalte.map((inhalt: string) => (
                <li key={inhalt} className="flex items-center gap-2 text-sm text-stone-600">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                  {inhalt}
                </li>
              ))}
            </ul>
          </div>
        )}

        {kurs.plaetze_frei > 0 ? (
          <KursBookingForm kursId={kurs.id} kursTitle={kurs.titel} preis={kurs.preis} />
        ) : (
          <div className="bg-red-50 rounded-xl p-4 text-red-600 text-sm text-center">
            Dieser Kurs ist leider ausgebucht.
          </div>
        )}
      </div>
    </div>
  );
}
