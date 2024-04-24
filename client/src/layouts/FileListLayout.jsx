import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ConnectionStatus from "../components/ConnectionStatus/ConnectionStatus";
import FileList from "../components/FileList/FileList";
import SearchBar from "../components/SearchBar/SearchBar";
import { EmphasizedButton } from "../components/custom-components";
import { EditorProvider } from "../hooks/EditorContext";
import { useInterval } from "../hooks/usePoll";
import { createDocumentMeta, getDocuments } from "../utils/api";
import { LinearProgress } from "@mui/material";

const Container = styled("div")`
  display: flex;
  height: 100vh;
`;

const Contents = styled("div")`
  flex: 1;
`;

const Sidebar = styled("div")(({ theme }) => ({
  minWidth: "25%",
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: theme.spacing(2),
}));

const FileListLayout = () => {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [docsLoading, setDocsLoading] = useState(true);

  const handleFileCreate = async () => {
    const createResult = await createDocumentMeta();
    const { id } = createResult.data;
    navigate(`/${id}`);
  };

  useInterval(() => {
    getDocuments()
      .then((docResult) => {
        setDocuments(docResult.data?.documents ?? []);
      })
      .finally(() => setDocsLoading(false));
  }, 3000);

  useEffect(() => {}, []);

  return (
    <EditorProvider>
      <Container>
        <Sidebar>
          <EmphasizedButton
            onClick={handleFileCreate}
            endIcon={<AddIcon />}
            variant="contained"
          >
            Create Document
          </EmphasizedButton>
          <SearchBar />
          {docsLoading ? <LinearProgress /> : <FileList files={documents} />}
          <ConnectionStatus />
        </Sidebar>
        <Contents>
          <Outlet />
        </Contents>
      </Container>
    </EditorProvider>
  );
};

export default FileListLayout;
