"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import { CircularProgressBar } from "@/(mesaui)/CircularProgressBar";
import {
  IoArrowDown,
  IoArrowUp,
  IoCheckmark,
  IoClose,
  IoWarning,
} from "react-icons/io5";
import ReviewComponent from "./ReviewComponent";
import HomePageHeader from "@/app/news/(homepage)/header";
import CreateReview from "./CreateReview";
import EditReview from "./EditReview";
import Link from "next/link";
import HeadingComponent from "./HeadingComponent";
import Menu from "./Menu";

export type Review = {
  id: string;
  teacher_id: string;
  user_id: string;
  rating: number;
  review: string;
  difficulty: number;
  created_at: string;
  took_for: string;
  grade?: string;
  pros?: string[];
  cons?: string[];
};
const page = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerComponentClient({ cookies });

  // Kick off the things that don't depend on each other
  const teacherPromise = supabase
    .from("teachers")
    .select("*")
    .eq("id", params.id)
    .single();

  const userPromise = supabase.auth.getUser();

  // Wait for teacher (so you know teacher.id and teacher.teaches)
  const [{ data: teacher }, { data: user }] = await Promise.all([
    teacherPromise,
    userPromise,
  ]);

  // Now fire the rest in parallel
  const [{ data: ratingSummary }, { data: classesTaught }, { data: reviews }] =
    await Promise.all([
      supabase
        .from("teacher_rating_summary")
        .select("*")
        .eq("teacher_id", teacher!.id)
        .single(),

      supabase
        .schema("information")
        .from("classes")
        .select("name, category, num, id")
        .in("id", teacher?.teaches ?? []),

      supabase
        .from("teacher_reviews")
        .select("*")
        .eq("teacher_id", teacher!.id),
    ]);
  const usermadeReview = reviews?.find((r) => r.user_id === user?.user?.id);

  const average_difficulty =
    reviews?.reduce((acc, curr) => acc + curr.difficulty, 0) /
    (reviews?.length ?? 0);
  return (
    <div className="flex flex-col items-center gap-4 pt-24 font-eudoxus lg:p-4">
      <HeadingComponent
        teacher={teacher}
        averageRating={ratingSummary?.average_rating}
      />
      <div className="flex flex-row items-center gap-4 pt-24">
        <CircularProgressBar
          percentage={(ratingSummary?.average_rating / 5) * 100}
          size={200}
          showText={false}
          color={
            ratingSummary?.average_rating >= 3.5
              ? "#0CCA4A"
              : ratingSummary?.average_rating > 2.5
                ? "#FFA500"
                : "#FF0000"
          }
          strokeWidth={10}
          customComponent={
            <div className="flex flex-row items-start justify-center font-nenue">
              <h1 className="text-7xl font-black">
                {ratingSummary?.average_rating}
              </h1>
              <h2 className="text-2xl font-black">/5</h2>
            </div>
          }
          textClassName="text-5xl font-bold"
        />
      </div>
      <h1 className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-center text-5xl font-black text-transparent">
        {teacher?.name}
      </h1>
      <h3 className="text-center text-2xl font-bold">
        Students feel{" "}
        {ratingSummary?.average_rating >= 4.5
          ? "Overwhelmingly Positive"
          : ratingSummary?.average_rating > 3.5
            ? "Very Positive"
            : ratingSummary?.average_rating > 2.2
              ? "Mixed"
              : !ratingSummary?.average_rating
                ? "unknown"
                : "Not Good"}{" "}
        about {teacher?.name}.
      </h3>

      <p>This teacher teaches:</p>
      <div className="grid w-full grid-cols-1 gap-4 p-3 lg:w-4/5 lg:grid-cols-3 lg:p-0">
        <div className="flex flex-col rounded-lg bg-white p-4 shadow-md">
          <h4>Average Difficulty</h4>
          <p className="text-2xl font-bold">
            {average_difficulty.toFixed(1)} / 10
          </p>
        </div>
        {classesTaught?.map((classItem) => {
          const averageRating =
            reviews
              ?.filter((r) => r.took_for === classItem.id)
              .reduce((acc, curr) => acc + curr.rating, 0) /
            (reviews?.filter((r) => r.took_for === classItem.id)?.length ?? 0);
          return (
            <div
              key={classItem.id}
              className="flex min-w-full flex-row items-center justify-between gap-4 rounded-lg bg-white p-4 pt-12 shadow-md lg:w-1/2"
            >
              <Link
                href={`/connect/class/${classItem.id}`}
                className="flex flex-col gap-2"
              >
                <h1 className="text-xl font-bold">{classItem.name}</h1>
                <p className="text-xl text-gray-500">
                  {classItem.category} {classItem.num}
                </p>
              </Link>
              {!Number.isNaN(averageRating) && (
                <CircularProgressBar
                  percentage={averageRating * 20}
                  size={64}
                  strokeWidth={5}
                  className="rounded-full bg-white"
                  color={"#0CCA4A"}
                  showText={false}
                  customText={`${averageRating}`}
                  textClassName="text-2xl font-bold text-[#0CCA4A]"
                  animationDuration={0.5}
                />
              )}
            </div>
          );
        })}
      </div>

      <Menu
        userMadeReview={usermadeReview}
        teacher={teacher}
        classesTaught={classesTaught ?? []}
        reviews={reviews ?? []}
      />

      <section className="flex w-full flex-col gap-4 lg:w-4/5">
        <h1 className="text-center text-xl font-bold lg:text-left lg:text-2xl">
          Reviews ({reviews?.length})
        </h1>

        {reviews
          ?.sort((a, b) => b.created_at.localeCompare(a.created_at))
          .map((review: Review) => (
            <ReviewComponent
              key={review.id}
              review={review}
              classesTaught={classesTaught ?? []}
            />
          ))}
      </section>
    </div>
  );
};

export default page;
