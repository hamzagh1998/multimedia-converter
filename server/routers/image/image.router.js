const path = require("path");
const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const multer  = require("multer");

const { ImageService } = require("../../services/image.service");


const inputPath = path.join(__dirname, "..", "..", "uploads", "images", "input");
const outputPath = path.join(__dirname, "..", "..", "uploads", "images", "output");

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

const upload = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 * 50 } })
                .single("payload"); // 50 mb

const ImageRouter = Router();

ImageRouter.get("/get-image/:slug", (req, res) => res.sendFile(outputPath + "/" + req.params.slug));
ImageRouter.post("/convert-image", upload, async (req, res) => {

  ImageService.convertImageThrowBuffer(res, 11, req.file.path, outputPath, req.body.ext);

});

module.exports = ImageRouter;