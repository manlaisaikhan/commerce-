
"use client";

import { motion } from "framer-motion";
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease },
  },
};

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`/api/products?sort=newest&limit=8`)
      .then((r) => r.json())
      .then((data) => { if (data.products) setProducts(data.products); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
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

      </div>
    </section>
  );
}
