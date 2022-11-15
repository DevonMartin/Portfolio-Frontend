import React from "react";
import "../css/Resume.css";
import resumePDF from "../assets/resume.pdf";
import resumePNG from "../assets/resume.png";

function downloadFile() {
  fetch(resumePDF).then((res) => {
    res.blob().then((blob) => {
      const fileURL = window.URL.createObjectURL(blob);
      let alink = document.createElement("a");
      alink.href = fileURL;
      alink.download = "resume - Devon Martin.pdf";
      // alink.click();
      console.log('hi')
    });
  });
}

function Resume() {
  return (
    <object className="resume-pdf" data={resumePDF} type="application/pdf">
      <img src={resumePNG} alt="Devon's resume" />
      <div className="resume-dl">
        <button onClick={downloadFile}>
          Download{" "}
          <iconify-icon
            inline
            icon="ant-design:download-outlined"
          ></iconify-icon>
        </button>
      </div>
    </object>
  );
}

export default Resume;
