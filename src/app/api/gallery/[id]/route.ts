import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { gallery } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(gallery).where(eq(gallery.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
