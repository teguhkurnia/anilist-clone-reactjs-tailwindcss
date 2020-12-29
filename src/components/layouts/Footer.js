import React from "react";

const Footer = () => {
  return (
    <div className="footer h-60 bg-gray-800">
      <div className="container px-10 py-10">
        <div className="flex">
          <div className="w-1/2">
            <h3 className="text-blue-400 font-semibold mb-2">Site Theme</h3>
            <div className="button flex w-14 justify-between">
              <button className="border-2 border-black rounded align-text-bottom pt-0 pr-2 bg-white focus:outline-none font-semibold">
                A
              </button>
              <button className="border-2 border-gray-600 rounded text-gray-500 align-text-bottom pt-0 pr-2 bg-gray-800 focus:outline-none font-semibold">
                A
              </button>
            </div>
          </div>
          <div className="w-1/2">B</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
