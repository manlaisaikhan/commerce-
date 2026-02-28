"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const slides = [
  {
    title: "UTOPIA\nDROP",
    subtitle: "CACTUS JACK — SS 2026",
    tag: "Шинэ цуглуулга",
    description: "Шөнийн гэрэл. Онцгой загвар. Хязгаарлагдмал цуглуулга.",
    image: "https://i.pinimg.com/1200x/a6/ec/c3/a6ecc3832b5dcc42a77fbdf2633ac196.jpg",
    accent: "#f59e0b",
    cta: "Дэлгүүр үзэх",
    href: "/products",
  },
  {
    title: "LA\nFLAME",
    subtitle: "LIVE — EXCLUSIVE DROP",
    tag: "Бестселлер",
    description: "Хамгийн эрэлттэй бүтээгдэхүүнүүд. Чанарын баталгаа.",
    image: "https://i.pinimg.com/1200x/20/b3/3e/20b33ef326faa03a1fa82dab6bf1f91d.jpg",
    accent: "#8b5cf6",
    cta: "Бестселлер үзэх",
    href: "/products?featured=true",
  },
  {
    title: "NIGHT\nVISIONS",
    subtitle: "LIMITED EDITION — 2026",
    tag: "Хязгаарлагдмал",
    description: "Онцгой чанар. Орой цагийн соёл. Тусгай санал.",
    image: "https://i.pinimg.com/736x/1b/7e/7f/1b7e7f24dc42d108a33ea44ec700f196.jpg",
    accent: "#ec4899",
    cta: "Онцлох бараа",
    href: "/products?featured=true",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[60vh] sm:h-[75vh] lg:h-[92vh] min-h-120 max-h-240 overflow-hidden">

      {/* Background Images */}
      {slides.map((s, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1 : 1.06 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img src={s.image} alt="" className="w-full h-full object-cover object-center" />
        </motion.div>
      ))}

      {/* Gradients */}
      <div className="absolute inset-0 bg-linear-to-r from-black/92 via-black/58 to-black/18" />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/35" />

      {/* Accent glow */}
      <motion.div
        key={current}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute -top-40 -left-40 w-125 h-125 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${slide.accent}14` }}
      />

      {/* Slide counter — sm+ */}
      <div className="absolute top-5 right-5 sm:top-6 sm:right-6 lg:right-20 z-10 hidden sm:flex items-center gap-3">
        <motion.span
          key={current}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl lg:text-2xl font-black text-white tabular-nums leading-none"
        >
          {String(current + 1).padStart(2, "0")}
        </motion.span>
        <div className="flex flex-col gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 ${
                i === current ? "w-8 h-0.5 bg-white" : "w-4 h-0.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-white/25 font-light tabular-nums">
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Vertical label — desktop only */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-10">
        <div className="w-px h-16 bg-white/15" />
        <p className="text-[9px] tracking-[0.45em] text-white/20 uppercase"
          style={{ writingMode: "vertical-rl" }}>
          SS — 2026
        </p>
        <div className="w-px h-16 bg-white/15" />
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 48, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -24, filter: "blur(12px)" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Tag pill */}
            <div className="inline-flex items-center gap-3 mb-5 sm:mb-6">
              <span
                className="px-3 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border"
                style={{
                  color: slide.accent,
                  borderColor: `${slide.accent}40`,
                  background: `${slide.accent}12`,
                }}
              >
                {slide.tag}
              </span>
              <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase hidden md:inline">
                {slide.subtitle}
              </span>
            </div>

            {/* Title — Bebas Neue */}
            <h1 className="font-display text-[clamp(4.5rem,13vw,12rem)] leading-[0.87] tracking-wide mb-5 sm:mb-7 whitespace-pre-line text-white">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="hidden sm:block text-white/40 text-sm lg:text-base max-w-xs lg:max-w-sm mb-8 lg:mb-10 leading-relaxed font-grotesk">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <Link
                href={slide.href}
                className="group inline-flex items-center gap-2.5 bg-white text-black px-5 sm:px-8 py-3 sm:py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
              >
                {slide.cta}
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products?sale=true"
                className="group inline-flex items-center gap-2 text-[11px] font-semibold text-white/40 hover:text-white transition-colors uppercase tracking-[0.18em]"
              >
                <span className="hidden sm:inline">Хямдралтай бараа</span>
                <span className="sm:hidden">Хямдрал</span>
                <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:hidden flex items-center gap-2.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${
              i === current ? "w-7 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-7 left-6 sm:left-8 z-10 hidden sm:flex flex-col items-center gap-1.5"
      >
        <span className="text-[8px] tracking-[0.35em] text-white/25 uppercase">Scroll</span>
        <ChevronDown size={14} className="text-white/25" />
      </motion.div>
    </section>
  );
}
