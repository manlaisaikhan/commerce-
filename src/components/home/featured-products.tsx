
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard3D } from "@/components/products/product-card";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  stock: number;
  category: { name: string };
}

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease },
  },
};

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [tab, setTab] = useState<"new" | "bestseller">("new");

  useEffect(() => {
    const params = tab === "new" ? "sort=newest&limit=8" : "featured=true&limit=8";
    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((data) => { if (data.products) setProducts(data.products); })
      .catch(() => {});
  }, [tab]);

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase mb-3 font-grotesk">
              Бүтээгдэхүүн
            </p>
            <h2 className="font-display text-5xl sm:text-7xl tracking-wide leading-none">
              ОНЦЛОХ БАРАА
            </h2>
          </div>
          <Link
            href="/products"
            className="group hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-white/40 hover:text-white transition-colors uppercase tracking-[0.2em] mb-1"
          >
            Бүгдийг харах
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease }}
          className="flex items-center gap-0 mb-12 border-b border-white/10"
        >
          {(["new", "bestseller"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative pb-3 mr-8 text-sm font-semibold transition-colors ${
                tab === t ? "text-white" : "text-white/30 hover:text-white/60"
              }`}
            >
              {t === "new" ? "Шинэ" : "Бестселлер"}
              {tab === t && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard3D
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  comparePrice: product.comparePrice,
                  image: product.images?.[0] || "",
                  category: product.category?.name,
                  stock: product.stock,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile view all */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="flex justify-center mt-12 sm:hidden"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-white transition-colors uppercase tracking-wider"
          >
            Бүгдийг харах
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
