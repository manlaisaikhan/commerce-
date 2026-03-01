"use client";

import Link from "next/link";
import { Phone, Mail, ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { AuronLogo } from "@/components/ui/auron-logo";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/auth/")) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black border-t border-white/10">

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <AuronLogo className="h-7 w-auto mb-4" />
            <p className="text-white/50 text-sm leading-relaxed">
              Чанартай бүтээгдэхүүн, хурдан хүргэлт, найдвартай үйлчилгээ.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Бүтээгдэхүүн
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">Бүх бүтээгдэхүүн</Link>
              </li>
              <li>
                <Link href="/products?featured=true" className="hover:text-white transition-colors">Онцлох бүтээгдэхүүн</Link>
              </li>
              <li>
                <Link href="/products?sort=newest" className="hover:text-white transition-colors">Шинэ бүтээгдэхүүн</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Холбоо барих
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <span>+976 9900-1122</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} />
                <span>info@store.mn</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Instagram
            </h4>
            <a
              href="https://www.instagram.com/manlai._s"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              <div>
                <p className="text-white text-lg font-bold group-hover:text-purple-400 transition-colors">@manlai._s</p>
                <p className="text-white/40 text-xs">Биднийг дагаарай</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <p className="text-xs text-white/30">
            &copy; 2026 AURONSTORE. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowUp size={16} className="text-white/60" />
          </button>
        </div>
      </div>
    </footer>
  );
}
