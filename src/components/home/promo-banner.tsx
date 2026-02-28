"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export function PromoBanner() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-linear-to-br from-[#0a0a1e] via-[#10103a] to-[#0f0f2e]" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1400&q=80')" }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/30 to-transparent" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <div className="relative z-10 flex items-center">
            {/* Left: text */}
            <div className="flex-1 px-10 sm:px-16 py-16 sm:py-24">
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.6, ease }}
                className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-white/40 mb-5"
              >
                Тусгай санал
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.7, ease }}
              >
                <h2 className="font-display text-6xl sm:text-8xl md:text-[9rem] text-white tracking-wide leading-none mb-2">
                  ХӨНГӨЛӨЛТ
                </h2>
                <h3 className="font-display text-4xl sm:text-6xl text-white/20 tracking-wide mb-10">
                  30% ХҮРТЭЛ
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.6, ease }}
                className="text-white/40 text-sm max-w-xs mb-10 leading-relaxed"
              >
                Шинэ цуглуулгын бүтээгдэхүүнд хөнгөлөлт эдлэх боломж. Хязгаарлагдмал хугацаатай.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.6, ease }}
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
                initial={{ opacity: 0, scale: 0.7, x: 40 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.9, ease }}
                className="relative"
              >
                <span
                  className="text-[10rem] lg:text-[14rem] font-black text-transparent tracking-tight leading-none select-none"
                  style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.12)" }}
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
