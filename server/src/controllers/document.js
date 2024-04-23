export const createDocument = async () => {
  const ydoc = new Y.Doc();
  // await mdb.storeUpdate(docName, Y.encodeStateAsUpdate(ydoc));
  return ydoc;
};

export const getDocument = async () => {
  // const stateVector = await mdb.getStateVector(docName);
  // const update = await mdb.getDiff(docName, stateVector);
  // const ydoc = new Y.Doc();
  // Y.applyUpdate(ydoc, update);
  // return ydoc;
  return {};
};

export const getDocuments = async () => {
  // const stateVector = await mdb.getStateVector(docName);
  // const update = await mdb.getDiff(docName, stateVector);
  // const ydoc = new Y.Doc();
  // Y.applyUpdate(ydoc, update);
  // return ydoc;
  return {};
};

// Update controller
export const updateDocument = (req, res) => {
  // Implement your logic to update a document by id
};

// Delete controller
export const deleteDocument = (req, res) => {
  // Implement your logic to delete a document by id
};
