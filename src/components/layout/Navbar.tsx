"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Plus, User, Heart, ShoppingBag, MessageCircle, LogOut, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { NotificationBell } from "./NotificationBell";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const NAV_LINKS = [
  { href: "/shop",          label: "Onlineshop" },
  { href: "/marktplatz",    label: "Wildbret-Marktplatz" },
  { href: "/feinkostladen", label: "Feinkostladen" },
  { href: "/weinbar",       label: "Weinbar" },
  { href: "/kochschule",    label: "Kochschule" },
  { href: "/erzeuger",      label: "Erzeuger" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="bg-stone-950 text-white border-b border-stone-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="font-playfair text-lg font-bold tracking-tight text-white hover:text-stone-300 transition flex-shrink-0">
          Revierküche
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 flex-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-widest uppercase px-3 py-2 transition ${
                pathname === link.href
                  ? "text-white"
                  : "text-stone-500 hover:text-stone-200"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <>
              <Link href="/favoriten" className="text-stone-500 hover:text-white p-2 transition" title="Merkliste">
                <Heart size={17} />
              </Link>
              <Link href="/dashboard/messages" className="text-stone-500 hover:text-white p-2 transition" title="Nachrichten">
                <MessageCircle size={17} />
              </Link>
              <Link href="/dashboard/orders" className="text-stone-500 hover:text-white p-2 transition" title="Bestellungen">
                <ShoppingBag size={17} />
              </Link>
              <NotificationBell userId={user.id} />
              <Link href="/dashboard/profile" className="text-stone-500 hover:text-white p-2 transition" title="Profil">
                <User size={17} />
              </Link>
              <Link href="/inserat/neu"
                className="ml-2 flex items-center gap-1.5 border border-forest-700 hover:border-forest-500 text-forest-400 hover:text-forest-300 text-xs tracking-widest uppercase px-4 py-2 transition">
                <Plus size={14} /> Inserieren
              </Link>
              <button onClick={handleLogout} className="text-stone-600 hover:text-stone-400 p-2 transition" title="Abmelden">
                <LogOut size={17} />
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login"
                className="text-stone-500 hover:text-white text-xs tracking-widest uppercase px-3 py-2 transition flex items-center gap-1.5">
                <LogIn size={14} /> Anmelden
              </Link>
              <Link href="/inserat/neu"
                className="flex items-center gap-1.5 border border-forest-700 hover:border-forest-500 text-forest-400 hover:text-forest-300 text-xs tracking-widest uppercase px-4 py-2 transition">
                <Plus size={14} /> Inserieren
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          {user && <NotificationBell userId={user.id} />}
          <button onClick={() => setOpen(!open)} className="text-stone-400 hover:text-white transition">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-stone-900 border-t border-stone-800 px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              className="text-xs tracking-widest uppercase text-stone-400 hover:text-white py-3 border-b border-stone-800 transition">
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/favoriten" onClick={() => setOpen(false)} className="text-xs tracking-widest uppercase text-stone-400 hover:text-white py-3 border-b border-stone-800">Merkliste</Link>
              <Link href="/dashboard/messages" onClick={() => setOpen(false)} className="text-xs tracking-widest uppercase text-stone-400 hover:text-white py-3 border-b border-stone-800">Nachrichten</Link>
              <Link href="/dashboard/orders" onClick={() => setOpen(false)} className="text-xs tracking-widest uppercase text-stone-400 hover:text-white py-3 border-b border-stone-800">Bestellungen</Link>
              <Link href="/dashboard/listings" onClick={() => setOpen(false)} className="text-xs tracking-widest uppercase text-stone-400 hover:text-white py-3 border-b border-stone-800">Meine Inserate</Link>
              <Link href="/dashboard/profile" onClick={() => setOpen(false)} className="text-xs tracking-widest uppercase text-stone-400 hover:text-white py-3 border-b border-stone-800">Profil</Link>
              <Link href="/inserat/neu" onClick={() => setOpen(false)} className="text-xs tracking-widest uppercase text-forest-400 py-3 border-b border-stone-800">Inserieren</Link>
              <button onClick={() => { setOpen(false); handleLogout(); }} className="text-xs tracking-widest uppercase text-stone-600 py-3 text-left">Abmelden</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" onClick={() => setOpen(false)} className="text-xs tracking-widest uppercase text-stone-400 hover:text-white py-3 border-b border-stone-800">Anmelden</Link>
              <Link href="/auth/register" onClick={() => setOpen(false)} className="text-xs tracking-widest uppercase text-stone-400 hover:text-white py-3">Registrieren</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
