import React, { useState } from "react";
import Dropdown from "../input/Dropdown";
import Input from "../input/Input";

const Filter = () => {
  const [items, setItems] = useState([
    "Action",
    "Romance",
    "Comedy",
    "Adventure",
    "Drama",
    "Slice of Life",
    "Fantasy",
    "Supernatural",
    "Horor",
    "Mystery",
    "Psychological",
    "Sci-Fi",
    "Mecha",
    "Harem",
    "Reverse Harem",
    "Isekai",
    "Reverse Isekai",
    "Demons",
    "Game",
    "Ecchi",
    "Historical",
    "Kids",
    "Martial Art",
    "Josei",
    "Cyberpunk",
    "Post-Apocalyptic",
    "Police",
    "Parody",
    "Music",
    "School",
    "Super Power",
    "Space",
    "Shounen",
    "Shoujo",
    "Seinen",
    "Sports",
    "Tragedy",
    "Vampire",
    "Yaoi/Shounen-Ai",
    "Yuri/Shoujo-Ai",
    "Magic",
    "Military",
    "Hentai",
  ]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [years, setYear] = useState(() => {
    let y = [];
    for (let i = new Date().getFullYear(); i > 1992; i--) {
      y.push(i.toString());
    }
    return y;
  });
  const [selectedYear, setSelectedYear] = useState("");
  const [seasons, setSeasons] = useState([
    "Winter",
    "Spring",
    "Summer",
    "Fall",
  ]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [formats, setFormats] = useState([
    "TV Show",
    "Movie",
    "TV Short",
    "Special",
    "OVA",
    "ONA",
    "Music",
  ]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  return (
    <div className="filter mb-10">
      <div className="flex justify-between">
        <div className="search">
          <div className="label text-gray-300 text-lg mb-3 font-semibold">
            Search
          </div>
          <Input type="text" className="bg-gray-800 w-80 lg:w-full" />
        </div>
        <div className="genres hidden lg:block">
          <div className="label text-gray-300 text-lg mb-3 font-semibold">
            Genres
          </div>
          <Dropdown
            items={items}
            onSelected={setSelectedCategory}
            isMultiSelect
          />
        </div>
        <div className="Year hidden lg:block">
          <div className="label text-gray-300 text-lg mb-3 font-semibold">
            Year
          </div>
          <Dropdown items={years} onSelected={setSelectedYear} />
        </div>
        <div className="Season hidden lg:block">
          <div className="label text-gray-300 text-lg mb-3 font-semibold">
            Season
          </div>
          <Dropdown items={seasons} onSelected={setSelectedSeason} />
        </div>
        <div className="Format hidden lg:block">
          <div className="label text-gray-300 text-lg mb-3 font-semibold">
            Format
          </div>
          <Dropdown
            items={formats}
            onSelected={setSelectedFormats}
            isMultiSelect
          />
        </div>
      </div>
      {(selectedCategory.length > 0 ||
        selectedFormats.length > 0 ||
        selectedSeason.length > 0 ||
        selectedYear.length > 0) && (
        <div className="selected-filter my-5 flex">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            ></path>
          </svg>
          <div className="w-full flex">
            {selectedCategory
              .concat(
                selectedYear.concat(selectedSeason.concat(selectedFormats))
              )
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className="mx-1 bg-blue-400 w-max px-2 rounded-lg text-white text-sm"
                  >
                    {item}
                  </div>
                );
              })}
          </div>
          <div className="flex text-gray-500 items-center justify-between w-48">
            <div className="flex text-sm">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                ></path>
              </svg>{" "}
              Popularity
            </div>
            <div>|</div>
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
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              ></path>
            </svg>
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
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              ></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
