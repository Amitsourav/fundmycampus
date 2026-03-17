import { NextResponse } from "next/server";

export async function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/documents/:path*", "/notifications/:path*", "/referrals/:path*", "/otp-verify/:path*", "/login", "/signup", "/forgot-password"],
};
