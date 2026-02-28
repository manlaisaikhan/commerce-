"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QPayQRProps {
  orderId: string;
  qrImage: string;
  urls: Array<{ name: string; logo: string; link: string }>;
  amount: number;
  onSuccess: () => void;
}

export function QPayQR({ orderId, qrImage, urls, amount, onSuccess }: QPayQRProps) {
  const [status, setStatus] = useState<"pending" | "checking" | "paid">("pending");

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        setStatus("checking");
        const res = await fetch(`/api/qpay/status?orderId=${orderId}`);
        const data = await res.json();

        if (data.paid) {
          setStatus("paid");
          clearInterval(interval);
          setTimeout(onSuccess, 2000);
        } else {
          setStatus("pending");
        }
      } catch {
        setStatus("pending");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId, onSuccess]);

  if (status === "paid") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 gap-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <CheckCircle size={64} className="text-green-500" />
        </motion.div>
        <h3 className="text-2xl font-bold">Төлбөр амжилттай!</h3>
        <p className="text-muted-foreground">Таны захиалга баталгаажлаа</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6"
    >
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">QPay-ээр төлөх</h3>
        <p className="text-2xl font-bold">{amount.toLocaleString()}₮</p>
      </div>

      {/* QR Code */}
      {qrImage ? (
        <div className="bg-white p-6 rounded-2xl">
          <img
            src={`data:image/png;base64,${qrImage}`}
            alt="QPay QR Code"
            className="w-64 h-64"
          />
        </div>
      ) : (
        <div className="w-64 h-64 bg-muted rounded-2xl flex items-center justify-center">
          <QrCode size={64} className="text-muted-foreground" />
        </div>
      )}

      {/* Bank links */}
      {urls.length > 0 && (
        <div className="w-full">
          <p className="text-sm text-muted-foreground text-center mb-3">
            Банкны апп-аар төлөх
          </p>
          <div className="grid grid-cols-4 gap-3">
            {urls.slice(0, 8).map((url) => (
              <a
                key={url.name}
                href={url.link}
                className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-muted transition-colors"
              >
                {url.logo && (
                  <img src={url.logo} alt={url.name} className="w-10 h-10 rounded-lg" />
                )}
                <span className="text-[10px] text-muted-foreground text-center truncate w-full">
                  {url.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 size={14} className="animate-spin" />
        <span>Төлбөр хүлээж байна...</span>
      </div>

      <Button variant="outline" className="rounded-xl" asChild>
        <a href="/orders">Дараа төлөх</a>
      </Button>
    </motion.div>
  );
}
