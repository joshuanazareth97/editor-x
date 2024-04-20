import express, { static as expressStatic } from "express";
import { default as router } from "./routes/user";

const app = express();
const PORT = process.env.PORT || 5000;

// in production, serve static files from the React app
if (process.env.NODE_ENV === "production") {
  app.use(expressStatic("client/build"));
}

app.get("/ping", (req, res) => {
  res.send("Pong");
});

app.use("/api/user", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
