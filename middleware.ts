import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/wishlist",
  "/orders",
  "/profile",
  "/addresses",
  "/checkout",
  "/account",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtected) return NextResponse.next();

  const url = `${process.env.INTERNAL_API_URL}/users/me`;
  console.log("Middleware URL:", url);
  console.log("Cookie:", req.headers.get("cookie"));

  try {
    const res = await fetch(url, {
      headers: {
        Cookie: req.headers.get("cookie") ?? "",
      },
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      return redirectToLogin(req, pathname);
    }

    return NextResponse.next();
  } catch (e) {
    console.log("Fetch error:", e);
    return redirectToLogin(req, pathname);
  }
}
function redirectToLogin(req: NextRequest, pathname: string): NextResponse {
  const loginUrl = new URL("/login", req.url);

  loginUrl.search = `message=${encodeURIComponent(
    "برای ادامه باید وارد حساب کاربری شوید",
  )}&redirect=${pathname.replace(/^\/+/, "")}`;

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/wishlist/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/addresses/:path*",
    "/checkout/:path*",
    "/account/:path*",
  ],
};
