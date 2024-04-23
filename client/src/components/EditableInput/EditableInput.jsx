import styled from "@emotion/styled";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

const CustomTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1) + " " + 0,
  "& .MuiInputBase-input": {
    fontSize: "14px",
    padding: theme.spacing(1),
  },
  "& .MuiInputBase-readOnly ~ fieldset": {
    border: 0,
  },
  " .MuiInputAdornment-root svg": {
    fontSize: "14px",
  },
  "&:not(:hover) .MuiInputBase-adornedEnd .MuiInputAdornment-root:not(.loading)":
    {
      visibility: "hidden",
    },
}));

// this field is uneditable until it is clicked on
const EditableInput = ({ onChange, value, loading, ...props }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange?.(editValue);
  };

  return (
    <CustomTextField
      {...props}
      key={value}
      value={!loading ? editValue : "Loading..."}
      onChange={(e) => setEditValue(e.target.value)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      // disabled={!isEditing}
      InputProps={{
        startAdornment: "📄",
        readOnly: !isEditing,
        endAdornment: (
          <InputAdornment className={loading ? "loading" : ""} position="end">
            {loading ? <CircularProgress size={14} /> : <EditIcon />}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default EditableInput;
