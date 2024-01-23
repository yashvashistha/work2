import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import Table from "./Table";
import "./HomePage.css";
import { UploadButton } from "@bytescale/upload-widget-react";
import axios from "axios";
import { json } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import DragAndDrop from "./DragandDrop";
import DropDown from "./DropDown";

const options = {
  apiKey: "free",
  maxFileCount: 1,
};

function HomePage() {
  // const optionsvalue = [
  //   { name: "Bill Of Entry", sname: "BOE" },
  //   { name: "Shipping Bill", sname: "SB" },
  //   { name: "Checklist Bill Of Entry", sname: "CHKBOE" },
  //   { name: "", sname: "" },
  //   { name: "", sname: "" },
  //   { name: "", sname: "" },
  //   { name: "", sname: "" },
  //   { name: "", sname: "" },
  //   { name: "", sname: "" },
  //   { name: "", sname: "" },

  // ];
  return (
    <div className="Hompage">
      <div className="Upload">
        <div className="div1">
          <p>Upload File</p>
        </div>
        <div className="div2">
          <div className="DragandDropdiv">
            <DragAndDrop />
          </div>
          <div className="DropdownSubmit">
            <p style={{ textWrap: "nowrap" }}>File Type</p>
            {/* <DropDown /> */}
            <select>
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
            <button className="subbtn">Submit</button>
          </div>
        </div>
      </div>
      <Table />
    </div>
  );
}

export default HomePage;
