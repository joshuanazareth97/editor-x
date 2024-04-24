import { useContext, useEffect, useState } from "react";
import { EditorContext } from "./EditorContext";

const useEditor = (documentId) => {
  const { text, provider, setDocumentId } = useContext(EditorContext);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setDocumentId(documentId);
  }, [documentId, setDocumentId]);

  // expose connection status
  useEffect(() => {
    if (!provider) return;
    const statusHandler = (event) => {
      switch (event.status) {
        case "connected":
          setConnected(true);
          break;
        case "disconnected":
          setConnected(false);
          break;
        default:
          break;
      }
      console.log("Client is:", event.status);
    };
    provider.on("status", statusHandler);
    return () => {
      provider.off("status", statusHandler);
    };
  }, [provider]);

  return { text, provider, connected };
};

export default useEditor;
