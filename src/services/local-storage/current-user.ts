import { useCallback, useState } from "react";
import type { User } from "../firebase/types";
import { getFromLocalStorage, setLocalStorage } from "./shared";

export function getCurrentUserId(): string | null {
  return getFromLocalStorage<string>("current-user");
}

export function setCurrentUserId(user: string) {
  setLocalStorage("current-user", JSON.stringify(user));
}

export function useCurrentUser() {
  const [userId, _setUserId] = useState<string | null>(
    getFromLocalStorage<string>("current-user")
  );

  const setUserId = useCallback((userId: string) => {
    _setUserId(userId);
    setCurrentUserId(userId);
  }, []);
  return { userId, setUserId };
}
