"use client";
import React, { forwardRef } from "react";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, TooltipProps, XAxis, YAxis } from "recharts";
import { BarChart, CartesianGrid } from "recharts";
import { useGPA } from "./layout";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import { IoChevronUp, IoChevronDown } from "react-icons/io5";
const chartConfig = {
  semester: {
    label: "Semester",
    color: "#2563eb",
  },
  gpa: {
    label: "GPA",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const GPAChart = forwardRef(({}, ref: any) => {
  const { gpa } = useGPA();
  return (
    <div ref={ref}>
      <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
        <BarChart accessibilityLayer data={gpa}>
          <CartesianGrid />
          <Bar dataKey="gpa" fill="var(--color-gpa)" radius={12} />
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
          <ChartTooltip content={CustomTooltip} />
        </BarChart>
      </ChartContainer>
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
    <div className="max-w-xs origin-top-left rounded-md border bg-white p-3 text-sm text-black shadow-sm">
      <div className="text-sm font-medium text-foreground">{label}</div>
      <div className="text-sm text-muted-foreground">
        GPA: {data.gpa.toFixed(2)}
      </div>
      {data.netAtTime && (
        <div className="text-sm text-muted-foreground">
          Net GPA: {data.netAtTime.toFixed(2)}
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
                    className={`flex items-center text-xs ${
                      course.influence > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {course.influence > 0 ? <IoChevronUp /> : <IoChevronDown />}
                    {course.influence.toFixed(2)}
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
