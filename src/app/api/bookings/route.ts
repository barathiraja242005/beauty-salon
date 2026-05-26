import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().min(1).max(100),
  phone: z.string().min(7).max(20),
  email: z.string().email().optional().or(z.literal("")),
  service: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().min(1),
  notes: z.string().max(500).optional(),
});

export async function GET() {
  try {
    const all = await db.select().from(bookings).orderBy(desc(bookings.createdAt));
    return NextResponse.json(all);
  } catch {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    const { name, phone, email, service, date, time, notes } = parsed.data;
    await db.insert(bookings).values({
      name,
      phone,
      email: email || null,
      serviceName: service,
      date,
      time,
      notes: notes || null,
      status: "pending",
    });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
