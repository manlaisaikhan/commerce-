import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [totalProducts, totalOrders, totalCategories, recentOrders, revenue] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.category.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          items: { include: { product: { select: { name: true } } } },
        },
      }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { in: ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"] } },
      }),
    ]);

  return NextResponse.json({
    totalProducts,
    totalOrders,
    totalCategories,
    totalRevenue: revenue._sum.total || 0,
    recentOrders,
  });
}
