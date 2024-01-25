import React, { useEffect, useState } from "react";
import "../App.css";
import "./Table.css";
import axios from "axios";
import Pagination from "./Pagination";

function Table() {
  const actionicon = "/Icons/table-action.png";
  const deleteicon = "/Icons/trash.png";
  const tableapi =
    "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/list_data";
  const filedownloadapi =
    "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/download_data?";
  const deletefileapi =
    "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/delete_data?uniqueid=";
  const [tableinfo, setTableInfo] = useState(null);
  const [reload, setReload] = useState(0);
  const [rowperpage] = useState(10);
  const [rowlen, setRowLen] = useState(1);
  const [currentpage, setCurrentPage] = useState(1);

  const deletehandler = async (id) => {
    const deletelink = deletefileapi + id;
    try {
      const response = await axios.delete(deletelink, {
        headers: {
          "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
        },
      });
      console.log(response);
      setReload(reload + 1);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // "591ac92f-8b19-4331-a0a9-7ff94b059d6d" +

  const downloadhandler = async (data) => {
    const downloadlink =
      filedownloadapi +
      "uniqueid=" +
      "591ac92f-8b19-4331-a0a9-7ff94b059d6d" +
      "&type=" +
      data.type;
    try {
      const response = await axios.get(downloadlink, {
        headers: {
          "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
          "Content-Type": "application/" + data.type,
        },
      });

      console.log(response);

      let resultfile;
      if (data.type === "pdf") {
        const decodestring = atob(response.data.body);
        const utf8decoder = new TextDecoder("utf-8");
        resultfile = utf8decoder.decode(
          new Uint8Array(
            decodestring.split("").map((char) => char.charCodeAt(0))
          )
        );
      } else if (data.type === "json") {
        resultfile = JSON.stringify(response, null, 2);
      }
      const blob = new Blob([resultfile], { type: "application/" + data.type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = data.id + "." + data.type;
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
      setTableInfo(response.data.data);
      setRowLen(response.data.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const indexoflastrow = currentpage * rowperpage;
  const indexoffirstrow = indexoflastrow - rowperpage;
  const paginate = (pageNumber) => {
    console.log(indexoffirstrow, indexoflastrow);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchdata();
  }, [reload]);

  return (
    <div className="Table" style={{ display: "flex", flexDirection: "column" }}>
      <Pagination
        postsPerPage={rowperpage}
        totalPosts={rowlen}
        currentpage={currentpage}
        paginate={paginate}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "scroll",
          // position: "relative",
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
            tableinfo.slice(indexoffirstrow, indexoflastrow).map((d) => (
              <tr>
                <td>{d.UniqueId || "ID"}</td>
                <td>{d.File_name || "NULL"}</td>
                <td>{d.File_type || "--"}</td>
                <td>{d.Status || "Status"}</td>
                <td>
                  {(
                    <div>
                      <p>{`${d.Curr_date_time.split("T")[1].slice(0, 8)}`}</p>
                      <p>{`${d.Curr_date_time.split("T")[0]}`}</p>{" "}
                    </div>
                  ) || "NULL"}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <button
                      title="Delete"
                      style={{
                        position: "relative",
                        width: "17px",
                        height: "18px",
                        backgroundImage: " url(Icons/delete.png)",
                        borderStyle: "none",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => {
                        deletehandler(d.UniqueId);
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
                      title="Download JSON File"
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
