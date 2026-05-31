import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ProduktKategorie, JagdMethode, TierArt } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPreis(preis: number, proKg: boolean) {
  const formatted = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(preis);
  return proKg ? `${formatted} / kg` : formatted;
}

export const TIER_ARTEN: TierArt[] = [
  "Reh", "Hirsch", "Wildschwein", "Hase",
  "Fasan", "Ente", "Rebhuhn", "Fuchs", "Sonstiges",
];

export const KATEGORIEN: { value: ProduktKategorie; label: string; description: string }[] = [
  {
    value: "ganzes_tier",
    label: "Ganzes Tier",
    description: "Nicht ausgeweidet oder komplett im Stück",
  },
  {
    value: "teilzerwirkt",
    label: "Teilzerwirkt",
    description: "Ausgenommen, in Teilstücke zerlegt",
  },
  {
    value: "veredelt",
    label: "Veredelt",
    description: "Verarbeitet: Wurst, Schinken, Aufschnitt etc.",
  },
];

export const JAGD_METHODEN: { value: JagdMethode; label: string }[] = [
  { value: "ansitzjagd",     label: "Ansitzjagd" },
  { value: "drückjagd",     label: "Drückjagd" },
  { value: "bewegungsjagd", label: "Bewegungsjagd" },
  { value: "fallenjagd",    label: "Fallenjagd" },
  { value: "sonstiges",     label: "Sonstiges" },
];
