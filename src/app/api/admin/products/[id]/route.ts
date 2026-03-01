import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { name, description, price, comparePrice, images, sizes, colors, stock, categoryId, featured } = body;

  const data: Record<string, any> = {};
  if (name !== undefined) data.name = name;
  if (description !== undefined) data.description = description || null;
  if (price !== undefined) data.price = parseFloat(price);
  if (comparePrice !== undefined) data.comparePrice = comparePrice ? parseFloat(comparePrice) : null;
  if (images !== undefined) data.images = images;
  if (sizes !== undefined) data.sizes = sizes;
  if (colors !== undefined) data.colors = colors;
  if (stock !== undefined) data.stock = parseInt(stock);
  if (categoryId !== undefined) data.categoryId = categoryId;
  if (featured !== undefined) data.featured = featured;

  const product = await prisma.product.update({
    where: { id },
    data,
  });

  return NextResponse.json(product);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.product.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
