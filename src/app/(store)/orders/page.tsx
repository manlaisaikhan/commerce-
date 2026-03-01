"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    size: string | null;
    product: { name: string; images: string[] };
  }>;
  payment: { status: string } | null;
}

const statusMap: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  PENDING: { label: "Хүлээгдэж буй", icon: <Clock size={14} />, color: "bg-yellow-500/20 text-yellow-400" },
  PAID: { label: "Төлөгдсөн", icon: <CheckCircle size={14} />, color: "bg-green-500/20 text-green-400" },
  PROCESSING: { label: "Бэлдэж байна", icon: <Package size={14} />, color: "bg-blue-500/20 text-blue-400" },
  SHIPPED: { label: "Хүргэлтэнд", icon: <Truck size={14} />, color: "bg-purple-500/20 text-purple-400" },
  DELIVERED: { label: "Хүргэгдсэн", icon: <CheckCircle size={14} />, color: "bg-green-500/20 text-green-400" },
  CANCELLED: { label: "Цуцлагдсан", icon: <XCircle size={14} />, color: "bg-red-500/20 text-red-400" },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-10 pb-16 px-4 animate-page-enter">
      <div className="max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-bold tracking-tight mb-10">
          Миний захиалгууд
        </motion.h1>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center py-24 gap-4 text-white/40">
            <p className="text-lg">Нэвтрэх шаардлагатай</p>
            <a href="/auth/login" className="bg-white text-black px-6 py-2.5 text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors">
              Нэвтрэх
            </a>
          </div>
        ) : orders.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-24 gap-4 text-white/40">
            <Package size={64} strokeWidth={0.5} />
            <p className="text-lg">Захиалга байхгүй байна</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => {
              const st = statusMap[order.status] || statusMap.PENDING;
              return (
                <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-5 rounded-xl border border-white/10 bg-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-white/30">{new Date(order.createdAt).toLocaleDateString("mn-MN")}</p>
                      <p className="text-sm font-mono text-white/50">#{order.id.slice(-8)}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${st.color}`}>
                      {st.icon}{st.label}
                    </span>
                  </div>
                  <div className="h-px bg-white/10 mb-4" />
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-white/50">
                          {item.product.name}
                          {item.size && (
                            <span className="ml-1.5 text-[10px] bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded font-medium">
                              {item.size}
                            </span>
                          )}
                          {" "}x{item.quantity}
                        </span>
                        <span>{(item.price * item.quantity).toLocaleString()}₮</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 pt-3 border-t border-white/10 font-bold">
                    <span>Нийт</span>
                    <span>{order.total.toLocaleString()}₮</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
