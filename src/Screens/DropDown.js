import React, { useState } from "react";
import "./DropDown.css";

function DropDown() {
  const options = ["Option 1", "Option 2", "Option 3"];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select an option");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <div className="custom-dropdown">
      <button className="dropdown-button" onClick={toggleDropdown}>
        {selectedOption}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => selectOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
