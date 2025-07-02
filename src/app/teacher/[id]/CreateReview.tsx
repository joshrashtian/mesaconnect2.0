"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { supabase } from "../../../../config/mesa-config";
import { useUser } from "@/app/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export type Review = {
  id?: string;
  teacher_id: string;
  user_id: string;
  rating: number;
  review: string;
  difficulty: number;
  grade: string;
  took_for: string;
  pros: string[];
  cons: string[];
  created_at?: string;
};

type CreateReviewProps = {
  teacherId: string;
  classesTaught: { id: string; name: string }[];
};

export default function CreateReview({
  teacherId,
  classesTaught,
}: CreateReviewProps) {
  const { user } = useUser();
  const router = useRouter();

  const [form, setForm] = useState<Review>({
    teacher_id: teacherId,
    user_id: user?.id || "",
    rating: 5,
    review: "",
    difficulty: 0,
    grade: "",
    took_for: "",
    pros: [],
    cons: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generic change handler
  const onChange = <K extends keyof Review>(key: K, value: Review[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  // Add / remove pros or cons
  const addListItem = (field: "pros" | "cons") => {
    setForm((f) => ({ ...f, [field]: [...f[field], ""] }));
  };
  const updateListItem = (
    field: "pros" | "cons",
    idx: number,
    value: string,
  ) => {
    setForm((f) => {
      const copy = [...f[field]];
      copy[idx] = value;
      return { ...f, [field]: copy };
    });
  };
  const removeListItem = (field: "pros" | "cons", idx: number) => {
    setForm((f) => {
      const copy = [...f[field]];
      copy.splice(idx, 1);
      return { ...f, [field]: copy };
    });
  };

  const handleSubmit = async () => {
    if (!user) {
      setError("You must be signed in to submit a review.");
      return;
    }
    if (!form.took_for || !form.difficulty) {
      setError("Please select both class taken for and difficulty.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      teacher_id: form.teacher_id,
      user_id: user.id,
      rating: form.rating,
      review: form.review,
      difficulty: form.difficulty,
      took_for: form.took_for,
      pros: form.pros.length ? form.pros : null,
      cons: form.cons.length ? form.cons : null,
    };

    const { error: supaErr } = await supabase
      //@ts-ignore
      .from("teacher_reviews")
      //@ts-ignore
      .insert([payload]);

    setLoading(false);

    if (supaErr) {
      console.error("Insert error:", supaErr);
      setError(supaErr.message);
    } else {
      // on success, you could router.refresh() or redirect:
      router.refresh();
      // or clear form:
      setForm({
        teacher_id: teacherId,
        user_id: user.id,
        rating: 5,
        review: "",
        difficulty: 0,
        grade: "",
        took_for: "",
        pros: [],
        cons: [],
      });
    }
  };

  return (
    <Card className="w-full space-y-6 p-6">
      <h2 className="text-2xl font-bold">Write a Review</h2>
      {error && <p className="text-red-600">{error}</p>}

      {/* Rating */}
      <div className="flex w-full flex-row gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              {form.rating} ★
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-2">
            <DropdownMenuLabel>Rating</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[5, 4, 3, 2, 1].map((n) => (
              <DropdownMenuItem
                key={n}
                onClick={() => onChange("rating", n)}
                className="cursor-pointer"
              >
                {n} ★
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              {classesTaught.find((c) => c.id === form.took_for)?.name || "—"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-2">
            <DropdownMenuLabel>Class Taken For</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {classesTaught.map((c) => (
              <DropdownMenuItem
                key={c.id}
                onClick={() => onChange("took_for", c.id)}
                className="cursor-pointer"
              >
                {c.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              {form.difficulty}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-2">
            <DropdownMenuLabel>Difficulty</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Array.from({ length: 10 }, (_, i) => i + 1).map((d) => (
              <DropdownMenuItem
                key={d}
                onClick={() => onChange("difficulty", d as number)}
                className="cursor-pointer"
              >
                {d}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              {form.grade || "Select a grade..."}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-2">
            <DropdownMenuLabel>Grade</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              "A",
              "B",
              "C",
              "D",
              "F",
              "Withdrawal",
              "No Grade",
              "Pass",
              "No Pass",
            ].map((d) => (
              <DropdownMenuItem
                key={d}
                onClick={() => onChange("grade", d)}
                className="cursor-pointer"
              >
                {d} Grade
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Review Text */}
      <div>
        <label className="block font-medium">Your Review</label>
        <Textarea
          rows={4}
          value={form.review}
          onChange={(e) => onChange("review", e.target.value)}
        />
      </div>

      {/* Pros */}
      <div>
        <div className="flex items-center justify-between">
          <label className="font-medium">Pros</label>
          <button
            type="button"
            onClick={() => addListItem("pros")}
            className="text-sm text-green-600"
          >
            + Add
          </button>
        </div>
        {form.pros.map((p, i) => (
          <div key={i} className="mt-1 flex space-x-2">
            <Input
              value={p}
              onChange={(e) => updateListItem("pros", i, e.target.value)}
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removeListItem("pros", i)}
              className="text-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Cons */}
      <div>
        <div className="flex items-center justify-between">
          <label className="font-medium">Cons</label>
          <button
            type="button"
            onClick={() => addListItem("cons")}
            className="text-sm text-green-600"
          >
            + Add
          </button>
        </div>
        {form.cons.map((c, i) => (
          <div key={i} className="mt-1 flex space-x-2">
            <Input
              value={c}
              onChange={(e) => updateListItem("cons", i, e.target.value)}
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removeListItem("cons", i)}
              className="text-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Submitting…" : "Submit Review"}
      </button>
    </Card>
  );
}
