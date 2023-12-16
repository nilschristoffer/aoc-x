import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { ApiLeaderboard } from "./apiType";

export const useLocalStorage = <T,>(key: string, initialValue?: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
};

const AdventOfCodeContext = createContext<{
  leaderboard: ApiLeaderboard | null;
  setLeaderboard: (leaderboard: ApiLeaderboard) => void;
}>({
  leaderboard: null,
  setLeaderboard: () => ({}),
});

export const AdventOfCodeContextProvider: React.FunctionComponent<
  PropsWithChildren
> = ({ children }) => {
  const [leaderboard, setLeaderboard] = useLocalStorage<ApiLeaderboard | null>(
    "aoc22-leaderboard"
  );

  return (
    <AdventOfCodeContext.Provider value={{ leaderboard, setLeaderboard }}>
      {children}
    </AdventOfCodeContext.Provider>
  );
};

export const useAdventOfCodeJson = () => useContext(AdventOfCodeContext);
