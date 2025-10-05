import { uploadBase64Image } from "@/app/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { base64 } = await req.json();
    if (!base64) return NextResponse.json({ error: "No image provided" }, { status: 400 });

    const uploaded = await uploadBase64Image(base64);
    return NextResponse.json(uploaded);
  } catch (err: unknown) {
  // Narrow the type safely
  const errorMessage = err instanceof Error ? err.message : "Server error";
  console.error(err);
  return NextResponse.json({ error: errorMessage }, { status: 500 });
}
}
