import { ProductGrid } from "@/components/shop/ProductGrid";

export const metadata = {
  title: "Onlineshop — Revierküche",
  description: "Handwerklich veredelte Wildprodukte und regionale Feinkost — direkt nach Hause.",
};

export default function ShopPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-stone-950 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-6">Revierküche</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">Onlineshop</h1>
          <div className="w-10 h-px bg-forest-500 mb-6" />
          <p className="text-stone-400 text-lg max-w-xl leading-relaxed">
            Handwerklich veredelte Wildprodukte und erlesene Feinkost von unseren
            regionalen Erzeugern — direkt zu dir nach Hause.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <ProductGrid />
      </div>
    </div>
  );
}
