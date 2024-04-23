import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";

const FileItem = styled(ListItem)(({ theme }) => ({
  alignItems: "baseline",
  gap: theme.spacing(1),
  color: theme.palette.text.primary.main,
  cursor: "pointer",
  fontSize: "14px",
  "&:hover": {
    color: theme.palette.text.primary.dark,
  },
  "&:not(:hover) .MuiListItemSecondaryAction-root": {
    display: "none",
  },
}));

const FileNameText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary.main,
  fontSize: "12px",
  fontWeight: 600,
  "&.active": {
    color: theme.palette.primary.main,
  },
}));

const File = ({ onClick, onDelete, file, active }) => {
  return (
    <FileItem
      onClick={() => onClick?.(file)}
      secondaryAction={
        active ? null : (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(file);
            }}
            size="small"
            edge="end"
            aria-label="delete"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )
      }
    >
      <ListItemAvatar sx={{ minWidth: 0 }}>📄</ListItemAvatar>
      <FileNameText className={active ? "active" : ""}>
        {file?.fileName || "test single file long anme"}
      </FileNameText>
    </FileItem>
  );
};

export default File;
