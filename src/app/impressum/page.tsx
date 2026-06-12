import { LegalLayout, LegalSection, Platzhalter } from "@/components/legal/LegalLayout";

export const metadata = {
  title: "Impressum — Revierküche",
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum" intro="Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz).">
      <LegalSection heading="Diensteanbieter">
        <p>
          Ole Hake<br />
          Revierküche<br />
          Rathausstraße 75<br />
          69126 Heidelberg-Rohrbach<br />
          Deutschland
        </p>
        <p className="text-xs text-stone-400">
          Rechtsform / Firmierung bitte prüfen:{" "}
          <Platzhalter>Einzelunternehmen / GmbH / … — exakte Firmierung eintragen</Platzhalter>
        </p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>
          Telefon: <Platzhalter>+49 … (Telefonnummer eintragen)</Platzhalter><br />
          E-Mail: info@revierkueche.de
        </p>
      </LegalSection>

      <LegalSection heading="Umsatzsteuer-Identifikationsnummer">
        <p>
          USt-IdNr. gemäß § 27a UStG:{" "}
          <Platzhalter>DE… (oder Hinweis auf Kleinunternehmerregelung § 19 UStG)</Platzhalter>
        </p>
      </LegalSection>

      <LegalSection heading="Registereintrag (falls vorhanden)">
        <p>
          Registergericht: <Platzhalter>Amtsgericht …</Platzhalter><br />
          Registernummer: <Platzhalter>HRB … / nicht zutreffend bei Einzelunternehmen</Platzhalter>
        </p>
      </LegalSection>

      <LegalSection heading="Aufsichtsbehörde / Erlaubnis (Lebensmittel & Wild)">
        <p>
          Zuständige Lebensmittelüberwachung:{" "}
          <Platzhalter>Veterinäramt / Lebensmittelüberwachungsamt Rhein-Neckar-Kreis</Platzhalter>
        </p>
        <p className="text-xs text-stone-400">
          Hinweis: Für das Inverkehrbringen von Wildfleisch und tierischen Erzeugnissen sind
          ggf. Registrierungen/Zulassungen nach EU-Hygienerecht erforderlich. Bitte zuständige
          Behörde und ggf. Veterinärkontrollnummer hier ergänzen.
        </p>
      </LegalSection>

      <LegalSection heading="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          Ole Hake, Anschrift wie oben.
        </p>
      </LegalSection>

      <LegalSection heading="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr/" className="text-forest-700 underline" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
          . Unsere E-Mail-Adresse findest du oben.
        </p>
      </LegalSection>

      <LegalSection heading="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen. <span className="text-xs text-stone-400">(Formulierung je nach Entscheidung anpassen.)</span>
        </p>
      </LegalSection>

      <p className="text-xs text-stone-400 mt-10 bg-amber-50 border border-amber-100 rounded-lg p-4">
        ⚠️ Dieses Impressum ist eine unverbindliche Vorlage. Alle gelb markierten Felder müssen
        ausgefüllt und die Angaben vor Veröffentlichung rechtlich geprüft werden
        (z. B. eRecht24, Händlerbund oder Rechtsanwalt).
      </p>
    </LegalLayout>
  );
}
