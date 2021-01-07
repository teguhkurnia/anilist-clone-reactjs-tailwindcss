import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "../../hooks/useClickOutside";

const DatePicker = ({ className }) => {
  const [monthNames, setMonthNames] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [daysName, setDaysName] = useState([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);
  const [datePickerValue, setDatePickerValue] = useState("");

  const wrapperRef = useRef(null);

  const inputRef = useRef(null);

  const initDate = () => {
    let today = new Date();
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  };
  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);

    return today.toDateString() === d.toDateString() ? true : false;
  };

  const getDateValue = (date) => {
    let selectedDate = new Date(year, month, date);
    setDatePickerValue(selectedDate.toDateString());

    inputRef.current.value =
      selectedDate.getFullYear() +
      "-" +
      ("0" + selectedDate.getMonth()).slice(-2) +
      "-" +
      ("0" + selectedDate.getDate()).slice(-2);

    setShowDatepicker(false);
  };

  const getNoOfDays = () => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    let dayOfWeek = new Date(year, month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankDays);
    setNoOfDays(daysArray);

    console.log(daysName);
  };

  const onEscape = (e) => {
    if (e.keyCode === 27) {
      setShowDatepicker(false);
    }
  };

  useEffect(() => {
    initDate();
    getNoOfDays();
  }, []);

  useClickOutside(() => {
    setShowDatepicker(false);
  }, wrapperRef);

  const daysComp = daysName.map((day, index) => {
    return (
      <div style={{ width: "14.26%" }} className="px-1" key={index}>
        <div className="text-gray-800 font-medium text-center text-xs">
          {day}
        </div>
      </div>
    );
  });

  return (
    <div
      className={`relative flex flex-col-reverse ${className}`}
      ref={wrapperRef}
    >
      <div className="flex " onClick={() => setShowDatepicker(!showDatepicker)}>
        <input type="hidden" name="date" ref={inputRef} />
        <input
          type="text"
          readOnly
          value={datePickerValue}
          onChange={(e) => setDatePickerValue(e.target.value)}
          onKeyDown={onEscape}
          className="w-full pl-10 bg-gray-900 py-3 border-0 leading-none rounded-lg shadow-sm focus:outline-none focus:ring-0 text-white text-sm"
        />
        <div className="absolute top-0 left-0 px-3 py-2">
          <svg
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      <motion.div
        className={`bg-white mb-14 w-full rounded shadow p-4 absolute ${
          showDatepicker ? "block" : "hidden"
        }`}
        initial={{ scaleY: 0.5 }}
        animate={{ scaleY: 1 }}
      >
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-lg font-bold text-gray-800">
              {monthNames[month]}
            </span>
            <span className="ml-1 text-lg text-gray-600 font-normal">
              {year}
            </span>
          </div>
          <div>
            <button
              className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full ${
                month == 0 ? "cursor-not-allowed opacity-25" : null
              }`}
              disabled={month == 0 ? true : false}
              onClick={(e) => {
                e.preventDefault();
                setMonth(month - 1);
                return getNoOfDays();
              }}
            >
              <svg
                className="h-6 w-6 text-gray-500 inline-flex"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              className={`transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full ${
                month == 11 ? "cursor-not-allowed opacity-25" : null
              }`}
              disabled={month == 11 ? true : false}
              onClick={() => {
                setMonth(month + 1);
                getNoOfDays();
              }}
            >
              <svg
                className="h-6 w-6 text-gray-500 inline-flex"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap mb-3 -mx-1">{daysComp}</div>
        <div className="flex flex-wrap -mx-1">
          {blankDays.map((blankDay, index) => {
            return (
              <div
                key={index}
                style={{ width: "14.28%" }}
                className="text-center border p-1 border-transparent text-sm"
              ></div>
            );
          })}

          {noOfDays.map((date, index) => {
            return (
              <div
                style={{ width: "14.28%" }}
                className="px-1 mb-1"
                key={index}
              >
                <div
                  onClick={() => getDateValue(date)}
                  className={`cursor-pointer p-1 text-center text-sm leading-none rounded-full transition ease-in-out duration-100 ${
                    isToday(date) === true
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-blue-200"
                  } `}
                >
                  {" "}
                  {date}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default DatePicker;
