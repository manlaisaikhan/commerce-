"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { CartSidebar } from "./cart-sidebar";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { UserMenu } from "./user-menu";
import { AuronLogo } from "@/components/ui/auron-logo";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const itemCount = useCartStore((s) => s.itemCount());

  useEffect(() => {
    if (pathname.startsWith("/auth/")) return;
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setCategories(data); })
      .catch(() => {});

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (pathname.startsWith("/auth/")) return null;

  const navLinks = [
    { href: "/products", label: "Бүгд" },
    ...categories.map((c) => ({ href: `/products?category=${c.slug}`, label: c.name })),
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? "bg-black/75 backdrop-blur-2xl border-white/10"
            : "bg-black/20 backdrop-blur-xl border-white/5"
        }`}
      >
        <div className="flex items-center justify-between h-16 pl-2 pr-2 sm:pl-6 sm:pr-6">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <AuronLogo className="h-7 sm:h-8 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-violet-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Link
                href="/products"
                className="p-2.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <Search size={18} className="text-white/70" />
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="p-2.5 rounded-full hover:bg-white/10 transition-colors relative"
              >
                <ShoppingBag size={18} className="text-white/70" />
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-violet-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md shadow-violet-500/50">
                    {itemCount}
                  </span>
                )}
              </button>

              <SignedOut>
                <SignInButton mode="redirect">
                  <button className="ml-1 px-4 py-2 rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all text-white/70 hover:text-white text-xs font-semibold tracking-wide">
                    Нэвтрэх
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserMenu />
              </SignedIn>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 md:hidden hover:bg-white/10 rounded-full transition-colors ml-1"
              >
                {mobileOpen
                  ? <X size={18} className="text-white/70" />
                  : <Menu size={18} className="text-white/70" />}
              </button>
            </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/80 backdrop-blur-2xl border-t border-white/8"
            >
              <nav className="flex flex-col px-6 py-4 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium py-3 text-white/70 hover:text-white transition-colors"
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
