import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/wishlist",
  "/orders",
  "/profile",
  "/addresses",
  "/checkout",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtected) return NextResponse.next();

  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  // نه access نه refresh — redirect به لاگین
  if (!accessToken && !refreshToken) {
    return redirectToLogin(req, pathname);
  }

  // access نیست ولی refresh هست — سعی کن refresh کنی
  if (!accessToken && refreshToken) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!res.ok) return redirectToLogin(req, pathname);

      const data = await res.json();
      const response = NextResponse.next();
      response.cookies.set("access_token", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 15, // 15 دقیقه
      });
      return response;
    } catch {
      return redirectToLogin(req, pathname);
    }
  }

  return NextResponse.next();
}

function redirectToLogin(req: NextRequest, pathname: string) {
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("message", "برای ادامه باید وارد حساب کاربری شوید");
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/wishlist/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/addresses/:path*",
    "/checkout/:path*",
  ],
};
