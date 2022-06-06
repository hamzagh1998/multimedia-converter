const ffmpeg = require("ffmpeg");
const { v4: uuidv4 } = require("uuid");

const { tryToCatch } = require("../utils/try-to-catch");


class VideoConverter {

  static async convertVideoFormat(filePath, outputPath, format, fileId, res) {
    
    try {
      const process = new ffmpeg(filePath);
      process.then(function (video) {
        const filename = uuidv4() + "." + format;

        video
          .setVideoFormat(format)
          .save(outputPath + "/" + filename, (error, file) => {
            if (!error) res.json({ error: false, detail: { fileId, filename, path: file } });
            else res.json({ error: false, detail: "Couldn't convert this video!" });
          });
      }, err => {
        res.json({ error: false, detail: "Couldn't convert this video!" });
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.msg);
    };

  };

};

module.exports = { VideoConverter };