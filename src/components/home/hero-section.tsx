"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const slides = [
  { image: "https://i.pinimg.com/1200x/a6/ec/c3/a6ecc3832b5dcc42a77fbdf2633ac196.jpg" },
  { image: "https://i.pinimg.com/1200x/20/b3/3e/20b33ef326faa03a1fa82dab6bf1f91d.jpg" },
  { image: "https://i.pinimg.com/736x/1b/7e/7f/1b7e7f24dc42d108a33ea44ec700f196.jpg" },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[45vh] sm:h-[55vh] lg:h-[70vh] min-h-72 overflow-hidden">

      {/* Images */}
      {slides.map((s, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1 : 1.05 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img src={s.image} alt="" className="w-full h-full object-cover object-top" />
        </motion.div>
      ))}

      {/* Subtle bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black to-transparent" />

      {/* Slide dots — bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${
              i === current
                ? "w-8 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Slide number — top right */}
      <div className="absolute top-5 right-6 z-10 hidden sm:flex items-center gap-2">
        <motion.span
          key={current}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/30 text-xs tabular-nums font-light"
        >
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </motion.span>
      </div>
    </section>
  );
}
