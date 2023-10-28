import dynamic from "next/dynamic";
import { EditorProps, EditorState } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function RichEditor(props: {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}) {
  const { editorState, setEditorState } = props;
  return (
    <Editor
      wrapperClassName="w-full mt-2 border rounded"
      editorClassName="h-72 p-2"
      toolbarClassName="toolbar-class"
      editorState={editorState}
      onEditorStateChange={setEditorState}
    />
  );
}
