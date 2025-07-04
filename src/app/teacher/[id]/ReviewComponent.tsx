"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Review } from "./page";
import {
  IoArrowDown,
  IoArrowUp,
  IoCheckmark,
  IoClose,
  IoEllipsisVertical,
  IoFlag,
  IoTrash,
  IoWarning,
} from "react-icons/io5";
import { supabase } from "../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import { CircularProgressBar } from "@/(mesaui)/CircularProgressBar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ReviewComponent = ({
  review,
  classesTaught,
}: {
  review: Review;
  classesTaught: any[];
}) => {
  const { user } = useUser();
  const [vote, setVote] = useState<1 | -1 | null>(null);
  const [total, setTotal] = useState(0);

  // 1️⃣ Fetch all votes for this review, compute total & my vote
  const fetchVotes = async () => {
    const { data, error } = await supabase
      //@ts-ignore
      .from("review_votes")
      .select("vote, user_id")
      .eq("review_id", review.id);

    if (error) {
      console.error("fetchVotes error:", error);
      return;
    }

    const votes = data || [];
    // sum up +1/–1
    //@ts-ignore
    const newTotal = votes.reduce((sum, v) => sum + v.vote, 0);
    setTotal(newTotal);

    // find current user's vote
    //@ts-ignore
    const mine = votes.find((v) => v.user_id === user?.id)?.vote ?? null;
    setVote(mine);
  };

  // 2️⃣ On mount (or when user changes) load votes
  useEffect(() => {
    fetchVotes();
  }, [review.id, user?.id]);

  // 3️⃣ Toggle upvote/downvote
  const toggleVote = async (newVote: 1 | -1) => {
    if (!user) {
      alert("Please sign in to vote.");
      return;
    }

    // If clicking the same button, delete my vote
    if (vote === newVote) {
      await supabase
        //@ts-ignore
        .from("review_votes")
        //@ts-ignore
        .delete()
        .eq("review_id", review.id)
        .eq("user_id", user.id);
    } else {
      // Otherwise upsert my new vote
      await supabase
        //@ts-ignore
        .from("review_votes")
        //@ts-ignore
        .upsert(
          //@ts-ignore
          { review_id: review.id, user_id: user.id, vote: newVote },
          { onConflict: ["review_id", "user_id"] },
        );
    }

    // 4️⃣ Re-fetch to get fresh totals & button state
    fetchVotes();
  };

  const reportReview = async () => {
    if (!user) {
      alert("Please sign in to report a review.");
      return;
    }

    const { data, error } = await supabase
      //@ts-ignore
      .from("review_reports")
      //@ts-ignore
      .insert({ review_id: review.id, user_id: user?.id });

    if (error) {
      console.error("reportReview error:", error);
      return;
    }
  };

  return (
    <div className="relative flex w-full flex-col items-start rounded-md bg-white bg-white/40 bg-clip-padding px-3 pb-4 text-xl shadow-md backdrop-blur-sm backdrop-filter transition-all duration-300 hover:shadow-lg">
      <header className="flex w-full flex-col items-start justify-between border-b border-gray-200 p-5 pb-2 lg:flex-row lg:items-center">
        <h1 className="font-mono text-xl">
          {review.rating > 4
            ? "Highly Recommends"
            : review.rating > 3
              ? "Recommends"
              : review.rating > 2
                ? "Is Mixed"
                : "Is Not Recommended"}
          {review.took_for &&
            ` for ${classesTaught?.find((classItem) => classItem.id === review.took_for)?.name}.`}
        </h1>
        <p className="font-mono text-gray-500">
          {new Date(review.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger className="absolute right-2 top-2 text-gray-500">
            <IoEllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                reportReview();
              }}
              className="flex flex-row items-center gap-2 text-red-500"
            >
              <IoFlag />
              <p>Report Review</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="flex flex-col gap-2 pt-3 lg:flex-row">
        <div className="flex flex-row items-center gap-3 rounded-xl bg-zinc-100 p-4 lg:flex-col">
          {/*<ol
            className={`flex font-mono ${
              review.rating === 1
                ? "bg-red-500"
                : review.rating <= 3
                  ? "bg-yellow-500"
                  : "bg-green-500"
            } h-16 w-16 flex-row items-center justify-center gap-2 rounded-full p-2 text-3xl text-white shadow-lg`}
          >
            <h1>{review.rating}</h1>
          </ol>
          */}
          <CircularProgressBar
            percentage={review.rating * 20}
            size={64}
            strokeWidth={5}
            className="rounded-full border border-black bg-white"
            color={"#E4572E"}
            showText={false}
            animationDuration={0.5}
            customText={`${review.rating}`}
            textClassName="text-2xl font-bold font-mono text-[#E4572E]"
          />
          <ol className="flex h-16 w-16 flex-col items-start justify-center bg-slate-500 px-3 font-mono text-white">
            <IoWarning /> <h1>{review.difficulty}</h1>
          </ol>
          {review?.grade && (
            <ol className="flex h-16 w-16 flex-col items-start justify-center rounded-xl bg-blue-400 px-3 font-mono text-white">
              <h1 className="text-3xl text-white">{review?.grade}</h1>
            </ol>
          )}
        </div>
        <div className="flex w-full flex-col gap-3 border-t border-gray-200 px-4 lg:border-l lg:border-gray-200">
          <h1>{review.review}</h1>
          <ol className="flex flex-col gap-2">
            {review.pros?.map((pro) => (
              <p
                key={pro}
                className="flex flex-row items-center gap-2 text-green-500"
              >
                <IoCheckmark /> {pro}
              </p>
            ))}
          </ol>
          <ol className="flex flex-col gap-2">
            {review.cons?.map((con) => (
              <p
                key={con}
                className="flex flex-row items-center gap-2 text-red-500"
              >
                <IoClose /> {con}
              </p>
            ))}
          </ol>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row">
        <ol className="flex flex-row items-center gap-2">
          <button
            className={`${vote === 1 ? "text-orange-500" : "text-gray-500"}`}
            onClick={() => {
              toggleVote(1);
            }}
          >
            <IoArrowUp />
          </button>
          <h1>{total}</h1>
          <button
            className={`${vote === -1 ? "text-orange-500" : ""}`}
            onClick={() => {
              toggleVote(-1);
            }}
          >
            <IoArrowDown />
          </button>
        </ol>
      </div>
    </div>
  );
};

export default ReviewComponent;
