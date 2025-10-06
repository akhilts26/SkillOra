import React, { useState } from "react";

const QuestionTemp = () => {
  // Example question (this could also come from props or API)
  const questionData = {
    question: "What is the capital of France?",
    options: ["Paris", "London"],
    answer: "Paris",
  };

  const [selectedOption, setSelectedOption] = useState("");
  const [result, setResult] = useState("");

  const handleCheckAnswer = () => {
    if (!selectedOption) {
      setResult("⚠️ Please select an option first.");
      return;
    }

    if (selectedOption === questionData.answer) {
      setResult("✅ Correct!");
    } else {
      setResult("❌ Not Correct");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded shadow">
      <h2 className="text-xl font-bold mb-4">{questionData.question}</h2>

      <div className="space-y-2">
        {questionData.options.map((opt, idx) => (
          <label key={idx} className="block">
            <input
              type="radio"
              name="quiz"
              value={opt}
              checked={selectedOption === opt}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mr-2"
            />
            {opt}
          </label>
        ))}
      </div>

      <button
        onClick={handleCheckAnswer}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Check Answer
      </button>

      {result && (
        <p className="mt-3 font-semibold text-lg">
          {result}
        </p>
      )}
    </div>
  );
};

export default QuestionTemp;
