import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata = {
  title: "Admin | STORE",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const role = (user?.publicMetadata as { role?: string } | undefined)?.role;

  if (role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen">
      <AdminSidebar />
      <div className="ml-60 min-h-screen p-6">{children}</div>
    </div>
  );
}
