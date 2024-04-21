import dotenv from "dotenv";

dotenv.config();

const settings = {
  port: process.env.PORT || 4000,
  secret: process.env.SECRET || "joshua n",
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017",
};

// check explicit in prod
if (process.env.environment === "production") {
  if (!process.env.MONGO_URL)
    throw new Error("Please define the MONGO_URL environment variable");
  if (!process.env.SECRET)
    throw new Error("Please define the SECRET environment variable");
}

export default settings;
