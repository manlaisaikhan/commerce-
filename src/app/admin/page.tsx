"use client";

import { useEffect, useState } from "react";
import {
  Package,
  ShoppingCart,
  FolderTree,
  TrendingUp,
  Clock,
} from "lucide-react";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
  recentOrders: Array<{
    id: string;
    total: number;
    status: string;
    createdAt: string;
    userId: string;
    phone: string | null;
  }>;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/20 text-yellow-400",
  PAID: "bg-green-500/20 text-green-400",
  PROCESSING: "bg-blue-500/20 text-blue-400",
  SHIPPED: "bg-purple-500/20 text-purple-400",
  DELIVERED: "bg-green-500/20 text-green-400",
  CANCELLED: "bg-red-500/20 text-red-400",
};

const statusLabels: Record<string, string> = {
  PENDING: "Хүлээгдэж буй",
  PAID: "Төлөгдсөн",
  PROCESSING: "Бэлдэж байна",
  SHIPPED: "Хүргэлтэнд",
  DELIVERED: "Хүргэгдсэн",
  CANCELLED: "Цуцлагдсан",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-white/5 rounded animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return <p className="text-white/40">Алдаа гарлаа</p>;

  const cards = [
    { label: "Бүтээгдэхүүн", value: stats.totalProducts, icon: Package, color: "text-blue-400" },
    { label: "Захиалга", value: stats.totalOrders, icon: ShoppingCart, color: "text-green-400" },
    { label: "Ангилал", value: stats.totalCategories, icon: FolderTree, color: "text-orange-400" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Хянах самбар</h1>
        <p className="text-sm text-white/40 mt-1">Ерөнхий мэдээлэл</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="p-5 rounded-xl border border-white/10 bg-white/5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/50">{card.label}</span>
              <card.icon size={18} className={card.color} />
            </div>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-xl border border-white/10 bg-white/5">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={18} className="text-green-400" />
          <span className="text-sm text-white/50">Нийт орлого</span>
        </div>
        <p className="text-3xl font-bold">
          {stats.totalRevenue.toLocaleString()}₮
        </p>
      </div>

      <div className="p-5 rounded-xl border border-white/10 bg-white/5">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={18} className="text-white/50" />
          <h2 className="font-semibold">Сүүлийн захиалгууд</h2>
        </div>
        {stats.recentOrders.length === 0 ? (
          <p className="text-white/30 text-sm">Захиалга байхгүй</p>
        ) : (
          <div className="space-y-3">
            {stats.recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium">
                    {order.phone || order.userId.slice(-8)}
                  </p>
                  <p className="text-xs text-white/30">
                    {new Date(order.createdAt).toLocaleDateString("mn-MN")} · #{order.id.slice(-6)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full ${
                      statusColors[order.status] || statusColors.PENDING
                    }`}
                  >
                    {statusLabels[order.status] || order.status}
                  </span>
                  <span className="text-sm font-medium w-24 text-right">
                    {order.total.toLocaleString()}₮
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
