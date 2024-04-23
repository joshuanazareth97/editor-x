import { customAlphabet } from "nanoid";

export const createShortCode = (length = 10) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nanoid = customAlphabet(chars, length);
  return nanoid();
};
