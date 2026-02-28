"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <select
      value={currentSort}
      onChange={handleChange}
      className="bg-[#111] border border-white/10 text-white/70 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-white/30 cursor-pointer"
    >
      <option value="">Шинэ нь эхэндээ</option>
      <option value="price_asc">Үнэ: Бага → Их</option>
      <option value="price_desc">Үнэ: Их → Бага</option>
      <option value="name">Нэрээр</option>
    </select>
  );
}
