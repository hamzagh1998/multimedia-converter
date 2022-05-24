const path = require("path");
const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const multer  = require("multer");

const { DocService } = require("../../services/doc.service");

const { tryToCatch } = require("../../utils/try-to-catch");

const inputPath = path.join(__dirname, "..", "..", "uploads", "docs", "input")
const outputPath = path.join(__dirname, "..", "..", "uploads", "docs", "output");

const storage = multer.diskStorage(
  { 
    destination(req, file, cb) {
      cb(null, inputPath);
    },
    filename(req, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname);
    }
  }
);
const upload = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 * 200 } })
                .single("payload"); // 200 mb

const DocRouter = Router();

DocRouter.get("/get-doc/:slug", (req, res) => res.sendFile(outputPath + "/" + req.params.slug));
DocRouter.post("/convert-doc", upload, async (req, res) => {

  const file = req.file;
  const [error, data] = await tryToCatch(
    DocService.convertDoc, file.filename, file.path, outputPath, req.body.ext
  );
  if (error) res.json({error: true, detail: {fileId: req.body.fileId}});
  else res.json({error: false, detail: {filename: data.newFilename, path: data.newOutputPath, fileId: req.body.fileId}});

});

module.exports = DocRouter;