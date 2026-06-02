"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "./products";

export interface CartItem {
  slug: string;
  name: string;
  preis: number;
  gewicht: string;
  bild?: string;
  menge: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  updateMenge: (slug: string, menge: number) => void;
  clear: () => void;
  totalItems: number;
  totalPreis: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "revierkueche-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Aus localStorage laden
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, []);

  // In localStorage speichern
  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  function addItem(product: Product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === product.slug ? { ...i, menge: i.menge + 1 } : i
        );
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          preis: product.preis,
          gewicht: product.gewicht,
          bild: product.bild,
          menge: 1,
        },
      ];
    });
    setIsOpen(true);
  }

  function removeItem(slug: string) {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }

  function updateMenge(slug: string, menge: number) {
    if (menge <= 0) {
      removeItem(slug);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, menge } : i))
    );
  }

  function clear() {
    setItems([]);
  }

  const totalItems = items.reduce((sum, i) => sum + i.menge, 0);
  const totalPreis = items.reduce((sum, i) => sum + i.preis * i.menge, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateMenge, clear, totalItems, totalPreis, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart muss innerhalb von CartProvider verwendet werden");
  return ctx;
}
