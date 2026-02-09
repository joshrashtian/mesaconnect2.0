import React from "react";
import { serverside } from "../../../../../../config/serverside";
import UserItem from "@/(mesaui)/UserItem";
import Link from "next/link";

export async function SuggestedUsersWidget() {
  const user = await serverside.auth.getUser();
  const { data: following } = await serverside.rpc("get_followers_by_user", {
    userid: user?.data.user?.id,
  });

  const followingIds = (following ?? []).map((u: any) => u.id).filter(Boolean);
  const excludeIds = [...followingIds, user?.data?.user?.id].filter(
    Boolean,
  ) as string[];
  const idFilter =
    excludeIds.length > 0
      ? excludeIds.join(",")
      : "00000000-0000-0000-0000-000000000000";

  const { data: users } = await serverside
    .from("profiles")
    .select("id, username, major, real_name, avatar_url, college")
    .order("created_at", { ascending: false })
    .not("real_name", "is", null)
    .not("id", "in", `(${idFilter})`)
    .limit(4);

  if (!users?.length) return null;

  return (
    <section className="rounded-2xl bg-zinc-100/80 p-4 dark:bg-zinc-800/50">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
          People to connect with
        </h2>
        <Link
          href="/connect/social/users"
          className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          See all
        </Link>
      </div>
      <ul className="flex flex-col gap-2">
        {users.map((u) => (
          <li key={u.id}>
            <UserItem user={u} size="sidebar">
              <>{[u.major, u.college].filter(Boolean).join(" · ") || "MESA"}</>
            </UserItem>
          </li>
        ))}
      </ul>
    </section>
  );
}
