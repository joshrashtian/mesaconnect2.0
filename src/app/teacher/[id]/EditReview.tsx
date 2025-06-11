"use client";

import React, { useState } from "react";
import { Review } from "./page";
import { Button } from "@/components/ui/button";
import { supabase } from "../../../../config/mesa-config";
import { useRouter } from "next/navigation";

const EditReview = ({ review }: { review: Review }) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    setLoadingDelete(true);
    const { error } = await supabase
      //@ts-ignore
      .from("teacher_reviews")
      .delete()
      .eq("id", review.id);
    setLoadingDelete(false);

    if (error) {
      console.error("Delete failed:", error);
      alert("Could not delete review: " + error.message);
    } else {
      router.refresh();
    }
  };

  return (
    <div className="h-fit w-3/4 rounded-3xl bg-slate-200 p-5">
      <h1 className="text-2xl font-bold">Your Review</h1>
      <p className="text-sm text-gray-500">
        {review.difficulty} / 10 Difficulty
      </p>
      <p className="text-sm text-gray-500">{review.rating} / 5 Rating</p>
      <p className="text-sm text-gray-500">{review.review}</p>
      <Button className="mt-4" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default EditReview;
