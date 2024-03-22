import { useEffect } from "react";

export const useWindowResize = (callback) => {
  useEffect(() => {
    window.addEventListener("load", callback);
    window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("load", callback);
      window.removeEventListener("resize", callback);
    };
  }, [callback]);
};
