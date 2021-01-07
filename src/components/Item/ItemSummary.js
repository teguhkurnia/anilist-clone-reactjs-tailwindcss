import React, { useState, useContext } from "react";
import "./index.css";
import "./tooltip.css";
import { motion } from "framer-motion";
import { ModalContext } from "../../context/ModalContext";
import moment from "moment";
import { Link } from "react-router-dom";

const ItemSummary = ({ item, hoverItem }) => {
  const [expand, setExpand] = useState(false);
  const [more, setMore] = useState(false);
  const { setIsOpen, setInfo } = useContext(ModalContext);
  return (
    <div
      className="relative w-32 h-64 lg:w-40 lg:h-80"
      onMouseOver={() => setExpand(true)}
      onMouseLeave={() => setExpand(false)}
    >
      <motion.div
        className="item w-full h-full rounded text-gray-500 hover:text-blue-400"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-48 lg:h-56 relative">
          <Link to={"/anime/" + item.id}>
            <img
              src={item.coverImage.extraLarge}
              alt="image"
              className="w-full h-full rounded"
            />
          </Link>
          <div
            className=" rounded-full absolute bottom-3 right-2 text-gray-900 flex flex-col-reverse"
            onMouseLeave={() => setMore(false)}
          >
            {expand && (
              <motion.div
                className="expand"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  document.body.classList.add("overflow-hidden");
                  setInfo({
                    title: item.title.userPreferred,
                    coverImage: item.coverImage.large,
                    bannerImage: item.bannerImage,
                  });
                  return setIsOpen(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  onMouseOver={() => setMore(true)}
                  className="w-7 h-7 tooltip"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            )}
            {more && (
              <div className="more mb-1 flex flex-col">
                <div className="tooltip">
                  <div className="tooltiptext">Set To Watching</div>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-7 h-7"
                    initial={{ scale: 0, y: 12 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "tween", duration: 0.2 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                </div>
                {item.status === "FINISHED" && (
                  <div className="tooltip">
                    <div className="tooltiptext">Set To Completed</div>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-7 h-7"
                      initial={{ scale: 0, y: 12 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ type: "tween", duration: 0.2 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  </div>
                )}
                <div className="tooltip">
                  <div className="tooltiptext">Set To Planning</div>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-7 h-7"
                    initial={{ scale: 0, y: 12 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "tween", duration: 0.2 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="title h-12 py-2 overflow-hidden text-sm font-medium ">
          <Link to={"/anime/" + item.id}>{item.title.userPreferred}</Link>
        </div>
      </motion.div>
      {expand && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className={`hidden lg:block h-40 w-72 p-5 rounded-lg bg-gray-800 absolute z-40 top-5 text-xs font-semibold ${hoverItem}`}
        >
          <div className="flex justify-between">
            <div className="title text-gray-300 text-base mb-3">
              {`${
                item.airingSchedule.nodes.length > 0
                  ? `Ep. ${item.airingSchedule.nodes[0].episode}`
                  : `${item.season} ${item.seasonYear}`
              } ${
                item.airingSchedule.nodes.length > 0
                  ? `airing ${moment
                      .unix(item.airingSchedule.nodes[0].airingAt)
                      .fromNow()}`
                  : ""
              }`}
            </div>
            <div className="score">{item.averageScore}</div>
          </div>
          <div className="studio text-blue-400 mb-1">
            {item.studios.nodes[0].name}
          </div>
          <div className="info text-gray-500 mb-5">{`${item.format} ${
            item.episodes != null ? " • " + item.episodes + " Episode" : ""
          }`}</div>
          <div className="category flex">
            {item.genres.slice(0, 3).map((genre, index) => (
              <div
                className="bg-blue-500 text-blue-100 px-2 rounded-lg mr-1"
                key={index}
              >
                {genre}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ItemSummary;
