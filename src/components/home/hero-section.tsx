"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const slides = [
  {
    title: "UTOPIA\nDROP",
    subtitle: "CACTUS JACK — SS 2026",
    description: "Шөнийн гэрэл. Онцгой загвар. Хязгаарлагдмал цуглуулга.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1600&q=90",
    accent: "#f59e0b",
    cta: "Дэлгүүр үзэх",
    href: "/products",
  },
  {
    title: "LA\nFLAME",
    subtitle: "LIVE — EXCLUSIVE DROP",
    description: "Хамгийн эрэлттэй бүтээгдэхүүнүүд. Чанарын баталгаа.",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=90",
    accent: "#8b5cf6",
    cta: "Бестселлер үзэх",
    href: "/products?featured=true",
  },
  {
    title: "NIGHT\nVISIONS",
    subtitle: "LIMITED EDITION — 2026",
    description: "Онцгой чанар. Орой цагийн соёл. Тусгай санал.",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600&q=90",
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
    /* ── RESPONSIVE: h-[60vh] phone | h-[75vh] tablet | h-[92vh] desktop ── */
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

      {/* Layered gradients */}
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40" />

      {/* Accent glow — top left */}
      <motion.div
        key={current}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${slide.accent}18` }}
      />

      {/* ── SLIDE COUNTER — hidden on phone ── */}
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

      {/* ── VERTICAL TEXT — desktop only ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-10">
        <div className="w-px h-16 bg-white/15" />
        <p
          className="text-[9px] font-medium tracking-[0.45em] text-white/20 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          SS — 2026
        </p>
        <div className="w-px h-16 bg-white/15" />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 48, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -24, filter: "blur(12px)" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Subtitle */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div
                className="w-6 sm:w-8 h-px"
                style={{ background: slide.accent }}
              />
              <p
                className="text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase"
                style={{ color: slide.accent }}
              >
                {slide.subtitle}
              </p>
            </div>

            {/* Title — clamp for phone / tablet / desktop */}
            <h1 className="text-[clamp(3rem,11vw,9rem)] font-black text-white tracking-tight leading-[0.85] mb-5 sm:mb-8 whitespace-pre-line">
              {slide.title}
            </h1>

            {/* Description — hidden on small phone */}
            <p className="hidden sm:block text-white/45 text-sm lg:text-base max-w-xs lg:max-w-sm mb-8 lg:mb-10 leading-relaxed">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <Link
                href={slide.href}
                className="group inline-flex items-center gap-2.5 text-black px-5 sm:px-8 py-3 sm:py-4 text-[11px] font-black uppercase tracking-[0.18em] transition-opacity hover:opacity-90"
                style={{ background: "#ffffff" }}
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

      {/* ── MOBILE SLIDE DOTS ── */}
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

      {/* ── SCROLL INDICATOR — hidden on phone ── */}
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
