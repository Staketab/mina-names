import { bag } from "@/comman/constants";
import { useStoreContext } from "@/store";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useLocalStorage = (
  key?: string,
  initialValue?: string
): [string, Dispatch<SetStateAction<string | boolean>>] => {
  const {
    actions: { initStore },
  } = useStoreContext();
  const localStorageItem =
    (typeof window !== "undefined" && localStorage?.getItem(key)) ||
    initialValue ||
    "";
  const [value, setValue] = useState(() => {
    return localStorageItem;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  useEffect(() => {
    const storage = localStorage.getItem(bag);
    if (storage) {
      const bag = JSON.parse(storage);
      initStore({
        modals: [],
        bag: bag,
      });
    }
  }, []);

  return [value, setValue];
};
