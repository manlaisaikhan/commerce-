"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Plus, Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { toast } from "sonner";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice?: number | null;
    image?: string;
    category?: string;
    stock?: number;
  };
}

export function ProductCard3D({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (adding) return;
    setAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image || "",
    });
    toast.success(`${product.name} сагсанд нэмэгдлээ`);
    setTimeout(() => setAdding(false), 500);
  };

  const isOutOfStock = product.stock === 0;
  const discountPct =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
      : null;

  return (
    <Link href={`/products/${product.id}`} className="group block">
      {/* Image container */}
      <div className="relative overflow-hidden rounded-xl bg-[#1a1a1a]">
        <div className="relative aspect-square overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag size={48} strokeWidth={0.8} className="text-neutral-600" />
            </div>
          )}

          {/* Dark overlay on hover for text contrast */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

          {/* Out of stock */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[1px]">
              <span className="bg-black/80 border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-wider uppercase">
                Дууссан
              </span>
            </div>
          )}

          {/* Discount badge */}
          {discountPct && (
            <div className="absolute top-3 left-3">
              <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                −{discountPct}%
              </span>
            </div>
          )}

          {/* Quick add */}
          {!isOutOfStock && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 flex items-center gap-2 bg-white text-black rounded-full pl-3 pr-3 py-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-white/90 text-[11px] font-bold uppercase tracking-wide whitespace-nowrap"
            >
              {adding ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} strokeWidth={2.5} />}
              {adding ? "..." : "Сагсанд"}
            </button>
          )}
        </div>
      </div>

      {/* Product info */}
      <div className="mt-3 space-y-1">
        {product.category && (
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">
            {product.category}
          </p>
        )}
        <h3 className="text-sm font-semibold truncate leading-snug">{product.name}</h3>
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold">
            {product.price.toLocaleString()}₮
          </p>
          {product.comparePrice && product.comparePrice > product.price && (
            <p className="text-xs text-white/30 line-through">
              {product.comparePrice.toLocaleString()}₮
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
