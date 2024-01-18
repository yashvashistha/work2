import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Screens/Sidebar";
import Topbar from "./Screens/Topbar";
import HomePage from "./Screens/HomePage";
import ChatPage from "./Screens/ChatPage";
import "./App.css";
import DragAndDrop from "./Screens/DragandDrop";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div
          style={{
            height: "inherit",
            width: "inherit",
            backgroundColor: "lightcoral",
            display: "flex",
            flexDirection: "column",
            borderStyle: "none",
          }}
        >
          <Topbar />

          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />

            <Route path="/topbar2" element={<DragAndDrop />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
