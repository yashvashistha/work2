import React from "react";
import "./ChatPage.css";

function ChatPage() {
  return (
    <div className="Chat">
      <div className="NewFile">
        <button
          style={{
            height: "100%",
            backgroundColor: "rgba(217, 57, 84, 1)",
            fontSize: "14px",
            color: "white",
            borderStyle: "none",
            fontWeight: "700",
            padding: "revert",
            fontFamily: "Arial",
          }}
        >
          Add New File
        </button>
      </div>
      <div className="PDFChat">
        <div className="PdfBox"></div>
        <div className="ChatBox">
          <div
            style={{
              top: "1%",
              left: "1%",
              position: "relative",
              fontWeight: "700",
              fontFamily: "arial",
            }}
          >
            Chat
          </div>
          <div className="MessageBox">
            <div
              style={{
                left: "2%",
                position: "relative",
                width: "85%",
                display: "flex",
                flexDirection: "row",
                bottom: "20%",
              }}
            >
              <textarea></textarea>
              <button
                style={{
                  backgroundColor: "lightblue",
                  width: "10%",
                  borderStyle: "none",
                  color: "white",
                }}
              >
                send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
