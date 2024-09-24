import { useState } from "react";

export const hasAllowedLs = () =>
  window.localStorage.getItem("aoc-x-cookies") === "true";

export const setAllowedLs = () => {
  window.localStorage.setItem("aoc-x-cookies", "true");
};

export const useLocalStorage = <T>(
  key: string,
  initialValue: T | undefined = undefined
) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const hasAllowed = hasAllowedLs();

      if (!hasAllowed) {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const hasAllowed = hasAllowedLs();
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (!hasAllowed) {
        return;
      }
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
};
