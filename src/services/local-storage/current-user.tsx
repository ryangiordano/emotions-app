import { createContext, useCallback, useContext, useState } from "react";
import { getFromLocalStorage, setLocalStorage } from "./shared";

export function getCurrentUserId(): string | null {
  return getFromLocalStorage<string>("current-user");
}

export function setCurrentUserId(user: string) {
  setLocalStorage("current-user", JSON.stringify(user));
}

export const CurrentUserContext = createContext<{
  userId: string | null;
  setUserId: (userId: string) => void;
}>({
  userId: null,
  setUserId: () => {},
});

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}

export default function CurrentUserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, _setUserId] = useState<string | null>(
    getFromLocalStorage<string>("current-user"),
  );

  const setUserId = useCallback((userId: string) => {
    _setUserId(userId);
    setCurrentUserId(userId);
  }, []);
  return (
    <CurrentUserContext.Provider value={{ userId, setUserId }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
