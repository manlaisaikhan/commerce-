"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Smartphone, Shirt, Home, Dumbbell, Sparkles, Watch, Tag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const iconMap: Record<string, LucideIcon> = {
  electronics: Smartphone,
  clothing: Shirt,
  home: Home,
  sports: Dumbbell,
  beauty: Sparkles,
  accessories: Watch,
};

const gradientMap: Record<string, string> = {
  electronics: "from-[#050d2d] via-[#0a1a5e] to-[#0d1f80]",
  clothing:    "from-[#111111] via-[#1c1c1c] to-[#282828]",
  home:        "from-[#1a0f00] via-[#2d1e00] to-[#3d2800]",
  sports:      "from-[#001a08] via-[#002d12] to-[#003d18]",
  beauty:      "from-[#1a0010] via-[#2d0020] to-[#3d0030]",
  accessories: "from-[#0d0028] via-[#1a0050] to-[#220070]",
};

const accentMap: Record<string, string> = {
  electronics: "text-blue-400",
  clothing:    "text-white/70",
  home:        "text-amber-400",
  sports:      "text-emerald-400",
  beauty:      "text-pink-400",
  accessories: "text-violet-400",
};

const borderMap: Record<string, string> = {
  electronics: "hover:border-blue-500/40",
  clothing:    "hover:border-white/20",
  home:        "hover:border-amber-500/40",
  sports:      "hover:border-emerald-500/40",
  beauty:      "hover:border-pink-500/40",
  accessories: "hover:border-violet-500/40",
};

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setCategories(data); })
      .catch(() => {});
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase mb-3">
              Ангилал
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
              АНГИЛАЛУУД
            </h2>
          </div>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.slug] ?? Tag;
            const gradient = gradientMap[cat.slug] ?? "from-[#111] to-[#222]";
            const accent = accentMap[cat.slug] ?? "text-white/60";
            const border = borderMap[cat.slug] ?? "hover:border-white/20";

            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link
                  href={`/products?category=${cat.slug}`}
                  className={`group relative flex flex-col items-center justify-center aspect-square rounded-2xl overflow-hidden border border-white/5 ${border} transition-all duration-500 bg-gradient-to-br ${gradient}`}
                >
                  {/* Icon */}
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className={`transition-transform duration-300 group-hover:-translate-y-1 ${accent}`}>
                      <Icon size={32} strokeWidth={1.2} />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-[0.2em] text-center px-2">
                      {cat.name}
                    </span>
                  </div>

                  {/* Bottom line */}
                  <div className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/20" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
