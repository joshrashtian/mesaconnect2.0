import { Database } from './../../database.types';
import { PostType } from '@/_assets/types';


type PublicSchema = Database["public"];
export type PostInsert = PublicSchema["Tables"]["posts"]["Insert"];

export type Visibility = PublicSchema["Enums"]["visibility"];
export type PostTypeEnum = PublicSchema["Enums"]["postType"];

type LegacySection = {
  type: "text" | "code" | "initial";
  text?: string;
};

export type EditorMode = "legacy" | "tiptap";

export function buildPostInsert(params: {
  userId: string;
  title?: string;
  editor: EditorMode;
  tiptapDoc?: unknown;
  sections?: LegacySection[];
  tags?: string[] | null;
  relations?: string[] | null;
  visibility?: Visibility;
  images?: boolean | null;
  creator?: { id: string; realname?: string | null; username?: string | null };
}): PostInsert {
  const { userId, title, editor, tiptapDoc, sections, tags, relations, visibility, images, creator } = params;

  const isRich = editor === "tiptap";
  const dataPayload = isRich
    ? { tiptap: tiptapDoc }
    : {
        data: (sections ?? []).map((section) => {
          if (section.type === "code") return { type: "code", text: section.text };
          return { type: "text", text: section.text };
        }),
      };

  const insert: PostInsert = {
    userid: userId,
    title: title ?? null,
    data: dataPayload as PostInsert["data"],
    type: "post",
    creator: creator
      ? {
          id: creator.id,
          realname: creator.realname ?? undefined,
          username: creator.username ?? undefined,
        }
      : undefined,
    tags: tags ?? undefined,
    relations: relations ?? undefined,
    visibilty: visibility ?? undefined,
    images: images ?? undefined,
  };

  return insert;
}

// Minimal TipTap node model for our usage (paragraphs, code blocks, text)
export type TipTapTextNode = { type: "text"; text: string };
export type TipTapParagraphNode = { type: "paragraph"; content?: TipTapTextNode[] };
export type TipTapCodeBlockNode = {
  type: "codeBlock";
  attrs?: { language?: string | null };
  content?: TipTapTextNode[];
};
export type TipTapDoc = {
  type: "doc";
  content?: Array<TipTapParagraphNode | TipTapCodeBlockNode>;
};

export type TipTapPost = Omit<PostType, "data"> & {
  data: {
    tiptap: TipTapDoc;
  };
};
