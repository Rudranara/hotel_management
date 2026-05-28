"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

interface RevenueDay {
  _id: string;      // "YYYY-MM-DD"
  revenue: number;
  count: number;
}

interface UpcomingCheckIn {
  _id: string;
  bookingNumber: string;
  checkIn: string | Date;
  checkOut: string | Date;
  guests: number;
  user?: { name?: string; email?: string };
  room?: { name?: string; type?: string; images?: string[] };
}

interface AdminAnalyticsProps {
  revenueByDay: RevenueDay[];
  upcomingCheckIns: UpcomingCheckIn[];
  totalRevenue: number;
  occupancyRate: number;
}

function formatINR(n: number) {
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)}L`;
  if (n >= 1_000) return `₹${(n / 1_000).toFixed(1)}K`;
  return `₹${n}`;
}

export function AdminAnalytics({
  revenueByDay,
  upcomingCheckIns,
  totalRevenue,
  occupancyRate,
}: AdminAnalyticsProps) {
  // Fill last 14 days for the chart
  const days: { label: string; revenue: number; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    const found = revenueByDay.find((r) => r._id === key);
    days.push({
      label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      revenue: found?.revenue ?? 0,
      count: found?.count ?? 0,
    });
  }

  return (
    <div className="space-y-5">
      {/* Revenue chart */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#22C7C7]">Revenue</p>
            <h2 className="mt-1 text-2xl font-semibold text-[#111827]">Last 14 days</h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#9CA3AF]">30-day total</p>
            <p className="mt-0.5 text-xl font-bold text-[#111827]">{formatINR(totalRevenue)}</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={days} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#22C7C7" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#22C7C7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              tickLine={false}
              axisLine={false}
              interval={1}
            />
            <YAxis
              tickFormatter={(v: number) => formatINR(v)}
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              tickLine={false}
              axisLine={false}
              width={52}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                fontSize: 12,
              }}
              formatter={(value, _name, props) => {
                const count = (props.payload as { count?: number } | undefined)?.count ?? 0;
                return [`${formatINR(Number(value))} · ${count} booking${count !== 1 ? "s" : ""}`, "Revenue"];
              }}
              labelStyle={{ fontWeight: 600, color: "#111827" }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#22C7C7"
              strokeWidth={2.5}
              fill="url(#revenueGrad)"
              dot={false}
              activeDot={{ r: 5, fill: "#22C7C7", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Upcoming check-ins */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-[#22C7C7]" />
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#22C7C7]">Upcoming check-ins</p>
          <span className="ml-auto rounded-full bg-[#22C7C7]/10 px-2.5 py-0.5 text-xs font-semibold text-[#22C7C7]">
            Next 7 days
          </span>
        </div>

        {upcomingCheckIns.length === 0 ? (
          <p className="py-4 text-center text-sm text-[#9CA3AF]">No check-ins in the next 7 days.</p>
        ) : (
          <div className="space-y-3">
            {upcomingCheckIns.map((booking) => (
              <div
                key={booking._id}
                className="flex items-center justify-between gap-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#111827]">
                    {booking.room?.name ?? "Room"}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">{booking.user?.name ?? "Guest"}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-[#374151]">
                    {new Date(booking.checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">
                    {Math.round((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86400000)} nights
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Occupancy rate */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#22C7C7]">Occupancy rate</p>
        <p className="mt-2 text-4xl font-bold text-[#111827]">{occupancyRate}%</p>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          Rooms with active/confirmed bookings today
        </p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#F1F5F9]">
          <div
            className="h-full rounded-full bg-[#22C7C7] transition-all"
            style={{ width: `${occupancyRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
