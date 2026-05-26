export const dynamic = "force-dynamic";

import Link from "next/link";
import { CalendarCheck, Scissors, ImageIcon, Clock } from "lucide-react";

async function getDashboardData() {
  try {
    const { db } = await import("@/lib/db");
    const { bookings, services, gallery } = await import("@/lib/db/schema");
    const { desc, eq, count } = await import("drizzle-orm");

    const [allBookings, activeServices, galleryCount] = await Promise.all([
      db.select().from(bookings).orderBy(desc(bookings.createdAt)).limit(5),
      db.select({ count: count() }).from(services).where(eq(services.isActive, true)),
      db.select({ count: count() }).from(gallery),
    ]);

    const todayStr = new Date().toISOString().split("T")[0];
    const todayCount = allBookings.filter((b) => b.date === todayStr).length;

    return {
      allBookings,
      todayCount,
      totalBookings: allBookings.length,
      activeServices: activeServices[0]?.count ?? 0,
      galleryItems: galleryCount[0]?.count ?? 0,
      error: null,
    };
  } catch {
    return {
      allBookings: [],
      todayCount: 0,
      totalBookings: 0,
      activeServices: 0,
      galleryItems: 0,
      error: "Database not connected. Set TURSO_DATABASE_URL in .env.local",
    };
  }
}

const statusColors: Record<string, string> = {
  pending:   "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default async function AdminDashboard() {
  const data = await getDashboardData();

  const stats = [
    { label: "Today's Bookings", value: data.todayCount,      icon: CalendarCheck, color: "bg-orange-100 text-orange-600" },
    { label: "Total Bookings",   value: data.totalBookings,   icon: Clock,         color: "bg-blue-100 text-blue-600" },
    { label: "Active Services",  value: data.activeServices,  icon: Scissors,      color: "bg-emerald-100 text-emerald-600" },
    { label: "Gallery Items",    value: data.galleryItems,    icon: ImageIcon,     color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Dashboard
      </h1>

      {data.error && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 text-sm">
          <strong>Setup required:</strong> {data.error}
          <p className="mt-1 text-xs text-amber-600">Copy <code>.env.local.example</code> → <code>.env.local</code> and fill in your Turso credentials.</p>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer">View all</Link>
        </div>
        {data.allBookings.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-gray-400">No bookings yet.</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {data.allBookings.map((b) => (
              <div key={b.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{b.name}</p>
                  <p className="text-xs text-gray-400">{b.serviceName} · {b.date} at {b.time}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[b.status ?? "pending"]}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
