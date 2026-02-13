// src/components/TiptapEditor.js
import React, { useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TiptapEditor = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML())
    },
  })

  useEffect(() => {
    return () => editor?.destroy()
  }, [editor])

  return (
    <div className="border border-gray-300 rounded p-2 min-h-[150px] bg-white">
      <EditorContent editor={editor} />
    </div>
  )
}

export default TiptapEditor
