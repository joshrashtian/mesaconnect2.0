"use client";
import React, { forwardRef, useEffect, useState } from "react";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, Bar, TooltipProps, XAxis, YAxis } from "recharts";
import { BarChart, CartesianGrid } from "recharts";
import { useGPA } from "./GPAProvider";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateBestNextSemesterGPA, useRequiredGPA } from "./functions";
const chartConfig = {
  semester: {
    label: "Semester",
    color: "#2563eb",
  },
  gpa: {
    label: "GPA",
    color: "#F5853F",
  },
  netAtTime: {
    label: "Net GPA At Time",
    color: "#10b981",
  },
} satisfies ChartConfig;

const monthRange = (month: number): string | undefined => {
  if (month >= 8 && month <= 12) {
    return "Winter";
  } else if (month === 0 || month === 1) {
    return "Spring";
  } else if (month >= 2 && month <= 5) {
    return "Summer";
  } else if (month >= 6 && month <= 7) {
    return "Fall";
  } else {
    return undefined;
  }
};

const seasonArray = ["Winter", "Spring", "Summer", "Fall"];
const GPAChart = forwardRef(({}, ref: any) => {
  const { gpa, netGPA, courses } = useGPA();
  const [mode, setMode] = useState<"bar" | "area">("bar");

  const [reqGPA, setReqGPA] = useState<number | null>(null);

  return (
    <div ref={ref}>
      <Card className="min-h-[150px] min-w-full flex-col items-center justify-center p-2 md:min-h-[400px] lg:p-10">
        <ChartContainer config={chartConfig} className="max-h-[500px] w-full">
          {mode === "bar" ? (
            <BarChart accessibilityLayer data={gpa}>
              <CartesianGrid />
              <Bar dataKey="gpa" fill="var(--color-gpa)" radius={12} />
              <Bar
                dataKey="netAtTime"
                fill="var(--color-semester)"
                radius={12}
              />
              <XAxis
                dataKey="semester"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.toFixed(1)}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <ChartTooltip content={CustomTooltip} />
            </BarChart>
          ) : (
            <AreaChart accessibilityLayer data={gpa}>
              <CartesianGrid />
              <Area
                dataKey="gpa"
                name="Semester GPA"
                fill="url(#fillGpa)"
                stroke="var(--color-gpa)"
                type="monotone"
              />
              <defs>
                <linearGradient id="fillGpa" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-gpa)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-gpa)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillNet" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-netAtTime)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-netAtTime)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="netAtTime"
                name="Total GPA at Time"
                fill="url(#fillNet)"
                radius={12}
                stroke="var(--color-netAtTime)"
                type="natural"
              />

              <XAxis
                dataKey="semester"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.toFixed(1)}
              />
              <ChartLegend />
              <ChartTooltip content={CustomTooltip} />
            </AreaChart>
          )}
        </ChartContainer>

        <Button
          variant="outline"
          onClick={() => setMode(mode === "bar" ? "area" : "bar")}
        >
          {mode === "bar" ? "Area" : "Bar"}
        </Button>
      </Card>
    </div>
  );
});

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;

  return (
    <div className="relative max-w-xs origin-top-left rounded-md border bg-white p-3 text-sm text-black shadow-sm">
      <div className="text-sm font-medium text-foreground">{label}</div>
      <div className="text-sm text-muted-foreground">
        GPA: {data.gpa.toFixed(2)}
      </div>

      {data.netAtTime && (
        <div className="text-sm text-muted-foreground">
          Net GPA At Time: {data.netAtTime.toFixed(2)}
        </div>
      )}
      {data.courses && (
        <div className="mt-1 text-xs text-muted-foreground">
          <div className="font-semibold">Courses:</div>
          <ul className="list-inside list-disc">
            {data.courses.map((course: ClassType, index: number) => (
              <li key={index} className="flex items-center gap-1">
                {course.name} ({course.grade}){" "}
                {course.influence && (
                  <span
                    className={`flex items-center font-mono text-xs text-blue-500 ${
                      course.influence !== "N/A" && course.influence > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {course.influence !== "N/A" && course.influence > 0 ? (
                      <IoChevronUp />
                    ) : (
                      <IoChevronDown />
                    )}
                    {course.influence !== "N/A"
                      ? course.influence.toFixed(2)
                      : "N/A"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

GPAChart.displayName = "GPAChart";

export default GPAChart;
