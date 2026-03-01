import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { sendNewOrderEmail } from "@/lib/email";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { product: true } },
        payment: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, address, phone, note } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Сагс хоосон байна" }, { status: 400 });
    }

    const productIds = items.map((i: { productId: string }) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const total = items.reduce(
      (sum: number, item: { productId: string; quantity: number }) => {
        const product = products.find((p) => p.id === item.productId);
        return sum + (product?.price || 0) * item.quantity;
      },
      0
    );

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        address,
        phone,
        note,
        items: {
          create: items.map(
            (item: { productId: string; quantity: number; size?: string }) => {
              const product = products.find((p) => p.id === item.productId);
              return {
                productId: item.productId,
                quantity: item.quantity,
                price: product?.price || 0,
                size: item.size || null,
              };
            }
          ),
        },
      },
      include: {
        items: { include: { product: true } },
      },
    });

    sendNewOrderEmail({
      orderId: order.id,
      total: order.total,
      phone,
      address,
      note,
      items: order.items,
    }).catch(() => {});

    return NextResponse.json(order);
  } catch {
    return NextResponse.json(
      { error: "Захиалга үүсгэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}
