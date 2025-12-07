// src/middleware.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

export function middleware(req: NextRequest) {
  // read only from cookie (server-side)
  const token = req.cookies.get("token")?.value;

  // DEBUG: temporarily show what middleware sees (remove after testing)
  // console.log("middleware token:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (err) {
    console.log(err)
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
