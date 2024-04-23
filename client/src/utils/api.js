import axios from "axios";

// Auth Routes
export const apiLogin = async (username) => {
  return await axios.post("/api/user/login", { username });
};

export const apiLogout = async () => {
  return await axios.post("/api/user/logout");
};

// Document Routes

export const createDocumentMeta = async () => {
  return await axios.post("/api/document");
};

export const updateDocumentMeta = async (docName, fileName) => {
  return await axios.put(`/api/document/${docName}`, { fileName });
};

export const getDocumentMeta = async (docName) => {
  return await axios.get(`/api/document/${docName}`);
};

export const setDocumentMeta = async (docName, fileName) => {
  return await axios.put(`/api/document/${docName}`, { fileName });
};

export const getDocuments = async () => {
  return await axios.get("/api/document");
};
