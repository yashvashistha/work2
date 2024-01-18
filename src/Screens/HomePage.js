import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import Table from "./Table";
import "./HomePage.css";
import { UploadButton } from "@bytescale/upload-widget-react";
import axios from "axios";
import { json } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";

const options = {
  apiKey: "free",
  maxFileCount: 1,
};

function HomePage() {
  const posturl =
    "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/upload_pdf";

  const [file, setFile] = useState(null);
  const [filename, setFileName] = useState(null);
  const [filetype, setFileType] = useState(null);
  const inputref = useRef();

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    // console.log("File1 ->", e.dataTransfer.files[0]);
    const filepdf = e.dataTransfer.files[0];
    inputref.current.innerText = filepdf.name;
    setFileName(filepdf.name);
    setFileType(filepdf.type);
    const base64 = await convertBase64(filepdf);
    setFile(base64);
  };

  // const handleFileChange = async (event) => {
  //   const filepdf = event.target.files[0];
  //   setFileName(filepdf.name);
  //   setFileType(filepdf.type);
  //   const base64 = await convertBase64(filepdf);
  //   setFile(base64);
  // };

  const convertBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleUpload = async () => {
    if (file == null) {
      alert("Upload a File");
      return;
    }
    try {
      const response = await axios.post(posturl, file, {
        headers: {
          "Content-Type": filetype,
          "File-Type": "SB",
          "File-Name": filename,
        },
      });
      inputref.current.innerText = "Drag and Drop";
      setFile(null);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="Hompage">
      <div className="Upload">
        <div className="div1">
          <p>Upload File</p>
        </div>
        <div className="div2">
          <div
            className="DragandDropdiv"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* <input type="file" onChange={handleFileChange} ref={inputref} /> */}
            {/* <button onClick={handleUpload}>Upload File</button> */}
            <p ref={inputref}>Drag and Drop</p>
          </div>
          <div className="DropdownSubmit">
            <p>Method</p>
            <select>
              <option value="">AWS Texaract</option>
              <option value="">Open AI</option>
              <option value="">Custom</option>
              <option value="">System Default</option>
            </select>
            <button onClick={handleUpload}>Submit</button>
          </div>
        </div>
      </div>
      <Table />
    </div>
  );
}

export default HomePage;
