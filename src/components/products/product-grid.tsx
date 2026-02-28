"use client";

import { motion } from "framer-motion";
import { ProductCard3D } from "./product-card";
import { PackageX } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  stock: number;
  category: { name: string; slug: string };
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-white/40">
        <PackageX size={48} strokeWidth={1} className="mb-4" />
        <p className="text-lg font-medium">Бүтээгдэхүүн олдсонгүй</p>
        <p className="text-sm mt-1">Өөр хайлтаар оролдоно уу</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <ProductCard3D
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              comparePrice: product.comparePrice,
              image: product.images[0] || "",
              category: product.category?.name,
              stock: product.stock,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
