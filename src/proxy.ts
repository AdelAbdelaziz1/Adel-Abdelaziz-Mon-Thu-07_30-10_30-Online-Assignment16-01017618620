import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  const isAuthPages = pathname === "/login" || pathname === "/register";

  if (token && isAuthPages) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !isAuthPages) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/brands",
    "/cart",
    "/wishlist",
    "/login",
    "/register",
    "/checkout",
    "/account",
    "/allorders",
    "/account/:path*",
  ],
};