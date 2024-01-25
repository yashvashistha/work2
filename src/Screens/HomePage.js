import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import Table from "./Table";
import "./HomePage.css";
import axios from "axios";
// import DragAndDrop from "./DragandDrop";
// import DropDown from "./DropDown";

function HomePage() {
  const [selectedoption, setSelectedOption] = useState("");
  const [file, setFile] = useState(null);
  const [filename, setFileName] = useState(null);
  const [filetype, setFileType] = useState(null);
  const fileinputref = useRef(null);
  const ddref = useRef(null);
  const innerhtml1 =
    '<p>Click to upload</p><p>Drag and Drop to upload</p><input type="file" style="display: none;">';
  const innerhtml2 = "<p></p>";
  const posturl =
    "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/upload_pdf";

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    uploadfilehander(e.dataTransfer.files[0]);
  };

  const openinputhandler = () => {
    fileinputref.current.click();
  };

  const hiddenuploadhandler = (e) => {
    const selectedFile = e.target.files[0];
    uploadfilehander(selectedFile);
  };

  const uploadfilehander = async (tempfile) => {
    ddref.current.innerHTML = innerhtml2;
    ddref.current.innerText = tempfile.name;
    setFile(tempfile);
    setFileName(tempfile.name);
    setFileType(tempfile.type);
  };

  const selectchangehandle = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
  };

  const uploadbtnhandle = async () => {
    const binaryfile = await convertBinaryfunc(file);
    console.log(binaryfile);
    // uploadfileapi(binaryfile);
  };

  const convertBinaryfunc = async (filepdf) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(filepdf);
      // fileReader.readAsArrayBuffer(filepdf);
      // fileReader.readAsArrayBuffer(filepdf);
      // fileReader.readAsDataURL(filepdf);

      fileReader.onload = (e) => {
        const blobData = new Blob([e.target.result], {
          type: "application/pdf",
        });
        console.log(blobData);
        uploadfileapi(blobData);
        // console.log(e.target.result);
        // console.log(fileReader.result);
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadfileapi = async (bfile) => {
    if (file === null) {
      alert("Upload a File");
      return;
    }
    if (file.type !== "application/pdf") {
      alert("Only PDF Files are allowed");
      return;
    }
    console.log(bfile);

    // try {
    //   const response = await fetch(posturl, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/pdf",
    //       filetype: "SB",
    //       "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
    //       customerid: "1",
    //     },
    //     body: bfile,
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const data = response;
    //   console.log("Post successful:", data);
    // } catch (error) {
    //   console.error("Error posting data:", error);
    // }

    // let config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/upload_pdf",
    //   headers: {
    //     "Content-Type": "application/pdf",
    //     filetype: "SB",
    //     "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
    //     customerid: "1",
    //   },
    //   data: bfile,
    // };

    // axios
    //   .request(config)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    console.log(filetype, selectedoption);

    // const dfile = new FormData();
    // dfile.append("file", bfile);

    try {
      const response = axios({
        method: "post",
        url: posturl,
        headers: {
          "Content-Type": "application/pdf",
          filetype: selectedoption,
          customerid: 1,
          "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
        },
        data: bfile,
        maxBodyLength: Infinity,
      });
      // const response = await axios.post(posturl, null, {
      //   params: {},
      //   headers: {
      //     Content_Type: filetype,
      //     filetype: selectedoption,
      //     customerid: 1,
      //     x_api_key: "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
      //   },
      //   body: bfile,
      // });
      ddref.current.innerHTML = innerhtml1;
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
            onClick={openinputhandler}
            style={{ display: "flex", flexDirection: "column" }}
            ref={ddref}
          >
            <p>Click to upload</p>
            <p>Drag and Drop to upload</p>
            {/* Hidden file input from here */}
            <input
              type="file"
              ref={fileinputref}
              style={{ display: "none" }}
              onChange={hiddenuploadhandler}
            />
            {/* Hidden file input to here  */}
          </div>
          <div className="DropdownSubmit">
            <p style={{ textWrap: "nowrap" }}>File Type</p>
            <select value={selectedoption} onChange={selectchangehandle}>
              <option value="BOE">Bill Of Entry</option>
              <option value="SB">Shipping Bill</option>
              <option value="CHKBOE">Checklist Bill Of Entry</option>
              <option value="ADV">Advance License</option>
              <option value="ADVNEW">Advance License New</option>
              <option value="AC">Authorized Cetificate</option>
              <option value="EPCG">EPCG License</option>
              <option value="EPCGNEW">EPCG License</option>
              <option value="BRC">Bank Realisation Certificate</option>
              <option value="IT">Income Tax</option>
              <option value="GSTR1">GSTR1</option>
              <option value="GSTR1NEW">GSTR1 New</option>
              <option value="GSTR3B">GSTR3B</option>
              <option value="GSTR9">GSTR9</option>
              <option value="GSTR9C">GSTR9c</option>
              <option value="NOTICE">Notice</option>
              <option value="SI">Sales Invoice</option>
              <option value="CI">Commercial Invoice</option>
              <option value="DD">Delivery Detail</option>
              <option value="PI">Purchase Invoice</option>
            </select>
            <button className="subbtn" onClick={uploadbtnhandle}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <Table />
    </div>
  );
}

export default HomePage;
