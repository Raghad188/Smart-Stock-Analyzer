"use client";

import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import { marketSectors, priceSeries } from "@/lib/data";

const tooltipStyle = {
  background: "#0c1c32",
  border: "1px solid rgba(103, 174, 255, .2)",
  borderRadius: "12px",
  color: "#fff",
  direction: "rtl" as const
};

export function MarketAreaChart({ data = priceSeries, compact = false }: { data?: { time: string; price: number }[]; compact?: boolean }) {
  const prices = data.map((item) => item.price);
  const minimum = Math.min(...prices);
  const maximum = Math.max(...prices);
  const padding = Math.max((maximum - minimum) * 0.22, maximum > 1000 ? 18 : maximum * 0.008);
  const domain: [number, number] = [Number((minimum - padding).toFixed(2)), Number((maximum + padding).toFixed(2))];

  return (
    <ResponsiveContainer width="100%" height={compact ? 110 : 245}>
      <AreaChart data={data} margin={{ top: 10, right: 0, left: compact ? 0 : 12, bottom: 0 }}>
        <defs>
          <linearGradient id="marketFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2dd89c" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#2dd89c" stopOpacity={0} />
          </linearGradient>
        </defs>
        {!compact && <CartesianGrid stroke="rgba(255,255,255,.04)" vertical={false} />}
        {!compact && <XAxis dataKey="time" stroke="#61728c" tickLine={false} axisLine={false} fontSize={11} />}
        {!compact && <YAxis domain={domain} orientation="right" stroke="#61728c" tickLine={false} axisLine={false} fontSize={11} width={55} />}
        <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${Number(value).toLocaleString("ar-SA")}`, "المؤشر"]} />
        <Area type="monotone" dataKey="price" stroke="#2dd89c" strokeWidth={2.5} fill="url(#marketFill)" animationDuration={1200} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function SectorBarChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={marketSectors} layout="vertical" margin={{ right: 20, left: 0 }}>
        <CartesianGrid stroke="rgba(255,255,255,.04)" horizontal={false} />
        <XAxis type="number" domain={[-1, 2.5]} stroke="#61728c" tickLine={false} axisLine={false} fontSize={11} />
        <YAxis dataKey="name" type="category" orientation="right" stroke="#9caec5" tickLine={false} axisLine={false} width={70} fontSize={11} />
        <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, "التغير"]} />
        <Bar dataKey="value" radius={[6, 6, 6, 6]} fill="#1688ff" animationDuration={1200} />
      </BarChart>
    </ResponsiveContainer>
  );
}
