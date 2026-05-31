import { NewListingForm } from "@/components/listings/NewListingForm";

export default function NeuesInseratPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Inserat erstellen</h1>
      <p className="text-stone-500 text-sm mb-8">
        Stelle dein Produkt kostenlos auf dem Marktplatz ein.
      </p>
      <NewListingForm />
    </div>
  );
}
