-- Add 'announcement' (and 'post-tiptap' if missing) to the posts type enum.
-- If your enum is named differently (e.g. post_type), rename "postType" in the statements below.

ALTER TYPE "postType" ADD VALUE IF NOT EXISTS 'post-tiptap';
ALTER TYPE "postType" ADD VALUE IF NOT EXISTS 'announcement';
