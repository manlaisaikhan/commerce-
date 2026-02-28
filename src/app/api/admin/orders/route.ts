import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const status = searchParams.get("status") || "";
  const limit = 20;

  const where = status ? { status: status as never } : {};

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        items: {
          include: { product: { select: { name: true, images: true } } },
        },
        payment: true,
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.order.count({ where }),
  ]);

  return NextResponse.json({ orders, total, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { phone, address, note, status, items } = body;

  if (!phone || !items || items.length === 0) {
    return NextResponse.json({ error: "Утас болон бараа шаардлагатай" }, { status: 400 });
  }

  const total = items.reduce(
    (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      userId: "admin-manual",
      phone,
      address: address || null,
      note: note || null,
      total,
      status: status || "PENDING",
      items: {
        create: items.map((item: { productId: string; quantity: number; price: number }) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      items: { include: { product: { select: { name: true } } } },
      payment: true,
    },
  });

  return NextResponse.json(order, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(order);
}
