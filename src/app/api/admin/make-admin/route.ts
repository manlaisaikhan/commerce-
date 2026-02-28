import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

// One-time setup endpoint: makes the currently logged-in user an ADMIN.
// Protected by CLERK_ADMIN_SETUP_SECRET env variable.
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-setup-secret");
  if (!secret || secret !== process.env.CLERK_ADMIN_SETUP_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { role: "ADMIN" },
  });

  return NextResponse.json({ success: true, userId, role: "ADMIN" });
}
