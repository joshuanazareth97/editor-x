import { ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./404";
import "./App.css";
import Editor from "./components/Editor/Editor";
import FileListLayout from "./layouts/FileListLayout";
import { theme } from "./theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FileListLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/:documentId",
        element: <Editor />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
