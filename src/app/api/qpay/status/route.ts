import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { checkQPayPayment } from "@/lib/qpay";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const payment = await prisma.payment.findUnique({
      where: { orderId },
    });

    if (!payment?.qpayInvoiceId) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    if (payment.status === "COMPLETED") {
      return NextResponse.json({ status: "COMPLETED", paid: true });
    }

    const result = await checkQPayPayment(payment.qpayInvoiceId);

    if (result.count > 0) {
      await prisma.payment.update({
        where: { orderId },
        data: { status: "COMPLETED", paidAt: new Date() },
      });

      await prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID" },
      });

      return NextResponse.json({ status: "COMPLETED", paid: true });
    }

    return NextResponse.json({ status: "PENDING", paid: false });
  } catch (error) {
    console.error("QPay status check error:", error);
    return NextResponse.json({ error: "Status check failed" }, { status: 500 });
  }
}
