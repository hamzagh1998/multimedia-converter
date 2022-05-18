const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const multer  = require("multer");
const storage = multer.diskStorage(
  { 
    destination(req, file, cb) {
      cb(null, "/uploads/docs");
    },
    filename(req, file, cb) {
      cb(null, file.originalname + uuidv4());
    }
  }
);

const upload = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 * 200 } })
                .array("payload", 200); // 200 mb

const DocRouter = Router();

DocRouter.get("/get-doc/:slug", (req, res) => res.sendFile(__dirname+`/uploads/docs/${req.params.slug}`));
DocRouter.post("/convert-doc", upload);

module.exports = DocRouter;