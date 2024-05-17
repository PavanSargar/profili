import { NextRequest, NextResponse } from "next/server";
const protectedRoutes = ["/profile", "/appearance", "/seo"];

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest, response: NextResponse) {
  const isLoggedIn: boolean = !!request.cookies.get("next-auth.session-token")
    ?.value;
    
  if (!isLoggedIn && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}
