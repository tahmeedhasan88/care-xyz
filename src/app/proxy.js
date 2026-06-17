import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoute = ["/serviceDetails", "/booking", "/my-bookings"];

export async function middleware(req) {
  const token = await getToken({ req });
  const isAuthenticated = Boolean(token);

  const isPrivateReq = privateRoute.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!isAuthenticated && isPrivateReq) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/serviceDetails/:path*",
    "/booking/:path*",
    "/my-bookings/:path*",
  ],
};