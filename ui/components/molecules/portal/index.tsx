import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./index.css";

let elem = typeof window !== 'undefined' && window.document.createElement("div");
elem.classList?.add("portal");

const Portal = ({ children, onClick }) => {
  useEffect(() => {
    elem.addEventListener("click", onClick);
    document.body.appendChild(elem);
    return () => {
      elem.removeEventListener("click", onClick);
      document.querySelector(".portal").remove();
    };
  }, []);

  return createPortal(children, elem);
};

export default Portal;
