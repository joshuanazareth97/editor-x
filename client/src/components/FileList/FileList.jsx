import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import File from "../File/File";
import { HeaderTypography, InfoTypography } from "../custom-components";

// make every 2nd list item a different colour
const HighlightedListItem = styled(ListItem)(({ theme }) => ({
  alignItems: "baseline",
  gap: theme.spacing(1),
  color: theme.palette.text.primary.main,
  fontSize: "14px",
  "&:hover": {
    color: theme.palette.text.primary.dark,
  },
  "&:.active": {
    color: theme.palette.primary.main,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const NoItems = () => {
  return (
    <InfoTypography>
      No files found.
      <br />
      Create one by clicking on the button above.
    </InfoTypography>
  );
};

const FileList = ({ files }) => {
  const navigate = useNavigate();
  const handleFileDelete = () => {};

  const handleFileClick = (file) => {
    navigate(`/${file.docName}`);
  };

  // TODO:
  // - search API
  // - Get files
  // - click on file navigate

  return (
    <>
      <HeaderTypography>Your Files</HeaderTypography>
      {!files?.length ? (
        <NoItems />
      ) : (
        <List>
          {files.map((file) => (
            <File
              key={file.docName}
              file={file}
              onClick={handleFileClick}
              onDelete={handleFileDelete}
            />
          ))}
        </List>
      )}
    </>
  );
};

export default FileList;
