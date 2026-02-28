"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export function ProductFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const currentCategory = searchParams.get("category") || "";
  const isFeatured = searchParams.get("featured") === "true";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`/products?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams("search", search);
  };

  const clearFilters = () => {
    router.push("/products");
  };

  const hasFilters = currentCategory || isFeatured || searchParams.get("search");

  return (
    <aside className="hidden md:block w-[220px] shrink-0">
      {/* Search */}
      <form onSubmit={handleSearch} className="relative mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Нэрээр хайх..."
          className="w-full bg-transparent border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:border-white/30 placeholder:text-white/30"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
        >
          <Search size={16} />
        </button>
      </form>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider">Ангилал</h3>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors"
            >
              Арилгах <X size={12} />
            </button>
          )}
        </div>
        <ul className="space-y-1">
          <li>
            <Link
              href="/products"
              className={`block py-2 text-sm transition-colors ${
                !currentCategory
                  ? "text-white font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Бүх бүтээгдэхүүн
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/products?category=${cat.slug}`}
                className={`block py-2 text-sm transition-colors ${
                  currentCategory === cat.slug
                    ? "text-white font-semibold"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Other filters */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Бусад</h3>
        <ul className="space-y-2">
          <li>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={searchParams.get("sale") === "true"}
                onChange={(e) => updateParams("sale", e.target.checked ? "true" : "")}
                className="w-4 h-4 rounded border-white/20 bg-transparent accent-white"
              />
              <span className="text-sm text-white/50 group-hover:text-white transition-colors">
                Хямдралтай
              </span>
            </label>
          </li>
          <li>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => updateParams("featured", e.target.checked ? "true" : "")}
                className="w-4 h-4 rounded border-white/20 bg-transparent accent-white"
              />
              <span className="text-sm text-white/50 group-hover:text-white transition-colors">
                Онцлох
              </span>
            </label>
          </li>
        </ul>
      </div>
    </aside>
  );
}
