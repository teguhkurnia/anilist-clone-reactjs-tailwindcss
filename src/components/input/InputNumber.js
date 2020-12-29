import React, { useState } from "react";
import "./input.css";

const InputNumber = ({ step, max, min, className }) => {
  const [value, setValue] = useState(0);
  return (
    <div
      className={`bg-gray-900 rounded-lg flex items-center pr-2 ${className}`}
    >
      <input
        type="number"
        value={value}
        className="bg-transparent border-0 focus:border-0 focus:ring-0 text-white w-full"
      />
      <div className="arrow w-3 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={() => {
            if (value < max) {
              setValue(value + step);
            }
          }}
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={() => {
            if (value > min) {
              setValue(value - step);
            }
          }}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default InputNumber;
