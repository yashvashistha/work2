import React, { useEffect, useState } from "react";
import "../App.css";
import "./Table.css";

function Table() {
  const actionicon = "/Icons/table-action.png";
  return (
    <div className="Table">
      <div style={{ width: "100%", height: "100%", overflow: "scroll" }}>
        <table>
          <tr>
            <th>Load ID</th>
            <th>File Name</th>
            <th>Loaded By</th>
            <th>Status</th>
            <th>Loaded At</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>11</td>
            <td>Trial Balance_Kverneland Group Polska sp.zo.o.xlsx</td>
            <td>Rauniqa</td>
            <td>Uploaded</td>
            <td>11:00:01 AM</td>
            <td>
              <img src="/Icons/table-action.png"></img>
            </td>
          </tr>
          <tr>
            <td>12</td>
            <td>Financial Statement_Kubota Cambodia Co.,Ltd.xlsx</td>
            <td>Ram</td>
            <td>Uploaded</td>
            <td>11:00:01 PM</td>
            <td>
              <img src={actionicon}></img>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Table;
