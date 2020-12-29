import React, { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState({
    title: null,
    coverImage: null,
    bannerImage: null,
  });
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, info, setInfo }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
