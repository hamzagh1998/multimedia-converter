
const fs = require("fs").promises;

const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);

class DocService {

  static async convertDoc(filename, filePath, outputPath, ext) {
    
    const newFilename = filename.split(".")[0] + ext;
    const newOutputPath = outputPath + "/" + newFilename;
    
    // Read file
    const docBuf = await fs.readFile(filePath);

    // Convert it to the corresponding format with undefined filter 
    const outputBuf = await libre.convertAsync(docBuf, ext, undefined);
    
    // Here in done you have pdf file which you can save or transfer in another stream
    await fs.writeFile(newOutputPath, outputBuf);

    return {newFilename, newOutputPath};
  };

};

module.exports = { DocService };