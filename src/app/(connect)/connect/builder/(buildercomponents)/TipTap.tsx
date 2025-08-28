{
  /*
   * Mostly due to complexities of the Text Editor (as well as performance worries and
   * customizablity worries) this package called TipTap will do the work for us.
   * */
}

import React from "react";
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

type Components = {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  className: string;
};

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
          "ProseMirror p-4 shadow-md bg-white min-h-96 font-eudoxus focus:outline-none hover:scale-[1.01] focus:scale-[1.01] duration-300 w-full rounded-2xl px-6 ",
      },
    },
    onCreate: ({ editor }) => {
      json(editor?.getJSON());
    },
    onUpdate: ({ editor }) => {
      json(editor?.getJSON());
    },
  });

  const editorComponents: Components[] = [
    {
      name: "Code",
      icon: <BiCode />,
      onClick: () => {
        editor?.chain().focus().toggleCode().run();
      },
      disabled: false,
      className: "rounded-md px-5 py-3 font-eudoxus text-sm shadow",
    },
    {
      name: "Code Block",
      icon: <BiCodeBlock />,
      onClick: () => {
        editor?.chain().focus().toggleCodeBlock().run();
      },
      disabled: false,
      className: "rounded-md px-5 py-3 font-eudoxus text-sm shadow",
    },
  ];

  return (
    <React.Fragment>
      <div className="mb-2 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-zinc-200 p-2">
        <button
          type="button"
          onClick={() =>
            editor && editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          disabled={
            !editor ||
            !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`rounded-md px-5 py-3 font-eudoxus text-sm shadow ${editor?.isActive("heading", { level: 1 }) ? "bg-slate-800 text-white" : "bg-white/80"} disabled:opacity-50`}
        >
          <BiHeading />
        </button>

        <button
          type="button"
          onClick={() => editor && editor.chain().focus().toggleBold().run()}
          disabled={!editor || !editor.can().chain().focus().toggleBold().run()}
          className={`rounded-md px-5 py-3 font-eudoxus text-sm shadow ${editor?.isActive("bold") ? "bg-slate-800 text-white" : "bg-white/80"} disabled:opacity-50`}
        >
          <BiBold />
        </button>
        <button
          type="button"
          onClick={() => editor && editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor || !editor.can().chain().focus().toggleItalic().run()
          }
          className={`rounded-md px-5 py-3 font-eudoxus text-sm shadow ${editor?.isActive("italic") ? "bg-slate-800 text-white" : "bg-white/80"} disabled:opacity-50`}
        >
          <BiItalic />
        </button>
        <button
          type="button"
          onClick={() =>
            editor && editor.chain().focus().toggleBulletList().run()
          }
          className={`rounded-md px-5 py-3 font-eudoxus text-sm shadow ${editor?.isActive("bulletList") ? "bg-slate-800 text-white" : "bg-white/80"}`}
        >
          <BiListOl />
        </button>
        <button
          type="button"
          onClick={() =>
            editor && editor.chain().focus().toggleOrderedList().run()
          }
          className={`rounded-md px-5 py-3 font-eudoxus text-sm shadow ${editor?.isActive("orderedList") ? "bg-slate-800 text-white" : "bg-white/80"}`}
        >
          <BiListUl />
        </button>
        <button
          type="button"
          onClick={() => {
            const url =
              typeof window !== "undefined" ? window.prompt("Image URL") : null;
            if (!url) return;
            editor && editor.chain().focus().setImage({ src: url }).run();
          }}
          className="rounded-md bg-white/80 px-5 py-3 font-eudoxus text-sm shadow"
        >
          <BiImage />
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="h-10 rounded-md bg-white/80 px-5 py-3 font-eudoxus text-sm shadow disabled:opacity-50"
        >
          Upload Image
        </button>
        <button
          type="button"
          onClick={() =>
            editor && editor.chain().focus().toggleCodeBlock().run()
          }
          disabled={
            !editor || !editor.can().chain().focus().toggleCodeBlock().run()
          }
          className="h-10 rounded-md bg-white/80 px-5 py-3 font-eudoxus text-sm shadow disabled:opacity-50"
        >
          <BiCode />
        </button>
        <select
          value={editor?.getAttributes("codeBlock")?.language as string}
          onChange={(e) =>
            editor &&
            editor
              .chain()
              .focus()
              .updateAttributes("codeBlock", { language: e.target.value })
              .run()
          }
          className="h-10 rounded-md bg-white/80 px-3 py-2 font-eudoxus text-sm shadow disabled:opacity-50"
        >
          <option value="javascript">JavaScript</option>
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
          onClick={() => editor && editor.chain().focus().undo().run()}
          disabled={!editor || !editor.can().chain().focus().undo().run()}
          className="rounded-md bg-white/80 px-5 py-3 font-eudoxus text-sm shadow disabled:opacity-50"
        >
          <BiUndo />
        </button>
        <button
          type="button"
          onClick={() => editor && editor.chain().focus().redo().run()}
          disabled={!editor || !editor.can().chain().focus().redo().run()}
          className="rounded-md bg-white/80 px-5 py-3 font-eudoxus text-sm shadow disabled:opacity-50"
        >
          <BiRedo />
        </button>
      </div>
      {editor?.isActive("image") && (
        <div className="mb-2 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-zinc-100 p-2">
          <button
            type="button"
            onClick={() =>
              editor &&
              editor
                .chain()
                .focus()
                .updateAttributes("image", {
                  style: "float:left; margin-right: 12px; max-width: 50%;",
                })
                .run()
            }
            className="rounded-md bg-white/80 px-5 py-3 font-eudoxus text-sm shadow"
          >
            Align Left
          </button>
          <button
            type="button"
            onClick={() =>
              editor &&
              editor
                .chain()
                .focus()
                .updateAttributes("image", {
                  style: "float:right; margin-left: 12px; max-width: 50%;",
                })
                .run()
            }
            className="rounded-md bg-white/80 px-5 py-3 font-eudoxus text-sm shadow"
          >
            Align Right
          </button>
          <button
            type="button"
            onClick={() =>
              editor &&
              editor
                .chain()
                .focus()
                .updateAttributes("image", {
                  style: "display:block; margin: 8px auto; max-width: 100%;",
                })
                .run()
            }
            className="rounded-md bg-white/80 px-5 py-3 font-eudoxus text-sm shadow"
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
              if (!width) return;
              editor &&
                editor
                  .chain()
                  .focus()
                  .updateAttributes("image", {
                    style: `display:block; margin: 8px auto; max-width: 100%; width:${width};`,
                  })
                  .run();
            }}
            className="rounded-md bg-white/80 px-5 py-3 font-eudoxus text-sm shadow"
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
    </React.Fragment>
  );
};

export default Tiptap;
