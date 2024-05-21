import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useLocalStorage = (
  key?: string
): [string, Dispatch<SetStateAction<string | boolean>>] => {
  const localStorageItem =
    (typeof window !== "undefined" && localStorage?.getItem(key)) || "";

  const [value, setValue] = useState(() => {
    return localStorageItem;
  });

  useEffect(() => {
    if (key) {
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue];
};
