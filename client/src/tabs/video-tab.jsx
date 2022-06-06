import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { v4 as uuidv4 } from 'uuid';

import { FileBox } from "../components/file-box";

import { Video } from "../api/video";

import "../App.css";
import "../components/styles.css"

export function VideoTab() {
  
  const [files, setFiles] = useState([]);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);


  const fileTypes = ["MP4", "WEBM", "MOV", "FLV", "OGG", "MVK", "AIFF", "MP2", "MP3", "FLAC", "WAV"];

  const handleChange = file => {
    for (let f of file) {
      f.id = uuidv4();
      f.ext = "MP4";
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
      formData.append("format", file.ext.toLowerCase());
      const res = await Video.convertVideo(formData);
      rslt.push({...res.data, originalName: file.name});
      setConvertedFiles(rslt);
      setFiles([]);
      setIsConverting(false);
    };
  };

  const downLoadFile = async slug => await Video.getVideo(slug);


  return (
    <div className="DropBox">
      <h3>Drop files here. Max file size 1GB</h3>
      <FileUploader
        multiple={true}
        maxSize={1024}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{!files.length && "no files uploaded yet"}</p>
      {
        Array.from(files).map(file => <FileBox 
                                        files={Array.from(files)}
                                        key={file.id} 
                                        file={file}
                                        setFiles={setFiles}
                                        filename={file.name}  
                                        size={((file.size/1024)/1024).toFixed(2) + "mb"}
                                        formats={fileTypes}
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
