import { getUserSession } from "@api/_helpers/auth-utils";
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

export async function middleware(request: NextRequest, response: NextResponse) {
  const isLoggedIn: boolean = !!request.cookies.get("next-auth.session-token")
    ?.value;

  const absoluteURL = new URL("/", request.nextUrl.origin);

  if (!isLoggedIn && protectedPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (isLoggedIn && authPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(absoluteURL.toString());
  }

  const userSession = await getUserSession(request);
  if (userSession?.email?.length === 0) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}
