import type { User } from "../firebase/types";
import { getFromLocalStorage, setLocalStorage } from "./shared";

export function getCurrentUser(): User | null {
  return getFromLocalStorage<User>("current-user");
}

export function setCurrentUser(user: User) {
  setLocalStorage("current-user", JSON.stringify(user));
}
