import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  if (!token) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Optionally, you can verify the token here
  // const user = verifyToken(token);
  // if (!user) {
  //   console.log('Invalid token, redirecting to login');
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  console.log("Token found, proceeding to dashboard");
  console.log("Token:", token);
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard",
};
