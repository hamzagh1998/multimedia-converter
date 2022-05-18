const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const multer  = require("multer");
const storage = multer.diskStorage(
  { 
    destination(req, file, cb) {
      cb(null, path.join(__dirname, "..", "..", "uploads", "images"));
    },
    filename(req, file, cb) {
      cb(null, file.originalname + uuidv4());
    }
  }
);

const upload = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 * 50 } })
                .array("payload", 10); // 50 mb

const ImageRouter = Router();

ImageRouter.get("/get-image/:slug", (req, res) => res.sendFile(path.join(__dirname, "..", "..", "uploads", "images", req.params.slug)));
ImageRouter.post("/convert-image", upload);

module.exports = ImageRouter;