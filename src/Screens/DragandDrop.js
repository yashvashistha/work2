import React, { useRef, useState } from "react";

const DragAndDrop = () => {
  const [droppedFile1, setDroppedFile1] = useState(null);
  const inputref = useRef();

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const filepdf = e.dataTransfer.files[0];
    // console.log("File1 ->", e.dataTransfer.files[0]);
    inputref.current.innerText = filepdf.name + " Added";
  };

  const submitfunc = () => {
    console.log("clicked");
    inputref.current.innerText = "Drag and Drop file";
  };

  return (
    <div>
      <div
        style={{ width: "250px", height: "250px", border: "2px dashed yellow" }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p ref={inputref}>Drag and Drop file</p>
      </div>
      <button onClick={submitfunc}>Submit</button>
    </div>
  );
};

export default DragAndDrop;
