import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";

type Props = {
  content: string;
};

export const Editor = ({ content }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({})],
    content: content,
    editable: false,
  });
  return <EditorContent editor={editor} />;
};
