
import { useState } from "react";

import "./App.css";

import { FileTab } from "./tabs/file-tab";
import { ImageTab } from "./tabs/image-tab";
import { VideoTab } from "./tabs/video-tab";

export function Main() {

  const [showFileTab, setShowFileTab] = useState(true);
  const [showImageTab, setShowImageTab] = useState(false);
  const [showVideoTab, setShowVideoTab] = useState(false);

  const onSwitchTab = tabName => {
    if (tabName === "file") {
      setShowFileTab(true);
      setShowImageTab(false);
      setShowVideoTab(false);
    } else if (tabName === "image") {
      setShowFileTab(false);
      setShowImageTab(true);
      setShowVideoTab(false);
    } else {
      setShowFileTab(false);
      setShowImageTab(false);
      setShowVideoTab(true);
    }
  }

  return (
    <div className="container">
      <div className="tab-container">
        <div className={showFileTab ? "tab selected" : "tab"} onClick={() => onSwitchTab("file")}>
          <p>Convert to pdf</p>
        </div>
        <div className={showImageTab ? "tab selected" : "tab"} onClick={() => onSwitchTab("image")}>
          <p>Convert images</p>
        </div>
        <div className={showVideoTab ? "tab selected" : "tab"} onClick={() => onSwitchTab("video")}>
          <p>Convert videos</p>
        </div>
      </div>
      <br />
      { showFileTab && <FileTab /> }
      { showImageTab && <ImageTab /> }
      { showVideoTab && <VideoTab /> }
    </div>
  );
};
