/**
 * Umsatzsteuer aus einem Bruttobetrag herausrechnen. Cent-genau und
 * kaufmaennisch gerundet: netto + ust ergibt IMMER wieder brutto, damit in der
 * Buchhaltung keine Ein-Cent-Differenzen entstehen.
 *
 *   ustAufteilung(890, 7)  -> { netto: 832, ust: 58 }
 *   ustAufteilung(2900, 19) -> { netto: 2437, ust: 463 }
 */
export function ustAufteilung(bruttoCents: number, ustProzent: number): { netto: number; ust: number } {
  if (!Number.isFinite(ustProzent) || ustProzent <= 0) return { netto: bruttoCents, ust: 0 };
  const netto = Math.round(bruttoCents / (1 + ustProzent / 100));
  return { netto, ust: bruttoCents - netto };
}
