import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

const serviceSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(300).optional(),
  price: z.number().int().positive(),
  duration: z.number().int().positive(),
  category: z.string().min(1),
});

export async function GET() {
  try {
    const all = await db
      .select()
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(desc(services.createdAt));
    return NextResponse.json(all);
  } catch {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = serviceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    await db.insert(services).values({ ...parsed.data, isActive: true });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
