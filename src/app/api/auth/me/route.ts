import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ isAdmin: false });

  const user = await currentUser();
  const isAdmin =
    (user?.publicMetadata as { role?: string } | undefined)?.role === "ADMIN";

  return NextResponse.json({ isAdmin });
}
