import { mdb } from "../server.js";
import { createShortCode } from "../utils.js";

export const createDocumentMeta = async (req, res) => {
  const docName = createShortCode();
  const fileName = "New Document";
  const result = await Promise.all([
    mdb.setMeta(docName, "user", req.session.userId),
    mdb.setMeta(docName, "fileName", fileName),
  ]);
  res.json({
    id: docName,
    fileName,
    user: "joshua",
  });
};

export const setDocumentMeta = async (req, res) => {
  const { id: docName } = req.params;
  const { fileName } = req.body;
  const result = await mdb.setMeta(docName, "fileName", fileName);
  res.json({ fileName, docName, status: "success" });
};

export const getDocumentMeta = async (req, res) => {
  const { id: docName } = req.params;
  const fileName = await mdb.getMeta(docName, "fileName");
  const user = await mdb.getMeta(docName, "user");
  res.json({ id: docName, fileName, user });
};

export const getDocuments = async (req, res) => {
  const docNames = await mdb.getAllDocNames();
  const documents = [];
  for (let docName of docNames) {
    const user = await mdb.getMeta(docName, "user");
    if (user && user === req.session.userId) {
      const fileName = await mdb.getMeta(docName, "fileName");
      documents.push({
        docName,
        user,
        fileName,
      });
    }
  }
  res.json({ documents });
};

// Update controller
export const updateDocument = (req, res) => {
  // Implement your logic to update a document by id
};

// Delete controller
export const deleteDocument = (req, res) => {
  // Implement your logic to delete a document by id
};
