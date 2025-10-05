// src/app/api/leads/route.ts
import { connectDB } from "@/app/lib/mongodb";
import Lead from "@/app/models/Lead";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return NextResponse.json(leads || []);
  } catch (err) {
    console.error("GET /api/leads error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

import type { Db } from "mongodb"; // ✅ brings the correct type

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.name || !body?.phone) {
      return NextResponse.json(
        { error: "Name and phone required" },
        { status: 400 }
      );
    }

    const { db } = await connectDB();
    const database = db as unknown as Db; // ✅ avoids "any" but keeps type safety

    const result = await database.collection("leads").insertOne({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { _id: result.insertedId, ...body },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/leads error:", err);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}

