"use server";
import React from "react";
import HomePageHeader from "../news/(homepage)/header";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import TeacherCard from "./(components)/TeacherCard";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoAdd, IoLink } from "react-icons/io5";
import RecentReviewsCarousel from "./(components)/RecentReviewsCarousel";
import FrontHeader from "./(components)/FrontHeader";

const TeachersPage = async () => {
  const supabase = createServerComponentClient({ cookies: () => cookies() });

  const { data: teachers } = await supabase.from("teachers").select("*");

  const { data: recentReviews, error: recentReviewsError } = await supabase
    .from("teacher_reviews")
    .select("rating, teacher:teacher_id(*)")
    .order("created_at", { ascending: false })
    .limit(10);

  console.log(recentReviewsError);
  return (
    <div className="flex flex-col p-4 px-12 font-eudoxus">
      <FrontHeader />
      <Card className="mt-24 flex flex-col items-center justify-center rounded-lg bg-white p-3">
        <p className="text-sm text-gray-500">
          Press{" "}
          <kbd className="pointer-events-none mx-2 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>{" "}
          or{" "}
          <kbd className="pointer-events-none mx-2 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            ctrl + K
          </kbd>{" "}
          to open search.
        </p>
        <Separator className="my-2" />
        <p className="text-sm text-gray-500">
          Please note that all reviews may not be 100% accurate, and are not a
          sure fire guide to the quality of the teacher, this tool is more for
          finding the right teacher for you. Any inappropiate reviews will be
          reported to the admins of your Community College.
        </p>
      </Card>

      <div className="mt-4 flex flex-col items-start justify-start">
        <h1 className="text-2xl font-bold">All Teachers</h1>
        <div className="flex flex-row flex-wrap gap-4">
          {teachers?.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </div>
      <div className="mt-4 flex max-w-full flex-col items-start justify-start">
        <h1 className="my-4 text-left text-2xl font-bold">Recent Reviews</h1>

        {recentReviews && (
          <RecentReviewsCarousel reviews={recentReviews as any[]} />
        )}
      </div>
      <Link
        href="/teacher/create"
        className="fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white"
      >
        <IoAdd className="text-2xl" />
      </Link>
    </div>
  );
};

export default TeachersPage;
