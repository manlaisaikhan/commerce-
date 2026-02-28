"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function CartSidebar({ open, onClose }: CartSidebarProps) {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold">Сагс</h2>
              <button onClick={onClose} className="p-1 hover:bg-muted rounded">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p>Сагс хоосон байна</p>
                  <Button variant="outline" onClick={onClose} asChild>
                    <Link href="/products">Дэлгүүр үзэх</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-3 rounded-lg border border-border"
                    >
                      <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                        {item.product.image ? (
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ShoppingBag size={24} className="text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.product.price.toLocaleString()}₮
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-7 h-7 flex items-center justify-center rounded border border-border hover:bg-muted"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center rounded border border-border hover:bg-muted"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="ml-auto text-xs text-muted-foreground hover:text-destructive"
                          >
                            Устгах
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Нийт</span>
                  <span>{total.toLocaleString()}₮</span>
                </div>
                <Button className="w-full h-12 text-base" onClick={onClose} asChild>
                  <Link href="/checkout">Төлбөр төлөх</Link>
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
