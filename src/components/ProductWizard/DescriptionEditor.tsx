import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useFormContext } from "react-hook-form";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";

export default function DescriptionEditor() {
  const { register, setValue, watch } = useFormContext();
  const description = watch("description");
  const editor = useEditor({
    extensions: [StarterKit],
    content: description || "",
    immediatelyRender: false, // avoid SSR hydration mismatch
    onUpdate: ({ editor }) => {
      setValue("description", editor.getHTML());
    },
  });

  if (!editor) return null;
  return (
    <div className="col-span-12">
      <label className="inline-block mb-2">Description</label>
      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded border ${
            editor.isActive("bold") ? "bg-blue-600 text-white" : "bg-white"
          }`}>
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded border ${
            editor.isActive("italic") ? "bg-blue-600 text-white" : "bg-white"
          }`}>
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 rounded border ${
            editor.isActive("strike") ? "bg-blue-600 text-white" : "bg-white"
          }`}>
          Strike
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded border ${
            editor.isActive("bulletList")
              ? "bg-blue-600 text-white"
              : "bg-white"
          }`}>
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded border ${
            editor.isActive("orderedList")
              ? "bg-blue-600 text-white"
              : "bg-white"
          }`}>
          1. List
        </button>
      </div>

      {/* Editor area */}
      <div className="border rounded bg-white min-h-[250px] editor-wrapper">
        <EditorContent
          editor={editor}
          className="h-full tiptap-editor-content"
        />
      </div>

      {/* Hidden input for react-hook-form */}
      <input type="hidden" {...register("description")} />
    </div>
  );
}
