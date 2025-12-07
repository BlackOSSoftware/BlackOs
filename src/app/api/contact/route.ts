import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import InquiryModel from "@/app/models/enquaries";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      email,
      phone,
      service,
      message = "",
    }: {
      name: string;
      email: string;
      phone: string;
      service: string;
      message: string;
    } = body;

    // -----------------------
    // VALIDATION
    // -----------------------

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name is required and must be at least 2 characters." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const phoneRegex = /^[6-9]\d{9}$/; // strict Indian mobile format
    if (!phone || !phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          error:
            "Invalid phone number. Must be 10 digits and start with 6, 7, 8, or 9.",
        },
        { status: 400 }
      );
    }

    if (!service || service.length < 2) {
      return NextResponse.json(
        { error: "Service selection is required." },
        { status: 400 }
      );
    }

    // -----------------------
    // READ CLIENT META INFO
    // -----------------------

    const userAgent = req.headers.get("user-agent") ?? "";
    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      "unknown";

    // -----------------------
    // SAVE IN DATABASE
    // -----------------------

    const inquiry = await InquiryModel.create({
      name,
      email,
      phone,
      service,
      message,
      ipAddress: typeof ip === "string" ? ip : "unknown",
      userAgent,
      status: "new",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry submitted successfully.",
        data: inquiry,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
