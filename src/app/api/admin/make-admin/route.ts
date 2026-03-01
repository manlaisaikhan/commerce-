import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-setup-secret");
  if (!secret || secret !== process.env.CLERK_ADMIN_SETUP_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const client = await clerkClient();

  let targetUserId: string | null = null;

  if (body.email) {
    const users = await client.users.getUserList({ emailAddress: [body.email] });
    if (users.data.length > 0) {
      targetUserId = users.data[0].id;
    }
  } else if (body.userId) {
    targetUserId = body.userId;
  } else {
    const { userId } = await auth();
    targetUserId = userId;
  }

  if (!targetUserId) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await client.users.updateUserMetadata(targetUserId, {
    publicMetadata: { role: "ADMIN" },
  });

  return NextResponse.json({ success: true, userId: targetUserId, role: "ADMIN" });
}
