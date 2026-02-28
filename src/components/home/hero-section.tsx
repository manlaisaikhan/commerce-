"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const slides = [
  {
    title: "NEW\nCOLLECTION",
    subtitle: "2026 WINTER / NEW LOOK",
    description: "Шинэ цуглуулга. Өвөрмөц загвар. Чанартай материал.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=80",
    cta: "Дэлгүүр үзэх",
    href: "/products",
  },
  {
    title: "BEST\nSELLERS",
    subtitle: "TRENDING NOW",
    description: "Хамгийн эрэлттэй бүтээгдэхүүнүүд.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80",
    cta: "Бестселлер үзэх",
    href: "/products?featured=true",
  },
  {
    title: "PREMIUM\nQUALITY",
    subtitle: "EXCLUSIVE ITEMS",
    description: "Онцгой чанар. Дэлхийн брэндүүд.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80",
    cta: "Онцлох бараа",
    href: "/products?featured=true",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevSlide(current);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[92vh] min-h-[560px] max-h-[900px] overflow-hidden">
      {/* Background Images */}
      {slides.map((s, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{
            opacity: i === current ? 1 : 0,
            scale: i === current ? 1 : 1.08,
          }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
        </motion.div>
      ))}

      {/* Layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* Vertical text — right side, desktop only */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-10">
        <div className="w-px h-20 bg-white/20" />
        <p
          className="text-[10px] font-medium tracking-[0.4em] text-white/30 uppercase"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          SS — 2026
        </p>
        <div className="w-px h-20 bg-white/20" />
      </div>

      {/* Slide counter — top right */}
      <div className="absolute top-6 right-6 lg:right-20 z-10 hidden sm:flex items-center gap-3">
        <motion.span
          key={current}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-black text-white tabular-nums leading-none"
        >
          {String(current + 1).padStart(2, "0")}
        </motion.span>
        <div className="flex flex-col gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 ${
                i === current
                  ? "w-8 h-0.5 bg-white"
                  : "w-4 h-0.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-white/30 font-light tabular-nums">
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Subtitle */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-white/60" />
              <p className="text-white/60 text-[11px] sm:text-xs font-medium tracking-[0.4em] uppercase">
                {slide.subtitle}
              </p>
            </div>

            {/* Title */}
            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black text-white tracking-tight leading-[0.88] mb-8 whitespace-pre-line">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-white/50 text-sm sm:text-base max-w-sm mb-10 leading-relaxed">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-6 flex-wrap">
              <Link
                href={slide.href}
                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
              >
                {slide.cta}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products?sale=true"
                className="group inline-flex items-center gap-2 text-xs font-medium text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em]"
              >
                Хямдралтай бараа
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile slide dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 sm:hidden flex items-center gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${
              i === current ? "w-8 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-8 z-10 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.3em] text-white/30 uppercase rotate-90 origin-center mb-2">
          Scroll
        </span>
        <ChevronDown size={16} className="text-white/30" />
      </motion.div>
    </section>
  );
}
