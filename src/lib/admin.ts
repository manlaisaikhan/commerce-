import { auth, currentUser } from "@clerk/nextjs/server";

export async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();
  const role = (user?.publicMetadata as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") return null;

  return { userId };
}
