import { v4 as uuidv4 } from "uuid";
let users = {};

export function login(req, res) {
  const { username } = req.body;
  if (!username) {
    return res.status(400).send("Username is required");
  }
  // create a uuid
  const userId = uuidv4();
  req.session.username = username; // Store username in session
  req.session.userId = userId; // Store username in session
  res
    .status(200)
    .json({
      status: "ok",
      message: `Logged in as ${username}`,
      username,
      userId,
    });
}

export function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to logout");
    }
    res.status(200).json({ status: "ok", message: "Logout successful" });
  });
}
