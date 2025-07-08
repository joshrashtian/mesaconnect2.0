"use client";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { useUser } from "@/app/AuthContext";
import React from "react";
import CreateReview from "./CreateReview";
import EditReview from "./EditReview";
import { Review } from "./page";
import { Card } from "@/components/ui/card";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { StarIcon } from "lucide-react";

const Menu = ({
  userMadeReview,
  teacher,
  classesTaught,
  reviews,
}: {
  userMadeReview: Review | null;
  teacher: any;
  classesTaught: { id: string; name: string }[];
  reviews: Review[];
}) => {
  const { user } = useUser();

  const chartConfig = {
    "1": {
      label: "1",
      fill: "red",
      icon: StarIcon,
    },
    "2": {
      label: "2",
      fill: "orange",
      icon: StarIcon,
    },
    "3": {
      label: "3",
      fill: "yellow",
      icon: StarIcon,
    },
    "4": {
      label: "4",
      fill: "blue",
      icon: StarIcon,
    },
    "5": {
      label: "5",
      fill: "green",
      icon: StarIcon,
    },
  };

  const chartData = Object.entries(chartConfig).map(([key, value]) => ({
    score: key,
    [key]: reviews.filter((review) => review.rating === Number(key)).length,
  }));

  const histogram = chartData.map((item) => ({
    score: item.score,
    fill: chartConfig[item.score as keyof typeof chartConfig].fill,
    count: item[item.score],
  }));
  return (
    <Tabs className="w-3/4" defaultValue="reviews">
      <TabsList className="w-full justify-center">
        <TabsTrigger className="w-1/2" value="reviews">
          Your Reviews
        </TabsTrigger>
        <TabsTrigger className="w-1/2" value="statistics">
          Statistics
        </TabsTrigger>
      </TabsList>
      <TabsContent value="reviews">
        {!userMadeReview ? (
          user?.id ? (
            <CreateReview
              teacherId={teacher?.id}
              classesTaught={classesTaught ?? []}
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">
                Sign up to rate reviews, add teachers, and create your own.
              </h1>
            </div>
          )
        ) : (
          <EditReview review={userMadeReview} />
        )}
      </TabsContent>
      <TabsContent value="statistics">
        <Card className="w-full">
          <h1 className="p-4 text-2xl font-bold">Statistics</h1>
          <p className="p-4 text-sm text-gray-500">Score Distribution</p>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <PieChart data={histogram}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={histogram}
                dataKey="count"
                nameKey="score"
                fill="fill"
                radius={10}
              />
            </PieChart>
          </ChartContainer>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Menu;
