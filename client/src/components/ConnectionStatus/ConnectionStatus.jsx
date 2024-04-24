import styled from "@emotion/styled";
import useEditor from "../../hooks/useEditor";
import StreamIcon from "@mui/icons-material/Stream";
import { IconButton, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Container = styled("div")({
  marginTop: "auto",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  paddingTop: 8,
  borderTop: "1px solid #00000021",
});

// show connection status
const ConnectionStatus = ({ props }) => {
  const { connected } = useEditor();
  const { user } = useAuth();
  return (
    <Container {...props}>
      <StreamIcon fontSize="small" color={connected ? "success" : "error"} />
      <Typography fontWeight={600}>{user.username}</Typography>
      <IconButton
        sx={{ ml: "auto" }}
        size="small"
        component={Link}
        to="/logout"
      >
        <ExitToAppIcon />
      </IconButton>
    </Container>
  );
};

export default ConnectionStatus;
