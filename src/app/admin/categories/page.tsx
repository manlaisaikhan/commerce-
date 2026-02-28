"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
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

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  _count: { products: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", image: "" });

  const fetchCategories = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setForm({ name: "", image: "" });
    setEditId(null);
    setShowForm(false);
  };

  const openEdit = (c: Category) => {
    setForm({ name: c.name, image: c.image || "" });
    setEditId(c.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editId) {
      await fetch("/api/admin/categories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, ...form }),
      });
    } else {
      await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setSaving(false);
    resetForm();
    fetchCategories();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/admin/categories?id=${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ангилал</h1>
          <p className="text-sm text-white/40 mt-1">Ангилалын удирдлага</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors"
        >
          <Plus size={16} /> Нэмэх
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-5 rounded-xl border border-white/10 bg-white/5 space-y-4">
          <h2 className="font-semibold">{editId ? "Засварлах" : "Шинэ ангилал"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Нэр *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Зургийн URL</label>
              <input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
                className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30"
              />
            </div>
          </div>
          <div className="flex gap-3">
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
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <p className="text-white/30 text-center py-12">Ангилал байхгүй</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => (
            <div key={c.id} className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {c.image ? (
                  <img src={c.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-white/10" />
                )}
                <div>
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs text-white/40">{c._count.products} бүтээгдэхүүн</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(c)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => setDeleteId(c.id)}
                  disabled={c._count.products > 0}
                  className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title={c._count.products > 0 ? "Бүтээгдэхүүнтэй ангилалыг устгах боломжгүй" : "Устгах"}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-[#111] border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Устгах уу?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/50">
              Энэ ангилалыг устгахад буцаах боломжгүй.
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
