import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, image } = body;

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\u0400-\u04ff]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const category = await prisma.category.create({
    data: { name, slug, image: image || null },
  });

  return NextResponse.json(category, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, name, image } = body;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const data: Record<string, any> = {};
  if (name) {
    data.name = name;
    data.slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\u0400-\u04ff]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  if (image !== undefined) data.image = image || null;

  const category = await prisma.category.update({
    where: { id },
    data,
  });

  return NextResponse.json(category);
}

export async function DELETE(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const products = await prisma.product.findMany({
    where: { categoryId: id },
    select: { id: true },
  });
  const productIds = products.map((p) => p.id);

  await prisma.$transaction([
    prisma.cartItem.deleteMany({ where: { productId: { in: productIds } } }),
    prisma.orderItem.deleteMany({ where: { productId: { in: productIds } } }),
    prisma.product.deleteMany({ where: { categoryId: id } }),
    prisma.category.delete({ where: { id } }),
  ]);

  return NextResponse.json({ success: true });
}
