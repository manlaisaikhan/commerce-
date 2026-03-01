"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore, itemKey } from "@/lib/store/cart-store";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { QPayQR } from "./qpay-qr";

const DeliveryMap = dynamic(
  () => import("./delivery-map").then((m) => ({ default: m.DeliveryMap })),
  { ssr: false, loading: () => <div className="w-full h-[280px] sm:h-[320px] rounded-xl bg-[#111] animate-pulse" /> }
);

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const selectedItems = useCartStore((s) => s.selectedItems());
  const selectedTotal = useCartStore((s) => s.selectedTotal());
  const toggleSelect = useCartStore((s) => s.toggleSelect);
  const isSelected = useCartStore((s) => s.isSelected);

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const handleLocationSelect = useCallback((_lat: number, _lng: number, addr: string) => {
    setAddress(addr);
  }, []);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [qpayData, setQpayData] = useState<{
    qrImage: string;
    urls: Array<{ name: string; logo: string; link: string }>;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      toast.error("Бараа сонгоно уу");
      return;
    }

    setLoading(true);

    try {
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: selectedItems.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
            size: i.size,
          })),
          phone,
          address,
          note,
        }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        toast.error(err.error || "Захиалга үүсгэхэд алдаа гарлаа");
        return;
      }

      const order = await orderRes.json();
      setOrderId(order.id);
      clearCart();

      const qpayRes = await fetch("/api/qpay/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id }),
      });

      if (qpayRes.ok) {
        const qpay = await qpayRes.json();
        setQpayData({ qrImage: qpay.qrImage, urls: qpay.urls || [] });
      } else {
        setQpayData({ qrImage: "", urls: [] });
      }
    } catch {
      toast.error("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    toast.success("Төлбөр амжилттай! Баярлалаа!");
    router.push("/orders");
  };

  if (orderId) {
    return (
      <QPayQR
        orderId={orderId}
        qrImage={qpayData?.qrImage ?? ""}
        urls={qpayData?.urls ?? []}
        amount={selectedTotal}
        onSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border border-border rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <p className="text-sm font-medium text-white/70">Захиалах бараа</p>
          <p className="text-xs text-white/30">{selectedItems.length}/{items.length} сонгосон</p>
        </div>
        <div className="divide-y divide-white/5">
          {items.map((item) => {
            const key = itemKey(item);
            const checked = isSelected(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleSelect(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all text-left ${
                  checked ? "bg-violet-500/5" : "opacity-40"
                }`}
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                  checked ? "bg-violet-500 border-violet-500" : "border-white/20"
                }`}>
                  {checked && <Check size={12} className="text-white" />}
                </div>

                {item.product.image && (
                  <img src={item.product.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {item.product.name}
                    {item.size && (
                      <span className="ml-1.5 text-[10px] bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded font-medium">
                        {item.size}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-white/40">x{item.quantity}</p>
                </div>

                <span className="text-sm font-semibold tabular-nums shrink-0">
                  {(item.product.price * item.quantity).toLocaleString()}₮
                </span>
              </button>
            );
          })}
        </div>
        <div className="px-4 py-3 border-t border-border flex justify-between font-bold">
          <span>Нийт</span>
          <span>{selectedTotal.toLocaleString()}₮</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Утасны дугаар</Label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="99001122"
          required
          className="h-12 rounded-xl bg-card/50"
        />
      </div>

      <DeliveryMap onLocationSelect={handleLocationSelect} />

      <div className="space-y-2">
        <Label htmlFor="address">Хүргэлтийн хаяг</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Газрын зураг дээр сонгох эсвэл гараар бичих"
          required
          className="h-12 rounded-xl bg-card/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="note">Нэмэлт мэдээлэл</Label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Орцны код, давхар, нэмэлт чиглүүлэг гэх мэт..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-input bg-card/50 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={loading || selectedItems.length === 0}
        className="w-full h-14 text-base rounded-xl"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 size={18} className="animate-spin" />
            Захиалга үүсгэж байна...
          </span>
        ) : selectedItems.length === 0 ? (
          "Бараа сонгоно уу"
        ) : (
          `${selectedTotal.toLocaleString()}₮ - QPay-ээр төлөх`
        )}
      </Button>
    </form>
  );
}
