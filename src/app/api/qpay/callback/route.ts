import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    await prisma.payment.update({
      where: { orderId },
      data: {
        status: "COMPLETED",
        paidAt: new Date(),
      },
    });

    await prisma.order.update({
      where: { id: orderId },
      data: { status: "PAID" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("QPay callback error:", error);
    return NextResponse.json({ error: "Callback error" }, { status: 500 });
  }
}
