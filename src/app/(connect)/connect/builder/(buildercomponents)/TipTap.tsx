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

import StarterKit from "@tiptap/starter-kit";
import { BiBold, BiCodeBlock, BiItalic } from "react-icons/bi";
import { BiListOl } from "react-icons/bi";
import { BiListUl } from "react-icons/bi";
import { BiUndo } from "react-icons/bi";
import { BiRedo } from "react-icons/bi";
import { BiCode } from "react-icons/bi";
import { BiImage } from "react-icons/bi";

// Intercept Enter to insert a hard break to avoid Enter crash paths
const EnterKeyFix = Extension.create({
  name: "enterKeyFix",
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        // Preserve default behavior in lists
        if (editor.isActive("bulletList") || editor.isActive("orderedList")) {
          return false;
        }
        // Fallback to hard break elsewhere
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
  CodeBlock,
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
          onClick={() =>
            editor && editor.chain().focus().toggleCodeBlock().run()
          }
          disabled={
            !editor || !editor.can().chain().focus().toggleCodeBlock().run()
          }
          className="rounded-md bg-white/80 px-5 py-3 font-eudoxus text-sm shadow disabled:opacity-50"
        >
          <BiCode />
        </button>
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
      <EditorContent editor={editor} />
    </React.Fragment>
  );
};

export default Tiptap;
