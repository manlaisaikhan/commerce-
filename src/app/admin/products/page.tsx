"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Search, ImageIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  comparePrice: number | null;
  stock: number;
  featured: boolean;
  images: string[];
  sizes: string[];
  categoryId: string;
  category: { name: string };
  createdAt: string;
}

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

interface Category {
  id: string;
  name: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    stock: "0",
    categoryId: "",
    featured: false,
    images: [""],
    sizes: [] as string[],
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/products?${params}`);
    const data = await res.json();
    setProducts(data.products || []);
    setTotalPages(data.pages || 1);
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []));
  }, []);

  const resetForm = () => {
    setForm({ name: "", description: "", price: "", comparePrice: "", stock: "0", categoryId: "", featured: false, images: [""], sizes: [] });
    setEditId(null);
    setShowForm(false);
  };

  const openEdit = (p: Product) => {
    setForm({
      name: p.name,
      description: p.description || "",
      price: String(p.price),
      comparePrice: p.comparePrice ? String(p.comparePrice) : "",
      stock: String(p.stock),
      categoryId: p.categoryId,
      featured: p.featured,
      images: p.images.length > 0 ? p.images : [""],
      sizes: p.sizes || [],
    });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      images: form.images.filter(Boolean),
    };

    if (editId) {
      await fetch(`/api/admin/products/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setSaving(false);
    resetForm();
    fetchProducts();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/admin/products/${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    fetchProducts();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Бүтээгдэхүүн</h1>
          <p className="text-sm text-white/40 mt-1">Бүтээгдэхүүний удирдлага</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors"
        >
          <Plus size={16} /> Нэмэх
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Хайх..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-white/30"
        />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-5 rounded-xl border border-white/10 bg-white/5 space-y-4">
          <h2 className="font-semibold">{editId ? "Засварлах" : "Шинэ бүтээгдэхүүн"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Нэр *</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Ангилал *</label>
              <select required value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30">
                <option value="">Сонгох</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Үнэ *</label>
              <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Хуучин үнэ</label>
              <input type="number" value={form.comparePrice} onChange={(e) => setForm({ ...form, comparePrice: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Тоо ширхэг</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30" />
            </div>
            <div className="flex flex-col gap-3 pt-6">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded" />
                <label htmlFor="featured" className="text-sm text-white/70">Онцлох</label>
              </div>
              {editId && (
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="outOfStock" checked={form.stock === "0"} onChange={(e) => setForm({ ...form, stock: e.target.checked ? "0" : "10" })} className="rounded accent-red-500" />
                  <label htmlFor="outOfStock" className="text-sm text-red-400">Дууссан</label>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Тайлбар</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30 resize-none" />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Хэмжээ (хэрэгтэй бол сонгоно)</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    const sizes = form.sizes.includes(size)
                      ? form.sizes.filter((s) => s !== size)
                      : [...form.sizes, size];
                    setForm({ ...form, sizes });
                  }}
                  className={`min-w-11 h-9 px-3 rounded-lg text-sm font-medium border transition-all ${
                    form.sizes.includes(size)
                      ? "bg-white text-black border-white"
                      : "border-white/15 text-white/50 hover:border-white/30"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Зургийн URL</label>
            {form.images.map((img, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={img}
                  onChange={(e) => {
                    const imgs = [...form.images];
                    imgs[i] = e.target.value;
                    setForm({ ...form, images: imgs });
                  }}
                  placeholder="https://..."
                  className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                />
                {form.images.length > 1 && (
                  <button type="button" onClick={() => setForm({ ...form, images: form.images.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-300 px-2">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => setForm({ ...form, images: [...form.images, ""] })} className="text-xs text-white/40 hover:text-white/60">+ Зураг нэмэх</button>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-white text-black px-5 py-2 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-50">
              {saving ? "Хадгалж байна..." : editId ? "Шинэчлэх" : "Нэмэх"}
            </button>
            <button type="button" onClick={resetForm} className="px-5 py-2 rounded-lg text-sm border border-white/10 hover:bg-white/5 transition-colors">
              Цуцлах
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-white/30 text-center py-12">Бүтээгдэхүүн олдсонгүй</p>
      ) : (
        <div className="border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-4 py-3 text-white/50 font-medium">Зураг</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Нэр</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Ангилал</th>
                <th className="text-right px-4 py-3 text-white/50 font-medium">Үнэ</th>
                <th className="text-right px-4 py-3 text-white/50 font-medium">Тоо</th>
                <th className="text-right px-4 py-3 text-white/50 font-medium">Үйлдэл</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    {p.images[0] ? (
                      <img src={p.images[0]} alt="" className="w-10 h-10 rounded object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
                        <ImageIcon size={14} className="text-white/30" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium">{p.name}</span>
                    {p.featured && <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded">Онцлох</span>}
                  </td>
                  <td className="px-4 py-3 text-white/50">{p.category.name}</td>
                  <td className="px-4 py-3 text-right">{p.price.toLocaleString()}₮</td>
                  <td className="px-4 py-3 text-right">
                    {p.stock === 0 ? (
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-medium">Дууссан</span>
                    ) : (
                      <span>{p.stock}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(p)} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Засах">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteId(p.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Устгах">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm transition-colors ${
                p === page ? "bg-white text-black font-semibold" : "hover:bg-white/10"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-[#111] border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Устгах уу?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/50">
              Энэ бүтээгдэхүүнийг устгахад буцаах боломжгүй.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 hover:bg-white/5">Цуцлах</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Устгах
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
