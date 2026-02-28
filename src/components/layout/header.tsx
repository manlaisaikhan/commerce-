"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { CartSidebar } from "./cart-sidebar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const itemCount = useCartStore((s) => s.itemCount());

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setCategories(data); })
      .catch(() => {});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/products", label: "Бүгд" },
    ...categories.map((c) => ({ href: `/products?category=${c.slug}`, label: c.name })),
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled ? "bg-black/95 backdrop-blur-md border-white/10" : "bg-black border-white/5"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">S</span>
              </div>
            </Link>

            {/* Desktop Nav - Center */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions - Right */}
            <div className="flex items-center gap-1">
              <Link href="/products" className="p-2.5 rounded-full hover:bg-white/10 transition-colors">
                <Search size={20} className="text-white" />
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="p-2.5 rounded-full hover:bg-white/10 transition-colors relative"
              >
                <ShoppingBag size={20} className="text-white" />
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <SignedOut>
                <SignInButton mode="redirect">
                  <button className="p-2.5 rounded-full hover:bg-white/10 transition-colors text-white text-sm font-medium">
                    Нэвтрэх
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 md:hidden hover:bg-white/10 rounded-full transition-colors"
              >
                {mobileOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black border-t border-white/10"
            >
              <nav className="flex flex-col px-6 py-4 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium py-3 text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
