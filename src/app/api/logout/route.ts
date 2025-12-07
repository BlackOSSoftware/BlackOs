// api/logout
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  (await cookies()).set("token", "", {
    httpOnly: true,
    secure: false,    // match what you used in login
    sameSite: "strict",
    path: "/",
    maxAge: 0
  });
  return NextResponse.json({ success: true });
}
