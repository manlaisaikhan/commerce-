"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus, Check } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface AddToCartBtnProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    stock: number;
  };
  selectedSize?: string | null;
}

export function AddToCartBtn({ product, selectedSize }: AddToCartBtnProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    if (product.stock === 0) return;
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
      },
      quantity,
      selectedSize || undefined
    );
    setAdded(true);
    toast.success(`${product.name} сагсанд нэмэгдлээ`);
    setTimeout(() => setAdded(false), 2000);
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className="space-y-4">
      {/* Quantity selector */}
      <div className="flex items-center border border-white/20 rounded-lg w-fit">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={isOutOfStock}
          className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors disabled:opacity-30"
        >
          <Minus size={16} />
        </button>
        <span className="w-12 text-center font-medium text-sm">{quantity}</span>
        <button
          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
          disabled={isOutOfStock}
          className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors disabled:opacity-30"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Buttons row - mongolz.shop style */}
      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          disabled={isOutOfStock}
          className="flex-1 h-14 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-white/15 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <Check size={18} />
                Нэмэгдлээ
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <ShoppingBag size={18} />
                Сагслах
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {isOutOfStock ? (
          <div className="flex-1 h-14 bg-white/5 text-white/30 text-sm font-semibold rounded-lg flex items-center justify-center cursor-not-allowed">
            Дууссан
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="flex-1 h-14 bg-white text-black text-sm font-semibold rounded-lg flex items-center justify-center hover:bg-white/90 transition-colors"
          >
            Худалдан авах
          </button>
        )}
      </div>
    </div>
  );
}
