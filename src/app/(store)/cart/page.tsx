"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, Check } from "lucide-react";
import { useCartStore, itemKey } from "@/lib/store/cart-store";
import Link from "next/link";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const selectedTotal = useCartStore((s) => s.selectedTotal());
  const selectedItems = useCartStore((s) => s.selectedItems());
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const toggleSelect = useCartStore((s) => s.toggleSelect);
  const selectAll = useCartStore((s) => s.selectAll);
  const isSelected = useCartStore((s) => s.isSelected);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="pt-10 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="h-10 w-32 bg-white/5 rounded animate-pulse mb-10" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const allSelected = items.length > 0 && selectedItems.length === items.length;

  return (
    <div className="pt-10 pb-16 px-4 animate-page-enter">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold tracking-tight mb-10"
        >
          Сагс
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-6"
          >
            <ShoppingBag size={64} strokeWidth={0.5} className="text-white/20" />
            <h2 className="text-xl font-semibold">Сагс хоосон байна</h2>
            <p className="text-white/40">Дэлгүүрээс бүтээгдэхүүн нэмнэ үү</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 text-sm font-semibold hover:bg-white/90 transition-colors rounded-lg"
            >
              Дэлгүүр үзэх
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => allSelected ? items.forEach((i) => toggleSelect(itemKey(i))) : selectAll()}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                    allSelected ? "bg-violet-500 border-violet-500" : "border-white/20"
                  }`}>
                    {allSelected && <Check size={12} className="text-white" />}
                  </div>
                  Бүгд сонгох
                </button>
                <span className="text-xs text-white/30">{selectedItems.length}/{items.length} сонгосон</span>
              </div>

              {items.map((item, i) => {
                const key = itemKey(item);
                const checked = isSelected(key);
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex gap-4 p-4 rounded-xl border transition-all ${
                      checked ? "border-violet-500/30 bg-violet-500/5" : "border-white/10 bg-white/5 opacity-50"
                    }`}
                  >
                    <button
                      onClick={() => toggleSelect(key)}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-2 transition-colors ${
                        checked ? "bg-violet-500 border-violet-500" : "border-white/20"
                      }`}
                    >
                      {checked && <Check size={12} className="text-white" />}
                    </button>

                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-[#1a1a1a] overflow-hidden shrink-0">
                      {item.product.image ? (
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag size={28} strokeWidth={1} className="text-white/15" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.product.id}`} className="font-semibold text-sm hover:underline truncate block">
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-lg font-bold">{item.product.price.toLocaleString()}₮</p>
                        {item.size && (
                          <span className="text-[10px] bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded font-medium">{item.size}</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-white/15 rounded-lg overflow-hidden">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.product.id)} className="p-2 text-white/30 hover:text-red-400 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <button onClick={clearCart} className="text-sm text-white/30 hover:text-red-400 transition-colors mt-2">
                Сагс хоослох
              </button>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-xl border border-white/10 bg-white/5 space-y-4">
                <h2 className="text-lg font-semibold">Захиалгын мэдээлэл</h2>
                <div className="space-y-2 text-sm">
                  {selectedItems.map((item) => (
                    <div key={itemKey(item)} className="flex justify-between">
                      <span className="text-white/50 truncate mr-2">
                        {item.product.name}{item.size && ` (${item.size})`} x{item.quantity}
                      </span>
                      <span>{(item.product.price * item.quantity).toLocaleString()}₮</span>
                    </div>
                  ))}
                  {selectedItems.length === 0 && (
                    <p className="text-white/30 text-center py-4">Бараа сонгоно уу</p>
                  )}
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Нийт</span>
                  <span>{selectedTotal.toLocaleString()}₮</span>
                </div>
                {selectedItems.length > 0 ? (
                  <Link href="/checkout" className="w-full bg-white text-black text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-white/90 transition-colors py-3.5">
                    Төлбөр төлөх ({selectedItems.length}) <ArrowRight size={16} />
                  </Link>
                ) : (
                  <div className="w-full bg-white/10 text-white/30 text-sm font-semibold rounded-lg flex items-center justify-center py-3.5 cursor-not-allowed">
                    Бараа сонгоно уу
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
