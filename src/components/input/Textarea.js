import React from "react";

const Textarea = () => {
  const handleChange = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
    console.log(e.target.scrollHeight);
  };
  return (
    <textarea
      onChange={handleChange}
      style={{ minHeight: 30 }}
      className="bg-gray-900 w-full rounded border-0 focus:ring-0 text-sm text-white"
    />
  );
};

export default Textarea;
