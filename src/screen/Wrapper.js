import React, { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import Filter from "../components/layouts/Filter";
import Modal from "../components/layouts/Modal";
import Home from "./Home";
const Wrapper = () => {
  const { isOpen } = useContext(ModalContext);
  return (
    <div className="content bg-gray-900 min-h-screen ">
      <div className="container lg:px-28 px-4 mx-auto pt-14">
        <Filter />
        <Home />
      </div>
      {isOpen && <Modal />}
    </div>
  );
};

export default Wrapper;
