"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface AnalyticsChartProps {
  data: { name: string; value: number; value2?: number }[];
  title: string;
  subtitle?: string;
  showSecondLine?: boolean;
}

export function AnalyticsChart({ data, title, subtitle, showSecondLine }: AnalyticsChartProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(168, 84%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(168, 84%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 64%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 64%)", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 10%)",
                border: "1px solid hsl(0, 0%, 18%)",
                borderRadius: "8px",
                color: "hsl(0, 0%, 98%)",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(168, 84%, 50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
            {showSecondLine && (
              <Area
                type="monotone"
                dataKey="value2"
                stroke="hsl(38, 92%, 50%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue2)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
