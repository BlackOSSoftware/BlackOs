import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectDB } from "@/app/lib/mongodb";

type RouteContext = unknown;

export async function PUT(req: Request, context: RouteContext) {
  try {
    const ctx = context as { params?: { id?: string } } | undefined;
    const id = ctx?.params?.id;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const body = await req.json();
    const { _id, ...updateData } = body;

    const { db } = await connectDB(); // ✅ destructure db
    const res = await db.collection("leads").updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    if (res.matchedCount === 0)
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT /api/leads/[id] error:", err);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: RouteContext) {
  try {
    const ctx = context as { params?: { id?: string } } | undefined;
    const id = ctx?.params?.id;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { db } = await connectDB(); // ✅ destructure db
    const res = await db.collection("leads").deleteOne({ _id: new ObjectId(id) });

    if (res.deletedCount === 0)
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/leads/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
