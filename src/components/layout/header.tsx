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
import { SearchOverlay } from "./search-overlay";

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
  const [searchOpen, setSearchOpen] = useState(false);
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
        className={`sticky top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-black/80 backdrop-blur-3xl shadow-2xl shadow-black/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between h-[72px] px-4 sm:px-8">
            <Link href="/" className="flex items-center shrink-0 group">
              <AuronLogo className="h-7 sm:h-8 w-auto transition-transform duration-300 group-hover:scale-105" />
            </Link>

            <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/products" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-[13px] font-medium tracking-wide uppercase transition-all duration-300 rounded-full ${
                      isActive
                        ? "text-white bg-white/10"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/8 transition-all duration-300 group"
              >
                <Search size={17} className="text-white/50 group-hover:text-white transition-colors" />
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/8 transition-all duration-300 group relative"
              >
                <ShoppingBag size={17} className="text-white/50 group-hover:text-white transition-colors" />
                {mounted && itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] bg-violet-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-black"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>

              <div className="w-px h-5 bg-white/10 mx-2 hidden sm:block" />

              <SignedOut>
                <SignInButton mode="redirect">
                  <button className="hidden sm:flex items-center gap-2 ml-1 px-5 py-2 rounded-full bg-white text-black text-[13px] font-semibold tracking-wide hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/10">
                    Нэвтрэх
                  </button>
                </SignInButton>
                <SignInButton mode="redirect">
                  <button className="sm:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/8 transition-all duration-300">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserMenu />
              </SignedIn>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-10 h-10 lg:hidden flex items-center justify-center hover:bg-white/8 rounded-full transition-all duration-300 ml-0.5"
              >
                {mobileOpen
                  ? <X size={18} className="text-white/70" />
                  : <Menu size={18} className="text-white/70" />}
              </button>
            </div>
          </div>

          <div className={`h-px transition-all duration-700 ${scrolled ? "bg-white/8" : "bg-transparent"}`} />
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-black/95 backdrop-blur-3xl border-t border-white/5"
            >
              <nav className="flex flex-col px-6 py-5 gap-0.5 max-w-[1400px] mx-auto">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block py-3.5 px-4 rounded-xl text-[15px] font-medium tracking-wide transition-all ${
                          isActive
                            ? "text-white bg-white/8"
                            : "text-white/50 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
