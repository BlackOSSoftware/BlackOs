import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Miner from "@/app/models/miner";
import { MinerZ } from "@/app/lib/validations/minerSehema";

export async function GET() {
    try {
        await connectDB();
        const miners = await Miner.find().sort({ createdAt: -1 });
        return NextResponse.json(miners, { status: 200 });
    } catch (err: unknown) {
        console.error("POST /miner error:", err);
        const errorMessage = err instanceof Error ? err.message : "Server error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        // Validate using Zod
        const parsed = MinerZ.parse(body);

        // Check duplicate id
        const existing = await Miner.findOne({ id: parsed.id });
        if (existing) return NextResponse.json({ error: "ID already exists" }, { status: 409 });

        const newMiner = await Miner.create(parsed);
        return NextResponse.json(newMiner, { status: 201 });
    } catch (err: unknown) {
        console.error("POST /miner error:", err);
        const errorMessage = err instanceof Error ? err.message : "Server error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
