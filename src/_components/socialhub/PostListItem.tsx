import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PostType } from "@/_assets/types";
import { useContextMenu, useToast } from "@/app/(connect)/InfoContext";
import { useUser } from "@/app/AuthContext";
import {
  IoChatboxEllipsesOutline,
  IoPersonOutline,
  IoTrashBinOutline,
  IoTimeOutline,
  IoEllipsisVertical,
  IoHeart,
  IoHeartOutline,
} from "react-icons/io5";
import { supabase } from "../../../config/mesa-config";
import { useModal } from "@/app/(connect)/connect/Modal";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";

type TipTapDoc = {
  type: "doc";
  content?: any[];
};

// TipTap Readonly Preview Component
const TipTapReadonly = ({ doc }: { doc: TipTapDoc }) => {
  const createPreviewDoc = (originalDoc: TipTapDoc): TipTapDoc => {
    if (!originalDoc.content || originalDoc.content.length === 0) {
      return originalDoc;
    }

    // Only show first 2 blocks for preview
    const previewContent = originalDoc.content.slice(0, 2);

    // Truncate text blocks
    const truncatedContent = previewContent.map((block: any) => {
      if (block.type === "paragraph" && block.content) {
        const truncatedParagraph = {
          ...block,
          content: block.content.map((node: any) => {
            if (node.type === "text" && node.text) {
              return {
                ...node,
                text:
                  node.text.length > 150
                    ? node.text.substring(0, 150) + "..."
                    : node.text,
              };
            }
            return node;
          }),
        };
        return truncatedParagraph;
      }
      return block;
    });

    return {
      ...originalDoc,
      content: truncatedContent,
    };
  };

  const previewDoc = createPreviewDoc(doc);

  const editor = useEditor({
    extensions: [StarterKit, ImageExtension.configure({ allowBase64: true })],
    content: previewDoc,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="prose prose-sm prose-slate dark:prose-invert max-w-none [&_.ProseMirror]:border-none [&_.ProseMirror]:p-0 [&_.ProseMirror]:outline-none">
      <div className="line-clamp-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

// Legacy Post Viewer Component
const LegacyViewer = ({
  data,
}: {
  data: { type: string; text?: string }[];
}) => {
  const texts = data
    .filter((item: any) => item?.text)
    .map((item: any) => item.text);
  const combined = texts.join(" ");
  const preview =
    combined.length > 150 ? combined.substring(0, 150) + "..." : combined;

  if (!preview) return null;

  return (
    <p className="line-clamp-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
      {preview}
    </p>
  );
};

const PostListItem = ({ post, index }: { post: PostType; index: number }) => {
  const router = useRouter();
  const { createContext } = useContextMenu();
  const user: any = useUser();
  const toast = useToast();
  const { CreateDialogBox } = useModal();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  // Determine post type and parse data accordingly
  const postData = useMemo(() => {
    try {
      const data = post.data || {};
      const isTipTap = post.type === "post-tiptap" || !!data.tiptap;
      return {
        isTipTap,
        tiptap: data.tiptap as TipTapDoc | undefined,
        legacy: Array.isArray(data.data) ? data.data : [],
      };
    } catch {
      return { isTipTap: false, tiptap: undefined, legacy: [] };
    }
  }, [post.data, post.type]);

  // Fetch like status and count on mount
  useEffect(() => {
    const fetchLikeData = async () => {
      if (!user?.userData?.id) return;

      try {
        // @ts-ignore - likes table may not be in types yet
        const { data: likeData, error: likeError } = await (supabase as any)
          .from("post_likes")
          .select("created_at")
          .eq("post_id", post.id)
          .eq("user_id", user.userData.id)
          .maybeSingle();

        if (likeError) console.error(likeError);
        if (!likeError) {
          setIsLiked(!!likeData);
        }
      } catch (error) {
        console.error("Error fetching like data:", error);
      }
    };

    fetchLikeData();
    setLikeCount(post?.likes || 0);
  }, [post.id, user?.userData?.id, post?.likes]);

  // Optimized like handler with optimistic updates
  const handleLike = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!user?.userData?.id || isLiking) return;

      // Optimistic update
      const previousLiked = isLiked;
      const previousCount = likeCount;
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
      setIsLiking(true);

      try {
        // @ts-ignore - RPC function may not be in types yet
        const { error } = await supabase.rpc("toggle_post_like", {
          target: post.id,
        });

        if (error) throw error;
      } catch (error) {
        console.error("Error toggling like:", error);
        // Revert on error
        setIsLiked(previousLiked);
        setLikeCount(previousCount);
        toast.CreateErrorToast("Failed to update like");
      } finally {
        setIsLiking(false);
      }
    },
    [user?.userData?.id, isLiking, isLiked, likeCount, post.id, toast],
  );

  // Memoize context buttons to avoid recreating on every render
  const contextButtons = useMemo(
    () => [
      {
        name: "View Post",
        visible: true,
        function: () => {
          router.push(`/connect/social/post/${post.id}`);
        },
        icon: <IoChatboxEllipsesOutline />,
      },
      {
        name: "User Profile",
        visible: true,
        function: () => {
          router.push(`/connect/profile/${post.userid}`);
        },
        icon: <IoPersonOutline />,
      },
      {
        name: "Delete Post",
        visible:
          user?.userData?.id === post.userid ||
          user?.userData?.role === "admin",
        function: () =>
          CreateDialogBox(
            <div className="h-full">
              <h1 className="font-eudoxus text-2xl font-bold">
                Are You Sure You Would Like To Delete Post
              </h1>
              <h2>{post.title}</h2>
            </div>,
            async () => {
              const { error } = await supabase
                .from("posts")
                .delete()
                .eq("id", post.id);

              if (error) {
                console.error(error);
                toast.CreateErrorToast("Failed to delete post");
              } else {
                toast.CreateSuccessToast("Deleted Post!");
              }
            },
            {
              canUnmount: true,
              confirmText: "Delete Post",
              cancelText: "Cancel",
            },
          ),
        icon: <IoTrashBinOutline />,
      },
    ],
    [
      router,
      post.id,
      post.userid,
      user?.userData?.id,
      user?.userData?.role,
      CreateDialogBox,
      post.title,
      toast,
    ],
  );

  // Memoize formatted date
  const formattedDate = useMemo(() => {
    const now = new Date();
    const postDate = new Date(post.created_at);
    const diffInHours = Math.floor(
      (now.getTime() - postDate.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - postDate.getTime()) / (1000 * 60),
      );
      return diffInMinutes < 1 ? "Just now" : `${diffInMinutes}m ago`;
    }
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;

    return postDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        postDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  }, [post.created_at]);

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
      onContextMenu={(e) => {
        createContext(e, contextButtons);
      }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600 dark:hover:bg-slate-800">
        <Link href={`/connect/social/post/${post.id}`} className="block">
          {/* Header Section */}
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Avatar>
                <AvatarImage src={(post.creator as any)?.avatar_url} />
                <AvatarFallback>
                  {post.creator.realname?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              {/* Author Info */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-slate-900 dark:text-slate-100">
                  {post.creator.realname}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="truncate">@{post.creator.username}</span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <time className="flex flex-shrink-0 items-center gap-1">
                    <IoTimeOutline className="h-3.5 w-3.5" />
                    {formattedDate}
                  </time>
                </div>
              </div>
            </div>

            {/* Menu Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                createContext(e as any, contextButtons);
              }}
              className="flex-shrink-0 rounded-lg p-2 text-slate-400 opacity-0 transition-all hover:bg-slate-100 hover:text-slate-600 group-hover:opacity-100 dark:hover:bg-slate-700 dark:hover:text-slate-300"
            >
              <IoEllipsisVertical className="h-5 w-5" />
            </button>
          </div>

          {/* Title */}
          <h2 className="mb-3 line-clamp-2 text-xl font-bold leading-tight text-slate-900 dark:text-slate-50">
            {post.title}
          </h2>

          {/* Content Preview */}
          <div className="mb-4">
            {postData.isTipTap && postData.tiptap ? (
              <TipTapReadonly doc={postData.tiptap} />
            ) : postData.legacy.length > 0 ? (
              <LegacyViewer data={postData.legacy} />
            ) : null}
          </div>

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-800"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 4 && (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                  +{post.tags.length - 4} more
                </span>
              )}
            </div>
          )}
        </Link>

        {/* Bottom Interaction Bar */}
        <div className="mt-4 flex items-center gap-6 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          <Link
            href={`/connect/social/post/${post.id}`}
            className="flex items-center gap-1.5 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            <IoChatboxEllipsesOutline className="h-5 w-5" />
            <span className="font-medium">Discuss</span>
          </Link>

          <Link
            href={`/connect/profile/${post.userid}`}
            className="flex items-center gap-1.5 transition-colors hover:text-purple-600 dark:hover:text-purple-400"
          >
            <IoPersonOutline className="h-5 w-5" />
            <span className="font-medium">Profile</span>
          </Link>

          <button
            onClick={handleLike}
            disabled={isLiking}
            className="ml-auto flex items-center gap-1.5 transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:text-red-400"
          >
            {isLiked ? (
              <IoHeart className="h-5 w-5 text-red-500" />
            ) : (
              <IoHeartOutline className="h-5 w-5" />
            )}
            <span className="font-medium">{likeCount}</span>
          </button>
        </div>

        {/* Hover Effect Gradient */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-[0.02] dark:group-hover:opacity-[0.05]"></div>
      </div>
    </motion.article>
  );
};

export default PostListItem;
