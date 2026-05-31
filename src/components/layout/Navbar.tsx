"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Leaf, Plus, User, Heart, ShoppingBag, MessageCircle, LogOut, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { NotificationBell } from "./NotificationBell";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const router = useRouter();

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
    <nav className="bg-forest-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg flex-shrink-0">
          <Leaf size={22} className="text-forest-300" />
          Revierküche
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2 text-sm flex-1 justify-end">
          <Link href="/marktplatz" className="hover:bg-forest-700 px-3 py-1.5 rounded-lg transition">
            Onlineshop
          </Link>
          <Link href="/feinkostladen" className="hover:bg-forest-700 px-3 py-1.5 rounded-lg transition">
            Feinkostladen
          </Link>
          <Link href="/kochschule" className="hover:bg-forest-700 px-3 py-1.5 rounded-lg transition">
            Kochschule
          </Link>

          {user ? (
            <>
              <Link href="/favoriten" className="hover:bg-forest-700 p-2 rounded-lg transition" title="Merkliste">
                <Heart size={18} />
              </Link>
              <Link href="/dashboard/messages" className="hover:bg-forest-700 p-2 rounded-lg transition" title="Nachrichten">
                <MessageCircle size={18} />
              </Link>
              <Link href="/dashboard/orders" className="hover:bg-forest-700 p-2 rounded-lg transition" title="Bestellungen">
                <ShoppingBag size={18} />
              </Link>
              <NotificationBell userId={user.id} />
              <Link href="/dashboard/profile" className="hover:bg-forest-700 p-2 rounded-lg transition" title="Profil">
                <User size={18} />
              </Link>
              <Link
                href="/inserat/neu"
                className="bg-forest-500 hover:bg-forest-400 px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition font-medium"
              >
                <Plus size={16} /> Inserieren
              </Link>
              <button onClick={handleLogout} className="hover:bg-forest-700 p-2 rounded-lg transition" title="Abmelden">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:bg-forest-700 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5">
                <LogIn size={16} /> Anmelden
              </Link>
              <Link
                href="/inserat/neu"
                className="bg-forest-500 hover:bg-forest-400 px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition font-medium"
              >
                <Plus size={16} /> Inserieren
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          {user && <NotificationBell userId={user.id} />}
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-forest-900 px-4 pb-4 flex flex-col gap-1 text-sm">
          {[
            { href: "/marktplatz",           label: "Onlineshop" },
            { href: "/feinkostladen",         label: "Feinkostladen" },
            { href: "/kochschule",            label: "Kochschule" },
            { href: "/inserat/neu",           label: "Produkt inserieren" },
            ...(user ? [
              { href: "/favoriten",             label: "Merkliste" },
              { href: "/dashboard/messages",    label: "Nachrichten" },
              { href: "/dashboard/orders",      label: "Bestellungen" },
              { href: "/dashboard/listings",    label: "Meine Inserate" },
              { href: "/dashboard/profile",     label: "Profil" },
            ] : [
              { href: "/auth/login",            label: "Anmelden" },
              { href: "/auth/register",         label: "Registrieren" },
            ]),
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2.5 border-b border-forest-700 hover:text-forest-200"
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <button onClick={() => { setOpen(false); handleLogout(); }} className="py-2.5 text-left text-red-300">
              Abmelden
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
