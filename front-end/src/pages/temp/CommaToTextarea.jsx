import React, { useState } from "react";

const CommaToTextarea = () => {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  const handleButtonClick = () => {
    // Split input by comma, trim spaces, and join with newline
    const newValue = inputValue
      .split(",")
      .map((item) => item.trim())
      .join("\n");

    setTextareaValue(newValue);
  };

  return (
    <div className="p-4">
      <h2>Enter comma-separated values:</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="e.g. akhil,alan,amal"
      />
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white px-4 py-2 mb-4"
      >
        Display in Textarea
      </button>
      <textarea
        value={textareaValue}
        readOnly
        className="border p-2 w-full h-40"
      />
    </div>
  );
};

export default CommaToTextarea;