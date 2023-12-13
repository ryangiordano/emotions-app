import { Auth, User } from "firebase/auth";

export function assertAuthedUser(user: User | null): asserts user is User {
  if (!user) {
    throw new Error("User is not authenticated");
  }
}
