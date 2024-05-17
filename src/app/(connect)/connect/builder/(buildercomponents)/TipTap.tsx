{/*
* Mostly due to complexities of the Text Editor (as well as performance worries and
* customizablity worries) this package called TipTap will do the work for us.
* */}

import React from 'react'
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// define your extension array
const extensions = [
    StarterKit,
]

const content = '<p>Write something down!</p>'

const Tiptap = ({ json } : { json: (JSONFile: any) => void }) => {
    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: "p-4 shadow-md bg-white min-h-96 font-eudoxus focus:outline-none hover:scale-[1.01] focus:scale-[1.01] duration-300 w-full rounded-2xl px-6 "
            }
        },
        onUpdate: ({ editor }) => {
            json(editor?.getJSON())
        }
    })

    return (
        <React.Fragment>
            <EditorContent editor={editor} />
            <FloatingMenu editor={editor} className="text-slate-500">Write down some text...</FloatingMenu>
            {/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
        </React.Fragment>
    )
}

export default Tiptap