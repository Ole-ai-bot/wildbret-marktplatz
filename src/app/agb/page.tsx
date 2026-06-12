import { LegalLayout, LegalSection, Platzhalter } from "@/components/legal/LegalLayout";

export const metadata = {
  title: "AGB — Revierküche",
  robots: { index: false, follow: false },
};

export default function AGBPage() {
  return (
    <LegalLayout
      title="Allgemeine Geschäftsbedingungen"
      intro="AGB für den Onlineshop und Marktplatz der Revierküche."
    >
      <LegalSection heading="§ 1 Geltungsbereich & Anbieter">
        <p>
          Diese AGB gelten für alle Bestellungen über den Onlineshop der Revierküche
          (Ole Hake, Rathausstraße 75, 69126 Heidelberg-Rohrbach). Für den{" "}
          <strong>Wildbret-Marktplatz</strong> gilt: Verträge über dort inserierte Wildprodukte
          kommen unmittelbar zwischen dem jeweiligen Anbieter (Jäger) und dem Käufer zustande.
          Die Revierküche tritt insoweit als Vermittlungsplattform auf.{" "}
          <Platzhalter>Rolle der Plattform (Vermittler vs. Verkäufer) anwaltlich prüfen.</Platzhalter>
        </p>
      </LegalSection>

      <LegalSection heading="§ 2 Vertragsschluss">
        <p>
          Die Darstellung der Produkte stellt kein bindendes Angebot dar. Durch Anklicken des
          Bestell-Buttons gibst du ein verbindliches Angebot ab. Der Vertrag kommt mit unserer
          Bestellbestätigung bzw. dem Versand der Ware zustande.
        </p>
      </LegalSection>

      <LegalSection heading="§ 3 Preise & Versandkosten">
        <p>
          Alle Preise verstehen sich inkl. der gesetzlichen Umsatzsteuer.{" "}
          <Platzhalter>USt-Satz für Lebensmittel (i. d. R. 7 %) prüfen.</Platzhalter> Zzgl.
          Versandkosten gemäß Angabe im Bestellprozess (Standardversand{" "}
          <Platzhalter>5,90 €</Platzhalter>, versandkostenfrei ab{" "}
          <Platzhalter>75 €</Platzhalter>).
        </p>
      </LegalSection>

      <LegalSection heading="§ 4 Zahlung">
        <p>
          Die Zahlung erfolgt über die im Bestellprozess angebotenen Zahlarten (Stripe). Beim
          Marktplatz kann zusätzlich Barzahlung bei Abholung angeboten werden; die Abwicklung
          erfolgt dann direkt zwischen Anbieter und Käufer.
        </p>
      </LegalSection>

      <LegalSection heading="§ 5 Lieferung & Versand verderblicher Ware">
        <p>
          Lebensmittel, insbesondere Frisch- und Tiefkühlware, werden gekühlt versendet.{" "}
          <Platzhalter>Lieferzeiten, Liefergebiete und Kühlversand-Bedingungen ergänzen.</Platzhalter>
        </p>
      </LegalSection>

      <LegalSection heading="§ 6 Widerrufsrecht">
        <p>
          Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Einzelheiten und Ausnahmen
          (insbesondere für schnell verderbliche Lebensmittel) findest du in unserer{" "}
          <a href="/widerruf" className="text-forest-700 underline">Widerrufsbelehrung</a>.
        </p>
      </LegalSection>

      <LegalSection heading="§ 7 Gewährleistung">
        <p>
          Es gelten die gesetzlichen Gewährleistungsrechte.
        </p>
      </LegalSection>

      <LegalSection heading="§ 8 Altersnachweis (Alkohol)">
        <p>
          Spirituosen, Wein und Champagner werden nur an Personen abgegeben, die das
          gesetzlich vorgeschriebene Mindestalter erreicht haben.{" "}
          <Platzhalter>Altersverifikation im Bestellprozess sicherstellen.</Platzhalter>
        </p>
      </LegalSection>

      <LegalSection heading="§ 9 Schlussbestimmungen">
        <p>
          Es gilt deutsches Recht. <Platzhalter>Gerichtsstand / salvatorische Klausel ergänzen.</Platzhalter>
        </p>
      </LegalSection>

      <p className="text-xs text-stone-400 mt-10 bg-amber-50 border border-amber-100 rounded-lg p-4">
        ⚠️ Diese AGB sind eine unverbindliche Vorlage. Gerade die Doppelrolle (eigener Shop +
        Vermittlungs-Marktplatz), der Lebensmittel-Onlinehandel und der Alkoholverkauf bergen
        besondere rechtliche Anforderungen. Bitte vor Veröffentlichung anwaltlich prüfen lassen.
      </p>
    </LegalLayout>
  );
}
