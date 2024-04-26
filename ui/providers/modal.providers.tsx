"use client"
import { createContext, useContext } from "react";

const ModalContext = createContext([]);

export const ModalProvider = ({ children }) => {
  return (
    <ModalContext.Provider value={["sd"]}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
