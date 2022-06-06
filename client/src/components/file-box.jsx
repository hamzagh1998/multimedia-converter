import React from "react";

import "./styles.css";

export function FileBox({ files=null, setFiles=null, filename, formats, size=null, status, slug, downLoadFile }) {

  const setExt = ext => {
    let newArr = files;
    const file = files.filter(f => f.name === filename)[0];
    file.ext = ext;
    newArr = newArr.filter(f => f.name !== filename);
    newArr.push(file);
    setFiles(newArr);
  };

  return (
    <div className="box">
      <div className="item">
        <p>{ filename.length > 30 ? filename.slice(0, 27) + "..." : filename }</p>
      </div>
      <div className="item">
        {size && <p>Size:  {size}</p>}
      </div>
      <div className="item">
       {
         status === "success"
            ? <>
                <p>Success:</p>
                <img 
                  onClick={() => downLoadFile(slug)}
                  src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/Downloads-icon.png" 
                  alt="download icon" 
                />
              </>
            : status === "error"
              ? <>
                  <p>Error:</p>
                  <img 
                    // onClick={e => e.target.parentElement.parentElement.remove()}
                    src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-error-icon.png" 
                    alt="error icon" 
                  />
                </>
              : <>
                  <p>Output:</p>
                  <select onChange={e => setExt(e.target.value)}>
                    { formats.map(format => <option key={format}>{ format }</option>) }
                  </select>
                </>
       }
      </div>
    </div>
  );
};
