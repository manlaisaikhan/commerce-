"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Clock, CheckCircle, Package, Truck, XCircle, Plus, Search, Trash2,
  ChevronDown, ChevronUp, Phone, MapPin, FileText, CreditCard, ShoppingBag,
} from "lucide-react";
import {
  Sheet, SheetContent, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("@/components/checkout/delivery-map").then((m) => ({ default: m.DeliveryMap })), { ssr: false });

interface Order {
  id: string;
  total: number;
  status: string;
  address: string | null;
  phone: string | null;
  note: string | null;
  createdAt: string;
  userId: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    size: string | null;
    product: { name: string };
  }>;
  payment: { status: string } | null;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  images?: string[];
}

interface OrderItem {
  productId: string;
  productName: string;
  productImage?: string;
  price: number;
  quantity: number;
  size?: string;
}

const statusOptions = [
  { value: "", label: "Бүгд", dot: "" },
  { value: "PENDING", label: "Хүлээгдэж буй", dot: "bg-yellow-400" },
  { value: "PAID", label: "Төлөгдсөн", dot: "bg-green-400" },
  { value: "PROCESSING", label: "Бэлдэж байна", dot: "bg-blue-400" },
  { value: "SHIPPED", label: "Хүргэлтэнд", dot: "bg-purple-400" },
  { value: "DELIVERED", label: "Хүргэгдсэн", dot: "bg-emerald-400" },
  { value: "CANCELLED", label: "Цуцлагдсан", dot: "bg-red-400" },
];

const statusIcons: Record<string, React.ReactNode> = {
  PENDING: <Clock size={12} />,
  PAID: <CheckCircle size={12} />,
  PROCESSING: <Package size={12} />,
  SHIPPED: <Truck size={12} />,
  DELIVERED: <CheckCircle size={12} />,
  CANCELLED: <XCircle size={12} />,
};

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/20 text-yellow-400",
  PAID: "bg-green-500/20 text-green-400",
  PROCESSING: "bg-blue-500/20 text-blue-400",
  SHIPPED: "bg-purple-500/20 text-purple-400",
  DELIVERED: "bg-emerald-500/20 text-emerald-400",
  CANCELLED: "bg-red-500/20 text-red-400",
};

const statusBorderColors: Record<string, string> = {
  PENDING: "border-l-yellow-500",
  PAID: "border-l-green-500",
  PROCESSING: "border-l-blue-500",
  SHIPPED: "border-l-purple-500",
  DELIVERED: "border-l-emerald-500",
  CANCELLED: "border-l-red-500",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);


  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createPhone, setCreatePhone] = useState("");
  const [createAddress, setCreateAddress] = useState("");
  const [createNote, setCreateNote] = useState("");
  const [createStatus, setCreateStatus] = useState("PENDING");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [productSearch, setProductSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [productLoading, setProductLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (filterStatus) params.set("status", filterStatus);
    const res = await fetch(`/api/admin/orders?${params}`);
    const data = await res.json();
    setOrders(data.orders || []);
    setTotalPages(data.pages || 1);
    setLoading(false);
  }, [page, filterStatus]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  useEffect(() => {
    if (!showCreateForm) return;
    setProductLoading(true);
    const params = new URLSearchParams({ limit: "100" });
    if (productSearch) params.set("search", productSearch);
    fetch(`/api/admin/products?${params}`)
      .then((r) => r.json())
      .then((data) => setProducts(data.products || []))
      .finally(() => setProductLoading(false));
  }, [showCreateForm, productSearch]);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchOrders();
  };

  const addProduct = (product: Product, size?: string) => {
    const key = product.id + (size || "");
    const existing = orderItems.find((i) => i.productId === product.id && i.size === size);
    if (existing) {
      setOrderItems(orderItems.map((i) =>
        (i.productId + (i.size || "")) === key ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setOrderItems([...orderItems, {
        productId: product.id,
        productName: product.name,
        productImage: product.images?.[0],
        price: product.price,
        quantity: 1,
        size,
      }]);
    }
  };

  const removeItem = (productId: string) =>
    setOrderItems(orderItems.filter((i) => i.productId !== productId));

  const updateItemQty = (productId: string, qty: number) => {
    if (qty < 1) return;
    setOrderItems(orderItems.map((i) => i.productId === productId ? { ...i, quantity: qty } : i));
  };

  const resetCreateForm = () => {
    setCreatePhone("");
    setCreateAddress("");
    setCreateNote("");
    setCreateStatus("PENDING");
    setOrderItems([]);
    setProductSearch("");
    setShowCreateForm(false);
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (orderItems.length === 0) return;
    setSaving(true);
    await fetch("/api/admin/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: createPhone,
        address: createAddress,
        note: createNote,
        status: createStatus,
        items: orderItems.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
        })),
      }),
    });
    setSaving(false);
    resetCreateForm();
    fetchOrders();
  };

  const orderTotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Захиалга</h1>
          <p className="text-sm text-white/40 mt-1">Захиалгын удирдлага</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors"
        >
          <Plus size={15} /> Захиалга нэмэх
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => { setFilterStatus(opt.value); setPage(1); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterStatus === opt.value
                ? "bg-white text-black"
                : "bg-white/5 text-white/50 hover:bg-white/10"
            }`}
          >
            {opt.dot && (
              <span className={`w-1.5 h-1.5 rounded-full ${filterStatus === opt.value ? "bg-black/50" : opt.dot}`} />
            )}
            {opt.label}
          </button>
        ))}
      </div>


      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[72px] rounded-xl bg-white/5 animate-pulse border-l-4 border-l-white/10" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-white/20">
          <ShoppingBag size={40} strokeWidth={1} className="mb-3" />
          <p className="text-sm">Захиалга олдсонгүй</p>
        </div>
      ) : (
        <div className="space-y-2">
          {orders.map((order) => {
            const isExpanded = expandedId === order.id;
            const borderClass = statusBorderColors[order.status] || "border-l-white/20";

            return (
              <div
                key={order.id}
                className={`rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden border-l-4 ${borderClass}`}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                  className="w-full px-4 py-3.5 flex items-center gap-4 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                    <ShoppingBag size={16} className="text-white/40" />
                  </div>

                  <div className="min-w-[110px]">
                    <p className="font-mono text-sm font-medium">#{order.id.slice(-8)}</p>
                    <p className="text-[11px] text-white/30 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("mn-MN")}
                    </p>
                  </div>

                  <div className="flex-1 hidden sm:block">
                    <p className="text-sm text-white/80">{order.phone || "—"}</p>
                    <p className="text-[11px] text-white/30 mt-0.5">
                      {order.items.length} бараа
                    </p>
                  </div>

                  <div className="flex items-center gap-3 ml-auto">
                    <span className={`hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full ${statusColors[order.status] || ""}`}>
                      {statusIcons[order.status]}
                      {statusOptions.find((s) => s.value === order.status)?.label || order.status}
                    </span>
                    <span className="font-semibold text-sm tabular-nums">
                      {order.total.toLocaleString()}₮
                    </span>
                    {isExpanded
                      ? <ChevronUp size={16} className="text-white/30 shrink-0" />
                      : <ChevronDown size={16} className="text-white/30 shrink-0" />
                    }
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-white/10 px-4 py-4 space-y-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-start gap-2">
                        <Phone size={13} className="text-white/30 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Утас</p>
                          <p className="text-sm">{order.phone || "—"}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin size={13} className="text-white/30 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Хаяг</p>
                          <p className="text-sm">{order.address || "—"}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileText size={13} className="text-white/30 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Тэмдэглэл</p>
                          <p className="text-sm">{order.note || "—"}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CreditCard size={13} className="text-white/30 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Төлбөр</p>
                          <p className="text-sm">{order.payment?.status === "COMPLETED" ? "Төлөгдсөн" : "Хүлээгдэж буй"}</p>
                        </div>
                      </div>
                    </div>


                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Бүтээгдэхүүн</p>
                      <div className="rounded-lg border border-white/5 overflow-hidden">
                        {order.items.map((item, idx) => (
                          <div
                            key={item.id}
                            className={`flex items-center justify-between px-3 py-2.5 text-sm ${idx !== 0 ? "border-t border-white/5" : ""}`}
                          >
                            <span className="text-white/70 flex-1">
                              {item.product.name}
                              {item.size && (
                                <span className="ml-2 text-[10px] bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded font-medium">
                                  {item.size}
                                </span>
                              )}
                            </span>
                            <span className="text-[11px] text-white/30 bg-white/5 px-2 py-0.5 rounded mx-3">
                              x{item.quantity}
                            </span>
                            <span className="tabular-nums text-white/80">
                              {(item.price * item.quantity).toLocaleString()}₮
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-end px-3 py-2.5 border-t border-white/10 bg-white/[0.02]">
                          <span className="text-sm font-semibold tabular-nums">
                            Нийт: {order.total.toLocaleString()}₮
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Төлөв өөрчлөх</p>
                      <div className="flex gap-2 flex-wrap">
                        {statusOptions.filter((s) => s.value).map((s) => {
                          const isActive = order.status === s.value;
                          return (
                            <button
                              key={s.value}
                              onClick={() => !isActive && updateStatus(order.id, s.value)}
                              disabled={isActive}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                isActive
                                  ? `${statusColors[s.value]} cursor-default`
                                  : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                              }`}
                            >
                              {isActive && statusIcons[s.value]}
                              {s.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}


      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm transition-colors ${
                p === page ? "bg-white text-black font-semibold" : "text-white/40 hover:bg-white/10"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}


      <Sheet open={showCreateForm} onOpenChange={(open) => { if (!open) resetCreateForm(); }}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-[480px] bg-[#0f0f0f] border-white/10 p-0 !gap-0 h-[100dvh] overflow-hidden"
        >
          <div className="px-6 pt-6 pb-4 border-b border-white/10 shrink-0">
            <SheetTitle className="text-white text-lg font-semibold">Шинэ захиалга</SheetTitle>
            <SheetDescription className="text-white/40 text-sm">
              Утсаар эсвэл чатаар ирсэн захиалга оруулах
            </SheetDescription>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: "touch" }}>
            <form id="create-order-form" onSubmit={handleCreateOrder} className="px-6 py-5 space-y-5">

              <div className="space-y-4">
                <p className="text-[10px] text-white/30 uppercase tracking-wider">Харилцагчийн мэдээлэл</p>

                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">Утасны дугаар *</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      required
                      value={createPhone}
                      onChange={(e) => setCreatePhone(e.target.value)}
                      placeholder="99001234"
                      className="w-full bg-black border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">Хүргэлтийн хаяг</label>
                  <div className="rounded-lg overflow-hidden border border-white/10 mb-2">
                    <DeliveryMap onLocationSelect={(_lat, _lng, addr) => setCreateAddress(addr)} />
                  </div>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      value={createAddress}
                      onChange={(e) => setCreateAddress(e.target.value)}
                      placeholder="Дүүрэг, хороо, хаяг..."
                      className="w-full bg-black border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">Тэмдэглэл</label>
                  <div className="relative">
                    <FileText size={14} className="absolute left-3 top-3 text-white/30" />
                    <textarea
                      value={createNote}
                      onChange={(e) => setCreateNote(e.target.value)}
                      placeholder="Нэмэлт мэдээлэл..."
                      rows={2}
                      className="w-full bg-black border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">Захиалгын төлөв</label>
                  <select
                    value={createStatus}
                    onChange={(e) => setCreateStatus(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-white/30 transition-colors"
                  >
                    {statusOptions.filter((s) => s.value).map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] text-white/30 uppercase tracking-wider">Бараа нэмэх</p>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Бараа хайх..."
                    className="w-full bg-black border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div className="max-h-52 overflow-y-auto rounded-lg border border-white/5 divide-y divide-white/5">
                  {productLoading ? (
                    <div className="py-6 text-center text-xs text-white/30">Ачаалж байна...</div>
                  ) : products.length === 0 ? (
                    <div className="py-6 text-center text-xs text-white/30">Бараа олдсонгүй</div>
                  ) : (
                    products.map((p) => (
                      <div key={p.id} className="px-3 py-2.5 hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/5 overflow-hidden shrink-0">
                            {p.images?.[0] ? (
                              <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ShoppingBag size={14} className="text-white/20" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white/80 truncate">{p.name}</p>
                            <p className="text-xs text-white/40 tabular-nums">{p.price.toLocaleString()}₮</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => addProduct(p)}
                            className="text-[10px] bg-white/10 hover:bg-white/20 text-white/70 px-2 py-1 rounded transition-colors shrink-0"
                          >
                            Нэмэх
                          </button>
                        </div>
                        <div className="flex gap-1 mt-2 ml-13">
                          {["S","M","L","XL","2XL"].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => addProduct(p, s)}
                              className="text-[10px] px-2 py-1 border border-white/10 rounded hover:bg-violet-500/20 hover:border-violet-500/30 hover:text-violet-300 text-white/40 transition-colors"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {orderItems.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Сонгосон бараанууд</p>
                  <div className="rounded-lg border border-white/10 divide-y divide-white/5 overflow-hidden">
                    {orderItems.map((item, idx) => (
                      <div key={item.productId + (item.size || "") + idx} className="flex items-center gap-3 px-3 py-2.5">
                        <div className="w-8 h-8 rounded bg-white/5 overflow-hidden shrink-0">
                          {item.productImage ? (
                            <img src={item.productImage} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag size={10} className="text-white/20" />
                            </div>
                          )}
                        </div>
                        <span className="flex-1 text-sm text-white/80 truncate">
                          {item.productName}
                          {item.size && (
                            <span className="ml-1.5 text-[10px] bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded font-medium">
                              {item.size}
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-white/30 tabular-nums shrink-0">
                          {item.price.toLocaleString()}₮
                        </span>
                        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden shrink-0">
                          <button
                            type="button"
                            onClick={() => updateItemQty(item.productId, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-white/10 transition-colors text-sm"
                          >
                            −
                          </button>
                          <span className="w-7 text-center text-sm tabular-nums">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateItemQty(item.productId, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-white/10 transition-colors text-sm"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="text-red-400/60 hover:text-red-400 transition-colors p-1 shrink-0"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                    <div className="flex justify-between items-center px-3 py-2.5 bg-white/[0.02]">
                      <span className="text-xs text-white/30">Нийт дүн</span>
                      <span className="text-sm font-semibold tabular-nums">{orderTotal.toLocaleString()}₮</span>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="px-6 py-4 border-t border-white/10 flex gap-3 shrink-0">
            <button
              type="submit"
              form="create-order-form"
              disabled={saving || orderItems.length === 0}
              className="flex-1 bg-white text-black py-2.5 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-40"
            >
              {saving ? "Хадгалж байна..." : "Захиалга үүсгэх"}
            </button>
            <button
              type="button"
              onClick={resetCreateForm}
              className="px-4 py-2.5 rounded-lg text-sm border border-white/10 hover:bg-white/5 transition-colors"
            >
              Цуцлах
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
