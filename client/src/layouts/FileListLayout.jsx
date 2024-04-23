import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import FileList from "../components/FileList/FileList";
import SearchBar from "../components/SearchBar/SearchBar";
import { EmphasizedButton } from "../components/custom-components";
import { createDocumentMeta, getDocuments } from "../utils/api";

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

  const handleFileCreate = async () => {
    const createResult = await createDocumentMeta();
    const { id } = createResult.data;
    navigate(`/${id}`);
  };

  useEffect(() => {
    getDocuments().then((docResult) => {
      setDocuments(docResult.data?.documents ?? []);
    });
  }, []);

  return (
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
        <FileList files={documents} />
      </Sidebar>
      <Contents>
        <Outlet />
      </Contents>
    </Container>
  );
};

export default FileListLayout;
