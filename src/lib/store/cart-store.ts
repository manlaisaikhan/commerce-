"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
  size?: string;
}

function itemKey(item: { product: { id: string }; size?: string }) {
  return item.product.id + (item.size || "");
}

interface CartState {
  items: CartItem[];
  selected: string[];
  addItem: (product: CartProduct, quantity?: number, size?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSelect: (key: string) => void;
  selectAll: () => void;
  clearCart: () => void;
  itemCount: () => number;
  total: () => number;
  selectedTotal: () => number;
  selectedItems: () => CartItem[];
  isSelected: (key: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      selected: [],

      addItem: (product, quantity = 1, size?: string) => {
        const items = get().items;
        const key = product.id + (size || "");
        const existing = items.find((i) => i.product.id === product.id && i.size === size);

        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id && i.size === size
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({
            items: [...items, { product, quantity, size }],
            selected: [...get().selected, key],
          });
        }
      },

      removeItem: (productId) => {
        const removed = get().items.filter((i) => i.product.id === productId);
        const removedKeys = removed.map(itemKey);
        set({
          items: get().items.filter((i) => i.product.id !== productId),
          selected: get().selected.filter((k) => !removedKeys.includes(k)),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        });
      },

      toggleSelect: (key) => {
        const sel = get().selected;
        if (sel.includes(key)) {
          set({ selected: sel.filter((k) => k !== key) });
        } else {
          set({ selected: [...sel, key] });
        }
      },

      selectAll: () => {
        set({ selected: get().items.map(itemKey) });
      },

      clearCart: () => set({ items: [], selected: [] }),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      total: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      selectedTotal: () => {
        const sel = get().selected;
        return get().items
          .filter((i) => sel.includes(itemKey(i)))
          .reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      },

      selectedItems: () => {
        const sel = get().selected;
        return get().items.filter((i) => sel.includes(itemKey(i)));
      },

      isSelected: (key) => get().selected.includes(key),
    }),
    { name: "cart-storage" }
  )
);

export { itemKey };
