import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtected = createRouteMatcher(["/checkout(.*)", "/orders(.*)", "/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) {
    const { userId } = await auth();
    if (!userId) {
      const loginUrl = new URL("/auth/login", req.url);
      const redirectPath = req.nextUrl.pathname + (req.nextUrl.search || "");
      loginUrl.searchParams.set("redirect_url", redirectPath);
      return NextResponse.redirect(loginUrl);
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
