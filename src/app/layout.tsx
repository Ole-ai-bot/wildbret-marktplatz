import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/shop/CartDrawer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revierküche",
  description: "Wildmanufaktur · Feinkostladen · Weinbar · Kochschule — Heidelberg",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#1a2e12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans">
        <CartProvider>
        <Navbar />
        <CartDrawer />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-stone-950 text-stone-400 py-12 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
            <div className="md:col-span-2">
              <p className="font-playfair text-white text-xl mb-3">Revierküche</p>
              <p className="leading-relaxed max-w-xs">
                Wildmanufaktur, Feinkostladen, Weinbar und Kochschule in Heidelberg-Rohrbach.
                Vom Revier auf den Tisch.
              </p>
            </div>
            <div>
              <p className="text-white font-medium mb-3 uppercase tracking-widest text-xs">Navigation</p>
              <ul className="space-y-2">
                {[["Onlineshop", "/marktplatz"], ["Feinkostladen", "/feinkostladen"], ["Weinbar", "/weinbar"], ["Kochschule", "/kochschule"], ["Erzeuger", "/erzeuger"]].map(([label, href]) => (
                  <li key={href}><a href={href} className="hover:text-white transition">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-medium mb-3 uppercase tracking-widest text-xs">Kontakt</p>
              <ul className="space-y-2">
                <li>Heidelberg-Rohrbach</li>
                <li><a href="mailto:info@revierkueche.de" className="hover:text-white transition">info@revierkueche.de</a></li>
                <li><a href="https://instagram.com/revierküche" className="hover:text-white transition">@revierküche</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-stone-800 text-xs flex flex-col sm:flex-row justify-between gap-2">
            <p>© 2026 Revierküche. Alle Rechte vorbehalten.</p>
            <div className="flex gap-4">
              <a href="/impressum" className="hover:text-white transition">Impressum</a>
              <a href="/datenschutz" className="hover:text-white transition">Datenschutz</a>
            </div>
          </div>
        </footer>
        </CartProvider>
      </body>
    </html>
  );
}
