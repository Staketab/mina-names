import { useEffect } from "react";

export const useKeyPress = (key: string, cb: (e: any) => void) => {
  const onKeyPress = (e: KeyboardEvent) => {
    e.code === key && cb(e);
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress);
    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  }, [cb]);
};
