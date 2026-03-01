"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  images: string[];
}

interface CategorySection {
  id: string;
  name: string;
  slug: string;
  products: Product[];
}

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export function Categories() {
  const [sections, setSections] = useState<CategorySection[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(async (cats) => {
        if (!Array.isArray(cats)) return;

        const results = await Promise.all(
          cats.map(async (cat) => {
            try {
              const res = await fetch(`/api/products?category=${cat.slug}&limit=4`);
              const data = await res.json();
              return { ...cat, products: data.products || [] };
            } catch {
              return { ...cat, products: [] };
            }
          })
        );

        setSections(results.filter((s) => s.products.length > 0));
      })
      .catch(() => {});
  }, []);

  if (sections.length === 0) return null;

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="space-y-12">
          {sections.map((section, idx) => (
            <motion.div
              key={section.slug}
              initial={{ opacity: 0, y: 56, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.75, ease, delay: idx * 0.05 }}
            >
              <Link
                href={`/products?category=${section.slug}`}
                className="group flex items-center gap-5 mb-8 w-fit"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-[#161616] border border-white/8 shrink-0">
                  {section.products[0]?.images?.[0] ? (
                    <img
                      src={section.products[0].images[0]}
                      alt=""
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1e1e1e]" />
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-white/70 transition-colors duration-300 tracking-tight">
                  {section.name}
                </h2>
              </Link>

              <div className="h-px bg-white/8 mb-8" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
                {section.products.slice(0, 4).map((product, pIdx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, ease, delay: pIdx * 0.07 }}
                  >
                    <Link href={`/products/${product.slug}`} className="group block">
                      <div className="aspect-square rounded-2xl overflow-hidden bg-[#d8d8d8] mb-3 relative">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#c8c8c8]" />
                        )}
                        {product.stock === 0 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[1px]">
                            <span className="bg-black/80 border border-white/20 text-white text-[10px] font-semibold px-3 py-1 rounded-full tracking-wider uppercase">
                              Дууссан
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="text-white/85 text-sm font-medium leading-snug mb-0.5 truncate">
                        {product.name}
                      </p>
                      <p className="text-white/40 text-sm">
                        {product.price.toLocaleString()}₮
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href={`/products?category=${section.slug}`}
                  className="text-xs text-white/30 hover:text-white/70 transition-colors uppercase tracking-[0.2em] font-medium"
                >
                  Бүгдийг харах →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
