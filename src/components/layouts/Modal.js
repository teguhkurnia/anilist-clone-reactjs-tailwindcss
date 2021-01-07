import React, { useContext, useRef, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import Dropdown2 from "../input/Dropdown2";
import "./modal.css";
import { motion } from "framer-motion";
import DatePicker from "../input/DatePicker";
import InputNumber from "../input/InputNumber";
import Textarea from "../input/Textarea";
import { useClickOutside } from "../../hooks/useClickOutside";

const Modal = () => {
  const { isOpen, setIsOpen, info } = useContext(ModalContext);
  const [status, setStatus] = useState([
    "Watching",
    "Plan to watch",
    "Completed",
    "Rewatching",
    "Paused",
    "Dropped",
  ]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const wrapperRef = useRef(null);

  useClickOutside(() => {
    setIsOpen(false);
  }, wrapperRef);
  return (
    <motion.div
      class="bg-gray-900 bg-opacity-70 flex flex-col justify-center items-center py-10 sm:py-12 fixed z-20 top-0 bottom-0 right-0 left-0 overflow-y-auto-auto overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="w-screen md:w-full lg:w-2/3 h-auto bg-gray-800 rounded mx-auto mt-72 lg:mt-0"
        ref={wrapperRef}
      >
        <div
          className="header h-48 w-full banner-image relative"
          style={{ background: `url(${info.bannerImage})` }}
        >
          <div
            className="close w-5 h-5 absolute right-3 top-3"
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              return setIsOpen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="white"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="content flex items-end h-full">
            <img
              src={info.coverImage}
              className="w-28 h-40 relative top-9 left-6"
            />
            <div className="info flex justify-between w-full ml-5">
              <div className="py-3 px-6 text-white font-medium w-60 h-auto">
                {info.title}
              </div>
              <div className="flex text-white justify-between items-center w-32 py-5 pr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-7 w-7"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <button className="py-1 bg-blue-500 rounded px-3 focus:outline-none">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-10 py-14 w-full lg:w-4/5">
          <div className="row block lg:flex justify-between ">
            <div className="">
              <div className="title text-gray-400 font-medium my-2">Status</div>
              <Dropdown2
                items={status}
                onSelected={setSelectedStatus}
                name="Status"
                className="lg:w-52"
              />
            </div>
            <div className="">
              <div className="title text-gray-400 font-medium my-2">Score</div>
              <InputNumber step={0.5} max="10" min="0" className="lg:w-52" />
            </div>
            <div className="">
              <div className="title text-gray-400 font-medium my-2">
                Episode Progress
              </div>
              <InputNumber step={1} max="999" min="0" className="lg:w-52" />
            </div>
          </div>

          <div className="row block lg:flex justify-between">
            <div className="">
              <div className="title text-gray-400 font-medium my-2">
                Start Date
              </div>
              <DatePicker className="lg:w-52" />
            </div>
            <div className="">
              <div className="title text-gray-400 font-medium my-2">
                Finish Date
              </div>
              <DatePicker className="lg:w-52" />
            </div>
            <div className="">
              <div className="title text-gray-400 font-medium my-2">
                Total Rewatches
              </div>
              <InputNumber step={1} min={0} max="999" className="lg:w-52" />
            </div>
          </div>

          <div className="row">
            <div className="title text-gray-400 font-medium my-2">Notes</div>
            <Textarea />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
