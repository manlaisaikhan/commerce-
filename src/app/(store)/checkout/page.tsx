"use client";

import { motion } from "framer-motion";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export default function CheckoutPage() {
  return (
    <div className="pt-10 pb-16 px-4 animate-page-enter">
      <div className="max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Төлбөр төлөх</h1>
          <p className="text-white/40 mb-10">Хүргэлтийн мэдээллээ оруулна уу</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="p-6 sm:p-8 rounded-xl border border-white/10 bg-white/5">
          <CheckoutForm />
        </motion.div>
      </div>
    </div>
  );
}
