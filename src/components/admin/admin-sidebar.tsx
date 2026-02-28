"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FolderTree,
  ArrowLeft,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Хянах самбар", icon: LayoutDashboard },
  { href: "/admin/products", label: "Бүтээгдэхүүн", icon: Package },
  { href: "/admin/orders", label: "Захиалга", icon: ShoppingCart },
  { href: "/admin/categories", label: "Ангилал", icon: FolderTree },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-[#0a0a0a] border-r border-white/10 flex flex-col z-40">
      <div className="p-5 border-b border-white/10">
        <h1 className="text-lg font-bold tracking-tight">ADMIN</h1>
        <p className="text-xs text-white/40 mt-0.5">Удирдлагын самбар</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-white/10 text-white font-medium"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft size={18} />
          Дэлгүүр рүү буцах
        </Link>
      </div>
    </aside>
  );
}
