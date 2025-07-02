// components/RecentReviewsCarousel.tsx
"use client";

import React from "react";
import Link from "next/link";
import { IoLink } from "react-icons/io5";
import { Card } from "@/components/ui/card";
import Tilt from "react-parallax-tilt";

export interface Teacher {
  id: string;
  name: string;
  classes?: string[];
  category: string;
  teaches?: string[];
}

export interface Review {
  id: string;
  rating: number;
  teacher: Teacher;
}

type RecentReviewsCarouselProps = {
  reviews: Review[];
};

const RecentReviewsCarousel: React.FC<RecentReviewsCarouselProps> = ({
  reviews,
}) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section aria-label="Recent teacher reviews" className="w-full py-4">
      {/* 1) -mx-4 cancels out the px-4 on the inner scroller */}
      <div className="-mx-4 overflow-hidden">
        {/* 2) px-4 gives you side padding, but won’t overflow because of the negative margin above */}
        <div className="no-scrollbar mb-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4">
          {reviews.map((rev) => (
            <Tilt
              key={rev.id}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              className="relative w-64 flex-shrink-0 snap-start rounded-3xl border-2 p-4 shadow-lg"
            >
              <Link
                href={`/teacher/${rev.teacher.id}`}
                aria-label={`View profile of ${rev.teacher.name}`}
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
              >
                <IoLink size={20} />
              </Link>

              <h4 className="text-lg font-semibold">{rev.teacher.name}</h4>
              <p className="mt-1 text-sm text-gray-600">{rev.rating} / 5</p>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentReviewsCarousel;
