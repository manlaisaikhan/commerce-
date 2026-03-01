"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/store/cart-store";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { QPayQR } from "./qpay-qr";

const DeliveryMap = dynamic(
  () => import("./delivery-map").then((m) => ({ default: m.DeliveryMap })),
  { ssr: false, loading: () => <div className="w-full h-[280px] sm:h-[320px] rounded-xl bg-[#111] animate-pulse" /> }
);

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());
  const clearCart = useCartStore((s) => s.clearCart);

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

    if (items.length === 0) {
      toast.error("Сагс хоосон байна");
      return;
    }

    setLoading(true);

    try {
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
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
        amount={total}
        onSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="border-t border-border pt-6 space-y-3">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {item.product.name}{item.size && ` (${item.size})`} x{item.quantity}
            </span>
            <span>{(item.product.price * item.quantity).toLocaleString()}₮</span>
          </div>
        ))}
        <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
          <span>Нийт</span>
          <span>{total.toLocaleString()}₮</span>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading || items.length === 0}
        className="w-full h-14 text-base rounded-xl"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 size={18} className="animate-spin" />
            Захиалга үүсгэж байна...
          </span>
        ) : (
          `${total.toLocaleString()}₮ - QPay-ээр төлөх`
        )}
      </Button>
    </form>
  );
}
