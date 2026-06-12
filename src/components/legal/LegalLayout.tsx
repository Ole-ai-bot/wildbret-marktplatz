import Link from "next/link";

export function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="bg-stone-950 text-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-4">Rechtliches</p>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold">{title}</h1>
          {intro && <p className="text-stone-400 mt-4 max-w-xl">{intro}</p>}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">
        <article className="legal-prose">{children}</article>

        <div className="mt-16 pt-8 border-t border-stone-100 flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-widest uppercase text-stone-400">
          <Link href="/impressum" className="hover:text-stone-800 transition">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-stone-800 transition">Datenschutz</Link>
          <Link href="/agb" className="hover:text-stone-800 transition">AGB</Link>
          <Link href="/widerruf" className="hover:text-stone-800 transition">Widerruf</Link>
        </div>
      </div>
    </div>
  );
}

// Hilfskomponenten für konsistente Typografie
export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mb-9">
      <h2 className="font-playfair text-xl font-bold text-stone-900 mb-3">{heading}</h2>
      <div className="text-stone-600 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export function Platzhalter({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-amber-100 text-amber-900 px-1 rounded-sm not-italic">{children}</mark>
  );
}
