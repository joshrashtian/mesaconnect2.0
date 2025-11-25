import UniSVG from "@/(mesaui)/UniSVG";
import { PostType } from "@/_assets/types";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useMemo } from "react";
import {
  IoSchoolOutline,
  IoCalendarOutline,
  IoTrophyOutline,
} from "react-icons/io5";

const AdmissionListItem = ({
  post,
  index,
}: {
  post: PostType;
  index: number;
}) => {
  // Parse admission data
  const admissionData = useMemo(() => {
    try {
      const data = post.data?.data;
      return {
        text: data?.text || "",
        university: data?.university || "",
        date: new Date(post.created_at),
      };
    } catch {
      return {
        text: "",
        university: "",
        date: new Date(),
      };
    }
  }, [post.data, post.created_at]);

  // Format the date
  const formattedDate = useMemo(() => {
    return admissionData.date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [admissionData.date]);

  return (
    <motion.article
      initial={{ y: 20, opacity: 0 }}
      exit={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: "easeOut",
        delay: 0.05 * index,
        duration: 0.3,
      }}
      className="group relative w-full font-eudoxus"
    >
      <Link href={`/connect/social/post/${post.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 p-6 shadow-md transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl dark:border-emerald-800 dark:from-emerald-950/40 dark:to-green-950/40 dark:hover:border-emerald-700">
          {/* Success Badge */}
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-400/10 dark:bg-emerald-600/10"></div>
          <div className="absolute right-4 top-4">
            <div className="rounded-full bg-emerald-500 p-2 shadow-lg dark:bg-emerald-600">
              <IoTrophyOutline className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* University Logo */}
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-sm dark:bg-slate-800">
              {UniSVG({ name: admissionData.university })}
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <IoSchoolOutline className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                  Admission Announcement
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                {admissionData.university}
              </h3>
            </div>
          </div>

          {/* Title/Content */}
          <h2 className="mb-3 text-lg font-semibold leading-tight text-slate-800 dark:text-slate-100">
            {post?.user?.real_name} has been admitted into{" "}
            {admissionData.university}!
          </h2>

          {/* Date Footer */}
          <div className="flex items-center gap-2 border-t border-emerald-200 pt-4 text-sm text-slate-600 dark:border-emerald-800 dark:text-slate-400">
            <IoCalendarOutline className="h-4 w-4" />
            <span className="font-medium">{formattedDate}</span>
          </div>

          {/* Celebration Gradient Overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-green-500/0 to-yellow-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.08]"></div>

          {/* Sparkle Effect */}
          <div className="pointer-events-none absolute right-8 top-8 h-2 w-2 animate-pulse rounded-full bg-yellow-400 opacity-0 group-hover:opacity-100"></div>
          <div className="pointer-events-none absolute right-12 top-6 h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-300 opacity-0 delay-75 group-hover:opacity-100"></div>
        </div>
      </Link>
    </motion.article>
  );
};

export default AdmissionListItem;
