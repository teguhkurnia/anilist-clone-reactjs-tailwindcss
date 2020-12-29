import React from "react";

const Input = ({ type, className }) => {
  return (
    <div className={`input rounded-lg text-white p-1 ${className}`}>
      <input
        type={type}
        className="number bg-transparent border-0 focus:ring-0 focus:border-0 text-sm h-full w-full"
      />
    </div>
  );
};

export default Input;
