import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { v4 as uuidv4 } from 'uuid';

import { FileBox } from "../components/file-box";

import "../App.css"

export function FileTab() {
  
  const [files, setFiles] = useState([]);

  const fileTypes = ["PDF", "DOCX", "EPUB", "XML", "HTML", "PMD", "EDOC", "PPTX", "ODS", "XLXS", "XLX", "DIF", "TXT"];

  const handleChange = file => {
    for (let f of file) f.id = uuidv4();
    setFiles(file);
  };

  console.log(files);

  return (
    <div className="DropBox">
      <h3>Drop files here. Max file size 200MB</h3>
      <FileUploader
        multiple={true}
        maxSize={200}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{!files.length && "no files uploaded yet"}</p>
      {
        Array.from(files).map(file => <FileBox 
                                        key={file.id} 
                                        filename={file.name}  
                                        size={Math.floor(file.size/1026) + "kb"}
                                        formats={["PDF"]}
                                      />)
      }
      <br />
      { files.length > 0 && <button>Convert</button>}
      <br />
    </div>
  );
};
