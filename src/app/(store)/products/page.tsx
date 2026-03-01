import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/products/product-filters";

import { Skeleton } from "@/components/ui/skeleton";

interface SearchParams {
  category?: string;
  search?: string;
  sort?: string;
  page?: string;
  featured?: string;
}

async function getProducts(searchParams: SearchParams) {
  const where: Record<string, unknown> = {};

  if (searchParams.category) {
    where.category = { slug: searchParams.category };
  }

  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search, mode: "insensitive" } },
      { description: { contains: searchParams.search, mode: "insensitive" } },
    ];
  }

  if (searchParams.featured === "true") {
    where.featured = true;
  }

  let orderBy: Record<string, string> = { createdAt: "desc" };
  if (searchParams.sort === "price_asc") orderBy = { price: "asc" };
  if (searchParams.sort === "price_desc") orderBy = { price: "desc" };
  if (searchParams.sort === "name") orderBy = { name: "asc" };

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy,
    take: 24,
  });

  return products;
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-square rounded-xl" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(params),
    getCategories(),
  ]);

  const currentCategory = categories.find((c: { slug: string; name: string }) => c.slug === params.category);

  return (
    <div className="pt-8 pb-16 animate-page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <Suspense>
            <ProductFilters categories={categories} />
          </Suspense>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Top bar with sort */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-lg sm:text-xl font-semibold">
                {currentCategory ? currentCategory.name : "Бүх бүтээгдэхүүн"}
              </h1>
            </div>

            <Suspense fallback={<ProductsSkeleton />}>
              <ProductGrid products={products} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

