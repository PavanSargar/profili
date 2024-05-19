import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

const protectedPages = [
  "/dashboard",
  "/dashboard/appearance",
  "/dashboard/settings",
  "/dashboard/analytics",
  "/dashboard/my-account",
  "/dashboard/links",
];
const authPages = ["/login", "/register", "/forgot-password"];

const protectedApiRoutes = ["/api/link"];

export async function middleware(request: NextRequest, response: NextResponse) {
  const isLoggedIn: boolean = !!request.cookies.get("next-auth.session-token")
    ?.value;

  if (!isLoggedIn && protectedPages.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (isLoggedIn && authPages.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  //TODO: use this for api middlewares
  // await isAuthenticated(request);

  return NextResponse.next();
}
