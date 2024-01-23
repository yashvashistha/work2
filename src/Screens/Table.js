import React, { useEffect, useState } from "react";
import "../App.css";
import "./Table.css";
import axios from "axios";

function Table() {
  const actionicon = "/Icons/table-action.png";
  const deleteicon = "/Icons/trash.png";
  const tableapi =
    "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/list_data";
  const filedownloadapi =
    "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/download_data?";
  const [tableinfo, setTableInfo] = useState(null);

  const downloadhandler = async (data) => {
    const downloadlink =
      filedownloadapi + "uniqueid=" + data.id + "&type=" + data.type;
    try {
      const response = await axios.get(downloadlink, {
        headers: {
          "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
          "Content-Type": "application/" + data.type,
        },
      });
      console.log(typeof response);
      const jsonfile = JSON.stringify(response, null, 2);
      const blob = new Blob([jsonfile], { type: "application/" + data.type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "data.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const fetchdata = async () => {
    try {
      const response = await axios.get(tableapi, {
        headers: {
          "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
          "Content-Type": "application/json",
        },
      });
      // console.log(response.data.data);
      setTableInfo(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="Table">
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "scroll",
          position: "relative",
        }}
      >
        <table>
          <tr>
            <th>Load ID</th>
            <th>File Name</th>
            <th>File Type</th>
            <th>Status</th>
            <th>Loaded At</th>
            <th>Action</th>
          </tr>
          {tableinfo &&
            tableinfo.map((d) => (
              <tr>
                <td>{d.UniqueId || "ID"}</td>
                <td>{d.File_name || "NULL"}</td>
                <td>{d.File_type || "--"}</td>
                <td>{d.Status || "Status"}</td>
                <td>{d.Curr_date_time || "NULL"}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <button
                      title="Download JSON File"
                      style={{
                        position: "relative",
                        width: "17px",
                        height: "18px",
                        backgroundImage: " url(Icons/delete.png)",
                        borderStyle: "none",
                        backgroundColor: "transparent",
                      }}
                    ></button>
                    <button
                      title="Download PDF"
                      style={{
                        position: "relative",
                        width: "17px",
                        height: "18px",
                        backgroundImage: " url(Icons/pdficon.png)",
                        borderStyle: "none",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => {
                        downloadhandler({
                          id: d.UniqueId,
                          type: "pdf",
                        });
                      }}
                    ></button>
                    <button
                      title="Delete"
                      style={{
                        position: "relative",
                        width: "19px",
                        height: "20px",
                        backgroundImage: " url(Icons/jsonicon.png)",
                        borderStyle: "none",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => {
                        downloadhandler({
                          id: d.UniqueId,
                          type: "json",
                        });
                      }}
                    ></button>
                  </div>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}

export default Table;
