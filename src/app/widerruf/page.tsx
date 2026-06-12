import { LegalLayout, LegalSection, Platzhalter } from "@/components/legal/LegalLayout";

export const metadata = {
  title: "Widerrufsbelehrung — Revierküche",
  robots: { index: false, follow: false },
};

export default function WiderrufPage() {
  return (
    <LegalLayout
      title="Widerrufsbelehrung"
      intro="Widerrufsrecht für Verbraucher bei Fernabsatzverträgen."
    >
      <LegalSection heading="Widerrufsrecht">
        <p>
          Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu
          widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem du oder ein
          von dir benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen
          hat bzw. hast.
        </p>
        <p>
          Um dein Widerrufsrecht auszuüben, musst du uns (Ole Hake · Revierküche ·
          Rathausstraße 75 · 69126 Heidelberg-Rohrbach · info@revierkueche.de ·
          Telefon <Platzhalter>+49 …</Platzhalter>) mittels einer eindeutigen Erklärung
          (z. B. ein mit der Post versandter Brief oder eine E-Mail) über deinen Entschluss,
          diesen Vertrag zu widerrufen, informieren.
        </p>
        <p>
          Zur Wahrung der Widerrufsfrist reicht es aus, dass du die Mitteilung über die
          Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absendest.
        </p>
      </LegalSection>

      <LegalSection heading="Folgen des Widerrufs">
        <p>
          Wenn du diesen Vertrag widerrufst, haben wir dir alle Zahlungen, die wir von dir
          erhalten haben, einschließlich der Lieferkosten (mit Ausnahme zusätzlicher Kosten,
          die sich daraus ergeben, dass du eine andere Art der Lieferung als die von uns
          angebotene, günstigste Standardlieferung gewählt hast), unverzüglich und spätestens
          binnen vierzehn Tagen zurückzuzahlen.
        </p>
      </LegalSection>

      <LegalSection heading="Ausschluss / Erlöschen des Widerrufsrechts">
        <p>
          Das Widerrufsrecht besteht <strong>nicht</strong> bei Verträgen zur Lieferung von
          Waren, die schnell verderben können oder deren Verfallsdatum schnell überschritten
          würde (§ 312g Abs. 2 Nr. 2 BGB). Dies betrifft insbesondere{" "}
          <strong>frisches und gekühltes Wildfleisch, Frischware und Tiefkühlprodukte</strong>.
        </p>
        <p>
          Ebenso erlischt es bei versiegelten Waren, die aus Gründen des Gesundheitsschutzes
          oder der Hygiene nicht zur Rückgabe geeignet sind, wenn die Versiegelung nach der
          Lieferung entfernt wurde.{" "}
          <Platzhalter>Zutreffende Ausnahmen je Sortiment final festlegen.</Platzhalter>
        </p>
      </LegalSection>

      <LegalSection heading="Muster-Widerrufsformular">
        <p className="bg-stone-50 border border-stone-200 rounded-lg p-4 text-xs whitespace-pre-line">
{`An: Ole Hake · Revierküche · Rathausstraße 75 · 69126 Heidelberg-Rohrbach · info@revierkueche.de

Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den
Kauf der folgenden Waren (*):

— Bestellt am (*) / erhalten am (*):
— Name des/der Verbraucher(s):
— Anschrift des/der Verbraucher(s):
— Unterschrift (nur bei Mitteilung auf Papier):
— Datum:

(*) Unzutreffendes streichen.`}
        </p>
      </LegalSection>

      <p className="text-xs text-stone-400 mt-10 bg-amber-50 border border-amber-100 rounded-lg p-4">
        ⚠️ Diese Widerrufsbelehrung ist eine unverbindliche Vorlage. Die Ausnahmen für
        verderbliche Lebensmittel müssen exakt auf dein Sortiment abgestimmt und vor
        Veröffentlichung rechtlich geprüft werden.
      </p>
    </LegalLayout>
  );
}
