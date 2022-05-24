const path = require("path");
const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const multer  = require("multer");

const inputPath = path.join(__dirname, "..", "..", "uploads", "videos", "input");
const outputPath = path.join(__dirname, "..", "..", "uploads", "videos", "output");

const storage = multer.diskStorage(
  { 
    destination(req, file, cb) {
      cb(null, inputPath);
    },
  }
);

const { VideoConverter } = require("../../services/video.service");

const upload = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 * 1024 } })
                .single("payload"); // 200 mb

const VideoRouter = Router();

VideoRouter.get("/get-video/:slug", (req, res) => (
  res.sendFile(outputPath + "/" + req.params.slug)
));
VideoRouter.post("/convert-video", upload, async (req, res) => (
  VideoConverter.convertVideoFormat(req.file.path, outputPath, req.body.format, req.body.fileId,  res)
));

module.exports = VideoRouter;