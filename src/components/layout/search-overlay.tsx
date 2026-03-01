"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: { name: string };
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(q)}&limit=6`);
      const data = await res.json();
      setResults(data.products || []);
    } catch { setResults([]); }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!open) { setQuery(""); setResults([]); return; }
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    const t = setTimeout(() => search(query), 300);
    return () => clearTimeout(t);
  }, [query, search]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const go = (slug: string) => {
    onClose();
    router.push(`/products/${slug}`);
  };

  const goAll = () => {
    onClose();
    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 inset-x-0 z-[61] bg-[#111] border-b border-white/10 shadow-2xl"
          >
            <div className="max-w-2xl mx-auto px-4 py-4">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && query.trim() && goAll()}
                  placeholder="Бүтээгдэхүүн хайх..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-10 py-3 text-white text-sm focus:outline-none focus:border-white/25 placeholder:text-white/30"
                />
                <button onClick={onClose} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              {loading && (
                <div className="flex justify-center py-6">
                  <Loader2 size={20} className="animate-spin text-white/40" />
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="mt-3 space-y-1 max-h-[50vh] overflow-y-auto">
                  {results.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => go(p.slug)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                    >
                      <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] overflow-hidden shrink-0">
                        {p.images[0] && (
                          <img src={p.images[0]} alt="" className="w-full h-full object-cover" loading="lazy" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white truncate">{p.name}</p>
                        <p className="text-xs text-white/40">{p.category?.name}</p>
                      </div>
                      <p className="text-sm font-bold text-white/70 shrink-0">{p.price.toLocaleString()}₮</p>
                    </button>
                  ))}
                  <button
                    onClick={goAll}
                    className="w-full py-2.5 text-center text-sm text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Бүгдийг харах →
                  </button>
                </div>
              )}

              {!loading && query.trim() && results.length === 0 && (
                <p className="text-center text-sm text-white/30 py-6">Олдсонгүй</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
