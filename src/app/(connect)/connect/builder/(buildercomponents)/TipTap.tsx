{
  /*
   * Mostly due to complexities of the Text Editor (as well as performance worries and
   * customizablity worries) this package called TipTap will do the work for us.
   * */
}
import "katex/dist/katex.min.css";
import React, { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import CodeBlock from "@tiptap/extension-code-block";
import Code from "@tiptap/extension-code";
import ImageExtension from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import js from "highlight.js/lib/languages/javascript";
import java from "highlight.js/lib/languages/java";
import python from "highlight.js/lib/languages/python";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import css from "highlight.js/lib/languages/css";
import Mathematics from "@tiptap/extension-mathematics";
import StarterKit from "@tiptap/starter-kit";
import { BiBold, BiCodeBlock, BiHeading, BiItalic } from "react-icons/bi";
import { BiListOl } from "react-icons/bi";
import { BiListUl } from "react-icons/bi";
import { BiUndo } from "react-icons/bi";
import { BiRedo } from "react-icons/bi";
import { BiCode } from "react-icons/bi";
import { BiImage } from "react-icons/bi";
import { supabase } from "../../../../../../config/mesa-config";
import { useRef } from "react";

// Refine Enter behavior: default split for headings/paragraphs; Shift+Enter = hard break; newline in code
const EnterKeyFix = Extension.create({
  name: "enterKeyFix",
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        // Keep default behavior for lists, headings, paragraphs, etc.
        if (editor.isActive("codeBlock")) {
          return editor.commands.newlineInCode();
        }
        return false; // allow StarterKit to handle block splitting
      },
      "Shift-Enter": ({ editor }) => {
        return editor.chain().focus().setHardBreak().run();
      },
    };
  },
});

// define your extension array
const extensions = [
  StarterKit,
  ImageExtension.configure({ allowBase64: true }),
  EnterKeyFix,
  Mathematics.configure({
    katexOptions: {
      throwOnError: false,
      strict: "ignore",
      macros: {
        "\\RR": "\\mathbb{R}",
        "\\ZZ": "\\mathbb{Z}",
      },
    },
  }),
  CodeBlockLowlight.configure({
    lowlight: (() => {
      const ll = createLowlight(common);
      ll.register("javascript", javascript);
      ll.register("java", java);
      ll.register("python", python);
      ll.register("c", c);
      ll.register("cpp", cpp);
      ll.register("csharp", csharp);
      ll.register("css", css);
      return ll;
    })(),
  }),
  Code,
];

const content = ``;

const Tiptap = ({
  json,
  components,
}: {
  json: (JSONFile: any) => void;
  components: any;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions,
    content,

    editorProps: {
      attributes: {
        class:
          "ProseMirror min-h-[280px] w-full resize-y rounded-b-xl border-0 border-t border-zinc-200 bg-white px-5 py-4 text-base text-zinc-800 outline-none transition-colors placeholder:text-zinc-400 focus:ring-0 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-zinc-900 [&_h1]:dark:text-zinc-50 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_pre]:rounded-lg [&_pre]:bg-zinc-100 [&_pre]:p-4 [&_pre]:dark:bg-zinc-700 [&_code]:rounded [&_code]:bg-zinc-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_pre_code]:bg-transparent [&_pre_code]:p-0",
      },
    },
    onCreate: ({ editor }) => {
      json(editor?.getJSON());
    },
    onUpdate: ({ editor }) => {
      json(editor?.getJSON());
    },
  });

  const btn =
    "flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-40 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-zinc-100";
  const btnActive =
    "border-orange-500 bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400";

  const onInsertBlockMath = useCallback(() => {
    const hasSelection = !editor?.state.selection.empty;

    if (hasSelection) {
      return editor
        ?.chain()
        .insertContent({
          type: "blockMath",
          content: [{ type: "text", text: "" }],
        })
        .focus()
        .run();
    }

    const latex = prompt("Enter block math expression:", "");
    return editor
      ?.chain()
      .insertContent({
        type: "blockMath",
        content: [{ type: "text", text: latex || "" }],
      })
      .focus()
      .run();
  }, [editor]);

  const onRemoveBlockMath = useCallback(() => {
    editor?.chain().deleteNode("blockMath").focus().run();
  }, [editor]);

  const onInsertInlineMath = useCallback(() => {
    const hasSelection = !editor?.state.selection.empty;

    if (hasSelection) {
      return editor
        ?.chain()
        .insertContent({
          type: "inlineMath",
          content: [{ type: "text", text: "" }],
        })
        .focus()
        .run();
    }

    const latex = prompt("Enter inline math expression:", "");
    return editor
      ?.chain()
      .insertContent({
        type: "inlineMath",
        content: [{ type: "text", text: latex || "" }],
      })
      .focus()
      .run();
  }, [editor]);

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-600 dark:bg-zinc-800">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-zinc-200 bg-zinc-50/80 p-2 dark:border-zinc-600 dark:bg-zinc-800/50">
        {/* Formatting */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            title="Heading 1"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            disabled={
              !editor ||
              !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`${btn} ${editor?.isActive("heading", { level: 1 }) ? btnActive : ""}`}
          >
            <BiHeading className="text-lg" />
          </button>
          <button
            type="button"
            title="Bold"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={
              !editor || !editor.can().chain().focus().toggleBold().run()
            }
            className={`${btn} ${editor?.isActive("bold") ? btnActive : ""}`}
          >
            <BiBold className="text-lg" />
          </button>
          <button
            type="button"
            title="Italic"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            disabled={
              !editor || !editor.can().chain().focus().toggleItalic().run()
            }
            className={`${btn} ${editor?.isActive("italic") ? btnActive : ""}`}
          >
            <BiItalic className="text-lg" />
          </button>
          <button
            type="button"
            title="Inline code"
            onClick={() => editor?.chain().focus().toggleCode().run()}
            disabled={
              !editor || !editor.can().chain().focus().toggleCode().run()
            }
            className={`${btn} ${editor?.isActive("code") ? btnActive : ""}`}
          >
            <BiCode className="text-sm" />
          </button>
        </div>

        <span
          className="mx-1 h-5 w-px bg-zinc-200 dark:bg-zinc-600"
          aria-hidden
        />

        {/* Lists */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            title="Bullet list"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`${btn} ${editor?.isActive("bulletList") ? btnActive : ""}`}
          >
            <BiListUl className="text-lg" />
          </button>
          <button
            type="button"
            title="Numbered list"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`${btn} ${editor?.isActive("orderedList") ? btnActive : ""}`}
          >
            <BiListOl className="text-lg" />
          </button>
        </div>

        <span
          className="mx-1 h-5 w-px bg-zinc-200 dark:bg-zinc-600"
          aria-hidden
        />

        {/* Insert */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            title="Image from URL"
            onClick={() => {
              const url =
                typeof window !== "undefined"
                  ? window.prompt("Image URL")
                  : null;
              if (url) editor?.chain().focus().setImage({ src: url }).run();
            }}
            className={btn}
          >
            <BiImage className="text-lg" />
          </button>
          <button
            type="button"
            title="Upload image"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Upload
          </button>
          <button
            type="button"
            title="Code block"
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            disabled={
              !editor || !editor.can().chain().focus().toggleCodeBlock().run()
            }
            className={`${btn} ${editor?.isActive("codeBlock") ? btnActive : ""}`}
          >
            <BiCodeBlock className="text-lg" />
          </button>
          <select
            title="Code language"
            value={
              (editor?.getAttributes("codeBlock")?.language as string) ??
              "javascript"
            }
            onChange={(e) =>
              editor
                ?.chain()
                .focus()
                .updateAttributes("codeBlock", { language: e.target.value })
                .run()
            }
            className="h-9 rounded-lg border border-zinc-200 bg-white px-2 text-xs text-zinc-600 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          >
            <option value="javascript">JS</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
          </select>
          <button
            type="button"
            title="Block math"
            onClick={() => onInsertBlockMath()}
            className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Block math
          </button>
          <button
            type="button"
            title="Inline math"
            onClick={() => onInsertInlineMath()}
            className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Inline math
          </button>
        </div>

        <span
          className="mx-1 h-5 w-px bg-zinc-200 dark:bg-zinc-600"
          aria-hidden
        />

        {/* History */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            title="Undo"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().chain().focus().undo().run()}
            className={btn}
          >
            <BiUndo className="text-lg" />
          </button>
          <button
            type="button"
            title="Redo"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().chain().focus().redo().run()}
            className={btn}
          >
            <BiRedo className="text-lg" />
          </button>
        </div>
      </div>

      {/* Image alignment (when image selected) */}
      {editor?.isActive("image") && (
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 bg-zinc-100/50 px-2 py-1.5 dark:border-zinc-600 dark:bg-zinc-700/30">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Image
          </span>
          <button
            type="button"
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .updateAttributes("image", {
                  style: "float:left; margin-right: 12px; max-width: 50%;",
                })
                .run()
            }
            className="rounded px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-600"
          >
            Left
          </button>
          <button
            type="button"
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .updateAttributes("image", {
                  style: "float:right; margin-left: 12px; max-width: 50%;",
                })
                .run()
            }
            className="rounded px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-600"
          >
            Right
          </button>
          <button
            type="button"
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .updateAttributes("image", {
                  style: "display:block; margin: 8px auto; max-width: 100%;",
                })
                .run()
            }
            className="rounded px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-600"
          >
            Center
          </button>
          <button
            type="button"
            onClick={() => {
              const width =
                typeof window !== "undefined"
                  ? window.prompt("Image width (e.g. 400px or 50%)")
                  : null;
              if (width)
                editor
                  ?.chain()
                  .focus()
                  .updateAttributes("image", {
                    style: `display:block; margin: 8px auto; max-width: 100%; width:${width};`,
                  })
                  .run();
            }}
            className="rounded px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-600"
          >
            Resize
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={async (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          try {
            const path = `inline/${Date.now()}-${file.name}`;
            const { error: uploadError } = await supabase.storage
              .from("NewsPictures")
              // @ts-ignore
              .upload(path, file);
            if (uploadError) {
              console.error(uploadError);
              if (typeof window !== "undefined") alert(uploadError.message);
              return;
            }
            const { data } = supabase.storage
              .from("NewsPictures")
              .getPublicUrl(path);
            const publicUrl = data.publicUrl;
            editor &&
              editor
                .chain()
                .focus()
                .setImage({ src: publicUrl, alt: file.name })
                .run();
          } catch (err: any) {
            console.error(err);
            if (typeof window !== "undefined") alert("Failed to upload image");
          } finally {
            // reset input to allow same file selection again
            if (e.target) e.target.value = "";
          }
        }}
      />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
