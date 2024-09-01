import multer from "multer";

//MULTER IMPLIMENTATION

const storage = multer.memoryStorage();

export const singleUpload = multer({ storage }).single("file");
