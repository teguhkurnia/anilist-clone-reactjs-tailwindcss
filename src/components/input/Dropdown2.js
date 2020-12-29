import React, { useState, useRef, useEffect } from "react";
import "./scrollbar.css";

const Dropdown2 = ({ items, onSelected, name, className }) => {
  const wrapperRef = useRef(null);
  const [expand, setExpand] = useState(false);
  const [selectedItem, setSelectedItem] = useState(name);
  const itemList = items.map((item, index) => (
    <li
      key={index}
      onClick={() => setSelectedItem(item)}
      className="py-2 px-4 hover:bg-gray-200 cursor-default font-semibold text-sm"
    >
      <div className={`${selectedItem === item ? "text-blue-500" : null}`}>
        {item}
      </div>
    </li>
  ));
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setExpand(false);
    }
  };
  useEffect(() => {
    onSelected(selectedItem);
  }, [selectedItem]);
  const icon =
    selectedItem === name ? (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={expand ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
        ></path>
      </svg>
    ) : (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setSelectedItem(name)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    );
  return (
    <div ref={wrapperRef} className={`dropdown wrapper relative ${className}`}>
      <div
        onClick={() => setExpand(!expand)}
        className="bg-gray-900 rounded-lg flex items-center h-full px-1 w-full text-gray-300 justify-between"
      >
        <input
          type="text"
          disabled
          value={!selectedItem ? name : selectedItem}
          className="bg-transparent border-0 focus:border-0 focus:ring-0 text-white w-1/2"
        />
        {icon}
      </div>
      {expand && (
        <div className="item-list min-h-0 max-h-96 w-full bg-white mt-2 rounded text-gray-400 absolute z-50">
          <ul>{itemList}</ul>
        </div>
      )}
    </div>
  );
};
Dropdown2.defaultProps = {
  items: [],
};

export default Dropdown2;
