import React, { useState } from "react";

const Navbar = () => {
  const [menus, setMenus] = useState([
    "Home",
    "Profile",
    "Anime List",
    "Manga List",
    "Browse",
    "Forum",
  ]);
  const menuList = menus.map((menu, index) => (
    <li
      key={index}
      className="lg:mx-3 my-2 lg:py-4 font-semibold text-gray-500 hover:text-gray-200 cursor-pointer text-sm"
    >
      {menu}
    </li>
  ));
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-gray-800 w-full hidden">
      <div className="container lg:flex mx-auto lg:px-28  items-center h-full justify-between">
        <div className="brand flex justify-between items-center border-b lg:border-none border-gray-600 py-4 px-3  text-white">
          <a href="/" className="text-2xl">
            TekAnime
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5 lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </div>
        <ul
          className={`${
            open ? "flex" : "hidden"
          } lg:flex px-3 py-2 lg:py-0 justify-between flex-col lg:flex-row`}
        >
          {menuList}
        </ul>
        <div className="w-30 hidden lg:block">asd</div>
      </div>
    </nav>
  );
};

export default Navbar;
