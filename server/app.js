const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
process.env.NODE_ENV !== "production" && app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

// routes
app.use("/api/image-handler", require("./routers/image/image.router"));
app.use("/api/video-handler", require("./routers/video/video.router"));
app.use("/api/doc-handler", require("./routers/doc/doc.router"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = { app };
