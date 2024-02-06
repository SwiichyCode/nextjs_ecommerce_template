import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

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
