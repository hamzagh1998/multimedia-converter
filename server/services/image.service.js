const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const imgConvert = require('image-convert');

class ImageService {

  static async convertImageThrowUrl(res, fileId, imgUrl, outputPath, ext) {

    imgConvert.fromURL({
        url: imgUrl,
        output_format: ext, // default jpg
      }, async (err, buffer, file) => {
          if(!err) {
              const filename = uuidv4() + "-" + file.name;
              const filepath = outputPath + "/" + filename;

              await fs.writeFile(filepath, buffer);

              return res.json({ error: false, detail: {fileId, filename, filepath} });
          };return res.json({ error: true, detail: err.message });
      });
  };

  static async convertImageThrowBuffer(res, fileId, imgURL, outputPath, ext) {

    const buffer = await fs.readFile(imgURL, {encoding: "base64"});

    imgConvert.fromBuffer({
        buffer: buffer, // replace with buffer
        output_format: ext, // default jpg
      }, async (err, response, file) => {
        if(!err) {
          const filename = file.name;
          const filepath = outputPath + "/" + filename;

          await fs.writeFile(filepath, buffer, {encoding: "base64"});

          return res.json({ error: false, detail: {fileId ,filename, filepath} });
        };return res.json({ error: true, detail: err.message });
      });
    };

};

module.exports = { ImageService };