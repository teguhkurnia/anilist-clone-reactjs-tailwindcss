import React, { useState, useRef, useEffect } from "react";
import "./scrollbar.css";

const Dropdown = ({ items, onSelected, isMultiSelect }) => {
  const wrapperRef = useRef(null);
  const [openInput, setOpenInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const itemPrep = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );
  const itemList = itemPrep.map((item, index) => (
    <li
      key={index}
      onClick={() => {
        if (!selectedItems.includes(item)) {
          setSearch("");
          return isMultiSelect
            ? setSelectedItems([...selectedItems, item])
            : setSelectedItems([item]);
        }
      }}
      className="p-1 flex justify-between rounded-md hover:bg-gray-700 hover:text-blue-400 cursor-default font-semibold text-sm"
    >
      <div className="label">{item}</div>
      {selectedItems.includes(item) ? (
        <svg
          className="w-5 h-5 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ) : null}
    </li>
  ));
  const prefix =
    openInput && selectedItems.length === 0 ? (
      <input
        autoFocus
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full h-full px-0 text-sm border-none focus:border-none focus:outline-none bg-transparent font-semibold focus:ring-0"
      />
    ) : (
      <span className="w-full">Any</span>
    );
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setExpand(false);
      setOpenInput(false);
    }
  };
  useEffect(() => {
    onSelected(selectedItems);
  }, [selectedItems]);
  const icon =
    selectedItems.length === 0 ? (
      <svg
        className="w-6 h-6"
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
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setSelectedItems([])}
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
    <div
      ref={wrapperRef}
      onClick={() => setExpand(true)}
      className="dropdown wrapper w-44"
    >
      <div className="bg-gray-800 h-10 rounded-lg flex items-center py-2 px-3 text-sm text-gray-300 font-semibold justify-between">
        <div className="w-full h-full" onClick={() => setOpenInput(true)}>
          {selectedItems.length === 0 ? (
            prefix
          ) : (
            <div className="prefix flex">
              <div className="bg-gray-700 text-xs py-1 px-2 w-max rounded-md mr-1">
                {selectedItems[0]}
              </div>
              {selectedItems.length > 1 ? (
                <div className="bg-gray-700 text-xs py-1 px-2 w-max rounded-md">
                  + {selectedItems.length - 1}
                </div>
              ) : null}
            </div>
          )}
        </div>
        {icon}
      </div>
      {expand && (
        <div className="item-list min-h-0 max-h-96 w-44 bg-gray-800 mt-2 rounded-lg text-gray-500 p-3 absolute z-50">
          <ul>{itemList}</ul>
        </div>
      )}
    </div>
  );
};
Dropdown.defaultProps = {
  items: [],
};

export default Dropdown;
