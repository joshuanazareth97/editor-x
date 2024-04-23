import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { QuillBinding } from "y-quill";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { getDocumentMeta, setDocumentMeta } from "../../utils/api";
import { Typography } from "@mui/material";
import EditableInput from "../EditableInput/EditableInput";

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
  const [text, setText] = useState(null);
  const [provider, setProvider] = useState(null);
  const [filemeta, setFileMeta] = useState(null);
  const [fileMetaLoading, setFileMetaLoading] = useState(false);

  // check page params
  const { documentId } = useParams();

  useEffect(() => {
    if (!documentId) return;
    const doc = new Y.Doc();
    const yText = doc.getText("quill");
    const wsProvider = new WebsocketProvider(
      "ws://172.20.204.100:3001",
      documentId,
      doc
    );
    wsProvider.on("status", (event) => {
      console.log(event.status); // logs "connected" or "disconnected"
    });
    setText(yText);
    setProvider(wsProvider);

    return () => {
      doc?.destroy();
      wsProvider?.destroy();
    };
  }, [documentId]);

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

  // Set up Yjs and Quill
  useEffect(() => {
    let quill;
    let binding;

    if (!reactQuillRef.current || !provider || !yText) {
      return;
    }

    quill = reactQuillRef.current.getEditor();
    binding = new QuillBinding(yText, quill, provider.awareness);
    return () => {
      binding?.destroy?.();
    };
  }, [yText, provider]);

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
