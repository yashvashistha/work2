import React, { useRef, useState } from "react";
import "./DragandDrop.css";

const DragAndDrop = () => {
  const [divdisplay, setDivDisplay] = useState("none");
  const divref = useRef();

  // const handleDragEnter = (e) => {
  //   e.preventDefault();
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const filepdf = e.dataTransfer.files[0];
  //   // console.log("File1 ->", e.dataTransfer.files[0]);
  //   inputref.current.innerText = filepdf.name + " Added";
  // };

  // const submitfunc = () => {
  //   console.log("clicked");
  //   inputref.current.innerText = "Drag and Drop file";
  // };

  const openpopup = () => {
    if (divdisplay == "none") {
      divref.current.style.display = "flex";
      setDivDisplay("flex");
    } else if (divdisplay == "flex") {
      divref.current.style.display = "none";
      setDivDisplay("none");
    }
    return;
  };

  return (
    <div className="maindiv">
      <button className="Openpopup" onClick={openpopup}>
        Click me please!!
      </button>
      <div ref={divref} className="Popup">
        <button
          className="closepopup"
          style={{ position: "absolute", top: "0px", right: "0px" }}
          onClick={openpopup}
        >
          X
        </button>
        <p>Drag and Drop</p>
        <input type="file" />
      </div>
    </div>
  );
};

export default DragAndDrop;
