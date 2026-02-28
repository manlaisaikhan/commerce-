"use client";

import { motion } from "framer-motion";

const items = [
  "UTOPIA DROP 2026",
  "FREE SHIPPING",
  "CACTUS JACK",
  "LIMITED EDITION",
  "ХУРДАН ХҮРГЭЛТ",
  "EXCLUSIVE ITEMS",
  "NIGHT VISIONS",
  "ЧАНАРТАЙ МАТЕРИАЛ",
];

export function MarqueeStrip() {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden py-3.5 border-y border-white/8 bg-black/30 backdrop-blur-sm">
      <motion.div
        animate={{ x: "-50%" }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 pr-6">
            <span className="font-display text-sm tracking-[0.25em] text-white/50 uppercase">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
