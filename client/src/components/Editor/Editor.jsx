import styled from "@emotion/styled";
import QuillCursors from "quill-cursors";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { QuillBinding } from "y-quill";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { getDocumentMeta, setDocumentMeta } from "../../utils/api";
import EditableInput from "../EditableInput/EditableInput";
import useAuth from "../../hooks/useAuth";
import useEditor from "../../hooks/useEditor";
import { randomColor } from "do_username/lib/private_functions";

Quill.register("modules/cursors", QuillCursors);

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "code"],
    ["clean"],
  ],
  history: {
    userOnly: true,
  },
  cursors: true,
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code",
];

const Editor = () => {
  const [filemeta, setFileMeta] = useState(null);
  const [fileMetaLoading, setFileMetaLoading] = useState(false);

  // check page params
  const { documentId } = useParams();

  const { text, provider } = useEditor(documentId);

  useEffect(() => {
    if (!documentId) return;
    setFileMetaLoading(true);
    getDocumentMeta(documentId)
      .then((res) => {
        setFileMeta(res.data);
      })
      .finally(() => {
        setFileMetaLoading(false);
      });
  }, [documentId]);

  const handleFileName = async (newFileName) => {
    const oldFile = filemeta.fileName;
    try {
      setFileMeta({ ...filemeta, fileName: newFileName });
      const fileChangeResult = await setDocumentMeta(documentId, newFileName);
    } catch (err) {
      setFileMeta({ ...filemeta, fileName: oldFile });
    }
  };

  return (
    <>
      {filemeta ? (
        <EditableInput
          loading={fileMetaLoading}
          key={filemeta.fileName}
          value={filemeta.fileName}
          onChange={handleFileName}
        />
      ) : null}
      <QuillEditor yText={text} provider={provider} />
    </>
  );
};

const EditorContainer = styled("div")`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 12px;
  background: #fff;
  width: 100%;
  color: #111827;
`;

const QuillEditor = ({ yText, provider }) => {
  const reactQuillRef = useRef(null);
  const { user } = useAuth();

  // Set up Yjs and Quill
  useEffect(() => {
    let quill;
    let binding;

    if (!reactQuillRef.current || !provider || !yText) {
      return;
    }

    quill = reactQuillRef.current.getEditor();
    provider.awareness.setLocalStateField("user", {
      name: user.username,
      color: randomColor({
        luminosity: "dark",
      }),
    });

    binding = new QuillBinding(yText, quill, provider.awareness);
    return () => {
      binding?.destroy?.();
    };
  }, [yText, provider, user]);

  return (
    <EditorContainer>
      <ReactQuill
        placeholder="Let's write an epic..."
        ref={reactQuillRef}
        theme="snow"
        modules={modules}
        formats={formats}
      />
    </EditorContainer>
  );
};

Editor.QuillEditor = QuillEditor;

export default Editor;
