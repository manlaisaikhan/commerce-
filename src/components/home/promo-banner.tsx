"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PromoBanner() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1e] via-[#10103a] to-[#0f0f2e]" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1400&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

          {/* Decorative grid lines */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <div className="relative z-10 flex items-center">
            {/* Left: text content */}
            <div className="flex-1 px-10 sm:px-16 py-16 sm:py-24">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-white/40 mb-5"
              >
                Тусгай санал
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-none mb-3">
                  ХӨНГӨЛӨЛТ
                </h2>
                <h3 className="text-3xl sm:text-5xl font-black text-white/20 tracking-tight mb-10">
                  30% ХҮРТЭЛ
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-white/40 text-sm max-w-xs mb-10 leading-relaxed"
              >
                Шинэ цуглуулгын бүтээгдэхүүнд хөнгөлөлт эдлэх боломж. Хязгаарлагдмал хугацаатай.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
                >
                  Худалдан авах
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Right: large decorative number */}
            <div className="hidden md:flex items-center justify-center pr-16 shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative"
              >
                <span
                  className="text-[10rem] lg:text-[14rem] font-black text-transparent tracking-tight leading-none select-none"
                  style={{
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.12)",
                  }}
                >
                  30%
                </span>
                <span className="absolute inset-0 flex items-center justify-center text-[10rem] lg:text-[14rem] font-black text-white/5 tracking-tight leading-none select-none blur-sm">
                  30%
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
