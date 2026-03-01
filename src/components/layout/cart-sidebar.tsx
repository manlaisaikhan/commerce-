"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Check } from "lucide-react";
import { useCartStore, itemKey } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function CartSidebar({ open, onClose }: CartSidebarProps) {
  const items = useCartStore((s) => s.items);
  const selectedTotal = useCartStore((s) => s.selectedTotal());
  const selectedItems = useCartStore((s) => s.selectedItems());
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const toggleSelect = useCartStore((s) => s.toggleSelect);
  const isSelected = useCartStore((s) => s.isSelected);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-border z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-lg font-semibold">Сагс</h2>
                {items.length > 0 && (
                  <p className="text-xs text-muted-foreground">{selectedItems.length}/{items.length} сонгосон</p>
                )}
              </div>
              <button onClick={onClose} className="p-1 hover:bg-muted rounded">
                <X size={20} />
              </button>
            </div>

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
                  {items.map((item) => {
                    const key = itemKey(item);
                    const checked = isSelected(key);
                    return (
                      <motion.div
                        key={key}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className={`flex gap-3 p-3 rounded-lg border transition-all ${
                          checked ? "border-violet-500/30 bg-violet-500/5" : "border-border opacity-50"
                        }`}
                      >
                        <button
                          onClick={() => toggleSelect(key)}
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${
                            checked ? "bg-violet-500 border-violet-500" : "border-white/20"
                          }`}
                        >
                          {checked && <Check size={12} className="text-white" />}
                        </button>

                        <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center overflow-hidden shrink-0">
                          {item.product.image ? (
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                          ) : (
                            <ShoppingBag size={20} className="text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-muted-foreground">{item.product.price.toLocaleString()}₮</p>
                            {item.size && (
                              <span className="text-[10px] bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded font-medium">{item.size}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center rounded border border-border hover:bg-muted"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
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
                    );
                  })}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Нийт</span>
                  <span>{selectedTotal.toLocaleString()}₮</span>
                </div>
                <Button
                  className="w-full h-12 text-base"
                  disabled={selectedItems.length === 0}
                  onClick={selectedItems.length > 0 ? onClose : undefined}
                  asChild={selectedItems.length > 0}
                >
                  {selectedItems.length > 0 ? (
                    <Link href="/checkout">Төлбөр төлөх ({selectedItems.length})</Link>
                  ) : (
                    <span>Бараа сонгоно уу</span>
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
