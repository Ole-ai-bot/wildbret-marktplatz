import { LegalLayout, LegalSection, Platzhalter } from "@/components/legal/LegalLayout";

export const metadata = {
  title: "Datenschutzerklärung — Revierküche",
  robots: { index: false, follow: false },
};

export default function DatenschutzPage() {
  return (
    <LegalLayout
      title="Datenschutz"
      intro="Informationen zur Verarbeitung personenbezogener Daten gemäß Art. 13 DSGVO."
    >
      <LegalSection heading="1. Verantwortlicher">
        <p>
          Ole Hake · Revierküche · Rathausstraße 75 · 69126 Heidelberg-Rohrbach<br />
          E-Mail: info@revierkueche.de · Telefon: <Platzhalter>+49 …</Platzhalter>
        </p>
      </LegalSection>

      <LegalSection heading="2. Hosting (Vercel)">
        <p>
          Diese Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf werden technisch
          notwendige Daten (z. B. IP-Adresse, Datum/Uhrzeit, abgerufene Seite, Browser) in
          Server-Logs verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse an sicherem Betrieb). Es besteht ein Auftragsverarbeitungsvertrag.{" "}
          <Platzhalter>Ggf. EU-Standardvertragsklauseln / Datentransfer USA ergänzen.</Platzhalter>
        </p>
      </LegalSection>

      <LegalSection heading="3. Datenbank & Konten (Supabase)">
        <p>
          Für Nutzerkonten, Inserate, Nachrichten und Bestellungen nutzen wir Supabase als
          Datenbank- und Authentifizierungsdienst. Verarbeitet werden u. a. Name, E-Mail-Adresse,
          ggf. Telefonnummer und Region sowie die von dir eingestellten Inhalte. Rechtsgrundlage:
          Art. 6 Abs. 1 lit. b DSGVO (Vertrag/Nutzungsverhältnis).
        </p>
      </LegalSection>

      <LegalSection heading="4. Zahlungsabwicklung (Stripe)">
        <p>
          Zahlungen werden über Stripe abgewickelt. Dabei werden die für die Zahlung
          erforderlichen Daten (z. B. Name, Anschrift, Zahlungsdaten) an die Stripe Payments
          Europe Ltd. übermittelt. Zahlungsdaten geben Käufer direkt bei Stripe ein; wir
          speichern keine vollständigen Kartendaten. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
        </p>
      </LegalSection>

      <LegalSection heading="5. Push-Benachrichtigungen">
        <p>
          Sofern du Push-Benachrichtigungen aktivierst, speichern wir die dafür notwendigen
          Endpunkt- und Schlüsseldaten deines Browsers. Du kannst die Benachrichtigungen
          jederzeit in deinem Profil oder den Browser-Einstellungen deaktivieren.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
        </p>
      </LegalSection>

      <LegalSection heading="6. Kontaktaufnahme & Anfragen">
        <p>
          Wenn du Anfragen an Anbieter stellst oder uns kontaktierst, verarbeiten wir die dabei
          angegebenen Daten zur Bearbeitung der Anfrage. Rechtsgrundlage: Art. 6 Abs. 1 lit. b
          bzw. lit. f DSGVO.
        </p>
      </LegalSection>

      <LegalSection heading="7. Speicherdauer">
        <p>
          Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke
          erforderlich ist oder gesetzliche Aufbewahrungsfristen (z. B. handels- und
          steuerrechtlich) dies vorschreiben.
        </p>
      </LegalSection>

      <LegalSection heading="8. Deine Rechte">
        <p>
          Du hast das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
          Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO)
          sowie das Recht auf Widerruf erteilter Einwilligungen. Zudem besteht ein Beschwerderecht
          bei einer Aufsichtsbehörde (für Baden-Württemberg: Der Landesbeauftragte für den
          Datenschutz und die Informationsfreiheit Baden-Württemberg).
        </p>
      </LegalSection>

      <p className="text-xs text-stone-400 mt-10 bg-amber-50 border border-amber-100 rounded-lg p-4">
        ⚠️ Diese Datenschutzerklärung ist eine unverbindliche Vorlage und nicht vollständig.
        Bitte vor Veröffentlichung mit einem Generator (z. B. eRecht24) oder anwaltlich
        vervollständigen — insbesondere zu Cookies, Reichweitenmessung, Drittland-Transfers
        und den konkret eingesetzten Diensten.
      </p>
    </LegalLayout>
  );
}
