"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Share2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { AddToCartBtn } from "@/components/products/add-to-cart-btn";
import { ProductCard3D } from "@/components/products/product-card";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  comparePrice: number | null;
  images: string[];
  sizes: string[];
  stock: number;
  category: { name: string; slug: string };
}

interface ProductDetailProps {
  product: Product;
  relatedProducts: Array<Product & { category: { name: string; slug: string } }>;
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const showSizes = product.sizes.length > 0;

  return (
    <div className="pt-6 pb-20 animate-page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/products" className="hover:text-white transition-colors">Бүгд</Link>
          <ChevronRight size={14} />
          <Link
            href={`/products?category=${product.category.slug}`}
            className="hover:text-white transition-colors"
          >
            {product.category.name}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-4"
          >
            {product.images.length > 1 && (
              <div className="hidden sm:flex flex-col gap-2 w-20 shrink-0">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? "border-white opacity-100"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="flex-1 relative">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#e8e8e8] dark:bg-[#1a1a1a]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    {product.images[selectedImage] ? (
                      <img
                        src={product.images[selectedImage]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={80} strokeWidth={0.3} className="text-white/10" />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

              </div>

              {product.images.length > 1 && (
                <div className="flex sm:hidden justify-center gap-2 mt-4">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        selectedImage === i ? "bg-white w-6" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {product.name}
              </h1>
              <button className="shrink-0 p-2 text-white/40 hover:text-white transition-colors">
                <Share2 size={20} />
              </button>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl sm:text-3xl font-bold">
                {product.price.toLocaleString()}₮
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-lg text-white/30 line-through">
                  {product.comparePrice.toLocaleString()}₮
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-sm text-white/50 leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            {showSizes && (
              <div className="mb-8">
                <p className="text-sm font-semibold mb-3">Хэмжээ:</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-12 px-3 border text-sm font-medium transition-all duration-200 rounded-lg ${
                        selectedSize === size
                          ? "bg-white text-black border-white"
                          : "border-white/20 text-white/70 hover:border-white/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <AddToCartBtn
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.images[0] || "",
                stock: product.stock,
              }}
              selectedSize={selectedSize}
            />

            {product.stock > 0 && (
              <div className="mt-6 flex items-center gap-2 text-sm text-white/40">
                <span>🚚</span>
                <span>Хүргэлттэй</span>
              </div>
            )}
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Төстэй бүтээгдэхүүн</h2>
              <Link
                href={`/products?category=${product.category.slug}`}
                className="flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors"
              >
                Цааш үзэх
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                >
                  <ProductCard3D
                    product={{
                      id: p.id,
                      name: p.name,
                      slug: p.slug,
                      price: p.price,
                      comparePrice: p.comparePrice,
                      image: p.images[0] || "",
                      category: p.category?.name,
                      stock: p.stock,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
