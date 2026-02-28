import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { createQPayInvoice } from "@/lib/qpay";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await req.json();

    const order = await prisma.order.findUnique({
      where: { id: orderId, userId },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const description = order.items
      .map((item) => `${item.product.name} x${item.quantity}`)
      .join(", ");

    const invoice = await createQPayInvoice({
      orderId: order.id,
      amount: order.total,
      description,
      callbackUrl: process.env.QPAY_CALLBACK_URL || "",
    });

    await prisma.payment.upsert({
      where: { orderId: order.id },
      update: {
        qpayInvoiceId: invoice.invoice_id,
        qpayQrText: invoice.qr_text,
        amount: order.total,
      },
      create: {
        orderId: order.id,
        qpayInvoiceId: invoice.invoice_id,
        qpayQrText: invoice.qr_text,
        amount: order.total,
      },
    });

    return NextResponse.json({
      invoiceId: invoice.invoice_id,
      qrText: invoice.qr_text,
      qrImage: invoice.qr_image,
      urls: invoice.urls,
    });
  } catch (error) {
    console.error("QPay invoice error:", error);
    return NextResponse.json(
      { error: "QPay invoice үүсгэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}
