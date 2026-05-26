import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { gallery } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";

const gallerySchema = z.object({
  title: z.string().max(100).optional(),
  imageUrl: z.string().url(),
  category: z.string().max(50).optional(),
});

export async function GET() {
  try {
    const all = await db.select().from(gallery).orderBy(desc(gallery.createdAt));
    return NextResponse.json(all);
  } catch {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = gallerySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    await db.insert(gallery).values(parsed.data);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}
