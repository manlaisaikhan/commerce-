"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const slides = [
  { image: "https://i.pinimg.com/1200x/b7/e9/84/b7e9843e7be5b9421a0d9d3ed780557e.jpg" },
  { image: "https://i.pinimg.com/736x/a9/44/04/a9440441964c4adad84f59d05227a720.jpg" },
  { image: "https://i.pinimg.com/736x/b7/68/2e/b7682e2fddfb18e6135f6a8b17bb5a5c.jpg" },
  { image: "https://i.pinimg.com/736x/d2/5d/14/d25d140370dbeefadedadf99f5d75542.jpg" },
  { image: "https://i.pinimg.com/736x/0b/0b/7c/0b0b7c64e43840e938a04a362a2649fa.jpg" },
  { image: "https://i.pinimg.com/1200x/d5/1d/fc/d51dfc2cd908221652cc9968a996e3ce.jpg" },
  { image: "https://i.pinimg.com/736x/37/57/ed/3757edb32fb0a023047a4ea8fdeb0163.jpg" },
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

      {slides.map((s, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 will-change-[opacity]"
        >
          <img src={s.image} alt="" loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover object-center" />
        </motion.div>
      ))}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black to-transparent" />

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
