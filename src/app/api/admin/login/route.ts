import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const adminHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminHash) {
      return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
    }

    const bcrypt = await import("bcryptjs");
    const valid = await bcrypt.compare(password, adminHash);

    if (!valid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    session.isAdmin = true;
    await session.save();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
