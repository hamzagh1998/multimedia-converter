import React from "react";

import "./styles.css";

export function FileBox({ filename, formats, size, converting=false, success=false, error=false }) {
  return (
    <div className="box">
      <div className="item">
        <p>{ filename.length > 30 ? filename.slice(0, 27) + "..." : filename }</p>
      </div>
      <div className="item">
        <p>Size: { size }</p>
      </div>
      <div className="item">
        <p>Output:</p>
        <select>
          { formats.map(format => <option key={format}>{ format }</option>) }
        </select>
      </div>
    </div>
  );
};
