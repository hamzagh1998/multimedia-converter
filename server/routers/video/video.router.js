const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const multer  = require("multer");
const storage = multer.diskStorage(
  { 
    destination(req, file, cb) {
      cb(null, "/uploads/videos");
    },
    filename(req, file, cb) {
      cb(null, file.originalname + uuidv4());
    }
  }
);

const upload = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 * 50 } })
                .array("payload", 10); // 50 mb

const VideoRouter = Router();

VideoRouter.get("/get-video/:slug", (req, res) => res.sendFile(__dirname+`/uploads/videos/${req.params.slug}`));
VideoRouter.post("/convert-video", upload);

module.exports = VideoRouter;