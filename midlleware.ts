import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/",
  "/home",
]);

const isPublicApiRoute = createRouteMatcher(["/api/videos"]);
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const currentUrl = new URL(req.url);
  const isHome = currentUrl.pathname === "/home";
  const isApiReq = currentUrl.pathname.startsWith("/api");

  if (userId && isPublicRoute(req) && !isHome) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  //   not logedin

  if (!userId) {
    if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/singn-in", req.url));
    }
    if (isApiReq && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
