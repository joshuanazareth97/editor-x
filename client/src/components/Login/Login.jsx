import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import usernameGenerator from "do_username";

const Login = () => {
  const [username, setUsername] = useState(usernameGenerator.generate(18));
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const result = await login(data.get("username"));
      navigate("/");
    } catch (err) {
      throw err;
    }
  };

  return user ? (
    <Navigate to="/" />
  ) : (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={(theme) => ({
          margin: theme.spacing(3),
          padding: theme.spacing(3),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        })}
      >
        <Typography component="h1" variant="h5">
          Enter a username
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
