import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { v4 as uuidv4 } from 'uuid';

import { FileBox } from "../components/file-box";

import { Doc } from "../api/doc";

import "../App.css";
import "../components/styles.css"

export function FileTab() {
  
  const [files, setFiles] = useState([]);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);


  const fileTypes = ["PDF", "DOCX", "EPUB", "XML", "HTML", "PMD", "EDOC", "PPTX", "ODS", "XLXS", "XLX", "DIF", "TXT"];

  const handleChange = file => {
    for (let f of file) {
      f.id = uuidv4();
    };
    setFiles(file);
  };

  const convertHandler = async () => {

    const rslt = [];
    for (let file of files) {
      setIsConverting(true);
      const formData = new FormData();
      formData.append("payload", file);
      formData.append("fileId", file.id);
      formData.append("ext", ".pdf");
      const res = await Doc.convertDoc(formData);
      rslt.push({...res.data, originalName: file.name});
      setConvertedFiles(rslt);
      setFiles([]);
      setIsConverting(false);
    };
  };

  const downLoadFile = async slug => await Doc.getDoc(slug);

  return (
    <div className="DropBox">
      <h3>Drop files here. Max file size 100MB</h3>
      <FileUploader
        multiple={true}
        maxSize={100}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{!files.length && "no files uploaded yet"}</p>
      {
        Array.from(files).map(file => <FileBox 
                                        key={file.id} 
                                        filename={file.name}  
                                        size={((file.size/1024)/1024).toFixed(2) + "mb"}
                                        formats={["PDF"]}
                                      />)
      }
      <br />
      {
        convertedFiles.map(file => <FileBox 
                                      key={file.detail.id}
                                      filename={file.originalName}
                                      status={file.error ? "error" : "success"}
                                      slug={file.detail.filename}
                                      downLoadFile={downLoadFile}
                                    />)
      }
      { 
        isConverting 
        ? <div className="lds-hourglass"></div>
        : files.length > 0 
          ? <button onClick={convertHandler}>Convert</button> 
          : convertedFiles.length 
            ? <button onClick={() => window.location.reload()}>Clear</button>
            : null
      }
      <br />
    </div>
  );
};
