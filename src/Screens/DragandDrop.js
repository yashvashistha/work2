import React, { useRef, useState } from "react";
import "./DragandDrop.css";
import axios from "axios";
import { json } from "react-router-dom";

const DragAndDrop = () => {
  const posturl =
    "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/upload_pdf";
  const [divdisplay, setDivDisplay] = useState("none");
  const [labeldisplay, setLabelDisplay] = useState("fileinput");
  const [file, setFile] = useState(null);
  const [filename, setFileName] = useState(null);
  const [filetype, setFileType] = useState(null);
  const divref = useRef();
  const pref = useRef();
  const labelref = useRef();

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    filehandler(e.dataTransfer.files[0]);
  };

  const handlefilechange = (e) => {
    filehandler(e.target.files[0]);
  };

  const filehandler = async (filepdf) => {
    if (filepdf === null) {
      alert("Upload a File");
      return;
    }
    if (filepdf.type !== "application/pdf") {
      alert("Only PDF Files are allowed");
      return;
    }
    const binaryfile = await convertBase64(filepdf);
    setFile(binaryfile);
    setFileName(filepdf.name);
    setFileType(filepdf.type);
    // setLabelDisplay("uploadbtn");
    // labelref.current.innerText = "Upload File";
    pref.current.innerText = filepdf.name;
    uploadfilehander(binaryfile);
    // console.log(binaryfile);
  };

  const uploadfilehander = async (tempfile) => {
    console.log("file here");
    console.log(tempfile);
    openpopup();

    try {
      const response = await fetch(posturl, {
        method: "POST",
        headers: {
          Content_Type: "application/pdf",
          filetype: "SB",
          customerid: 1,
          "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
        },
        body: JSON.stringify(tempfile),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Post successful:", data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  // const uploadfilehander = async () => {
  //   console.log(file);
  //   openpopup();
  //   try {
  //     const response = await axios.post(posturl, file, {
  //       headers: {
  //         content_type: filetype,
  //         filetype: "SB",
  //         "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
  //         customerid: "1",
  //       },
  //     });
  //     // inputref.current.innerText = "Drag and Drop";
  //     setFile(null);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const convertBase64 = async (filepdf) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(filepdf);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const openpopup = () => {
    setFile(null);
    setLabelDisplay("fileinput");
    labelref.current.innerText = "Choose File";
    if (divdisplay == "none") {
      divref.current.style.display = "flex";
      setDivDisplay("flex");
    } else if (divdisplay == "flex") {
      pref.current.innerText = "No File Uploaded";
      divref.current.style.display = "none";
      setDivDisplay("none");
    }
    return;
  };

  return (
    <div className="maindiv" onClick={openpopup}>
      <p className="Openpopup">Click For Upload</p>
      <div
        ref={divref}
        className="Popup"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <button
          className="closepopup"
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            width: "25px",
            height: "25px",
            borderStyle: "none",
            // backgroundColor: "rgba(246, 230, 230, 1)",
            fontWeight: "550",
            fontSize: "20px",
            backgroundColor: "rgba(217, 57, 84, 1)",
            color: "white",
          }}
          onClick={openpopup}
        >
          X
        </button>
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: "900",
            textWrap: "balance",
            fontSize: "30px",
            color: "white",
            textShadow:
              "-1px -1px 0 rgba(217, 57, 84, 1),   1px -1px 0 rgba(217, 57, 84, 1),-1px 1px 0 rgba(217, 57, 84, 1), 1px 1px 0 rgba(217, 57, 84, 1)",
            // textShadow:
            //   "-1px -1px 0 #000,   1px -1px 0 #000,-1px 1px 0 #000, 1px 1px 0 #000",
            // color: "rgba(217, 57, 84, 1)",
            backgroundColor: "rgba(217, 57, 84, 1)",
            width: "100%",
            height: "10%",
            textAlign: "center",
          }}
        >
          Drag and Drop
        </p>
        <p ref={pref}>No File Uploaded</p>
        <input
          type="file"
          onChange={handlefilechange}
          id="fileinput"
          style={{ display: "none" }}
        />
        <button
          id="uploadbtn"
          style={{ display: "none" }}
          onClick={uploadfilehander}
        >
          Upload File
        </button>
        <label
          ref={labelref}
          htmlFor={labeldisplay}
          style={{
            cursor: "pointer",
            border: "1px solid rgba(217, 57, 84, 1)",
            backgroundColor: "rgba(217, 57, 84, 1)",
            fontFamily: "arial",
            fontWeight: "100",
            fontSize: "15px",
            maxWidth: "70px",
            maxHeight: "50px",
            minWidth: "15%",
            minHeight: "10%",
            textAlign: "center",
            color: "white",
            position: "relative",
            bottom: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{}}>Choose File</p>
        </label>
      </div>
    </div>
  );
};

export default DragAndDrop;
