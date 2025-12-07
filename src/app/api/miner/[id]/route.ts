import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../app/lib/mongodb";
import Miner from "../../../../app/models/miner";
import { MinerZ } from "@/app/lib/validations/minerSehema";

// Correct typing for context parameter
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectDB();
    const miner = await Miner.findOne({ id });
    if (!miner) {
      return NextResponse.json({ error: "Miner not found" }, { status: 404 });
    }
    return NextResponse.json(miner, { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Server error";
    console.error(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectDB();
    const body = await req.json();
    const parsed = MinerZ.partial().parse(body);

    const updated = await Miner.findOneAndUpdate({ id }, { $set: parsed }, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Miner not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Server error";
    console.error(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectDB();
    const miner = await Miner.findOne({ id });
    if (!miner) {
      return NextResponse.json({ error: "Miner not found" }, { status: 404 });
    }

    await Miner.deleteOne({ id });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Server error";
    console.error(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
