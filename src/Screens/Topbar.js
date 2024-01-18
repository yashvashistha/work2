import React from "react";
import "./Topbar.css";

function Topbar() {
  return (
    <div className="topbar">
      <div className="pdficon">
        <img
          src="Icons/PwC.png"
          alt="PwC Icon"
          height="25px"
          width="33px"
        ></img>
        <p>Navigate PDF reader</p>
      </div>
      <div className="adminicon">
        <img
          src="Icons/adminicon.png"
          alt="admin"
          height="18px"
          width="18px"
        ></img>
        <p>Super Admin</p>
      </div>
    </div>
  );
}

export default Topbar;
