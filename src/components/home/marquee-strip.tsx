"use client";

import { motion } from "framer-motion";

const items = [
  "ШИНЭ ЦУГЛУУЛГА",
  "ТУСГАЙ САНАЛ",
  "ХУРДАН ХҮРГЭЛТ",
  "ЧАНАРТАЙ МАТЕРИАЛ",
  "ОНЦЛОХ БАРАА",
  "ХЯМДРАЛТАЙ БАРАА",
];

export function MarqueeStrip() {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-white overflow-hidden py-4 border-y border-neutral-200">
      <motion.div
        animate={{ x: "-50%" }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 pr-6">
            <span className="text-[11px] font-black text-black uppercase tracking-[0.35em]">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-black/30 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
