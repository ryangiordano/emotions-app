import {
  Firestore,
  doc,
  getDocs,
  limit,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { auth } from ".";
import { assertAuthedUser } from "./authentication-service";
import { getCurrentUser, setCurrentUser } from "../local-storage/current-user";
import { UserError, UserErrorCodes, UserErrorCodeText } from "./user-errors";
import { User } from "./types";

export async function createUser(
  db: Firestore,
  { username }: { username: string }
) {
  /** probably a cleaner way to assert logged in user.
   * Could maybe emit an event when the logged in status changes
   */
  assertAuthedUser(auth.currentUser);

  return addDoc(collection(db, "users"), {
    name: username,
    accountId: auth.currentUser.uid,
  })
    .then((docRef) => {
      return docRef;
    })
    .catch((e) => {
      return e;
    });
}

export function getUser(db: Firestore) {
  const usersRef = collection(db, "users");
  assertAuthedUser(auth.currentUser);

  return getDocs(
    query(usersRef, where("accountId", "==", auth.currentUser.uid), limit(1))
  )
    .then((user) => {
      return user.docs[0];
    })
    .catch((e) => {
      return e;
    });
}

export function getUsers(db: Firestore) {
  const usersRef = collection(db, "users");
  assertAuthedUser(auth.currentUser);

  return getDocs(
    query(usersRef, where("accountId", "==", auth.currentUser.uid))
  )
    .then((user) => {
      return user.docs;
    })
    .catch((e) => {
      return e;
    });
}

export async function getCurrentlySelectedUser(db: Firestore) {
  const currentUser = getCurrentUser();
  if (currentUser) {
    return currentUser;
  }
  const users = await getUsers(db);
  /** If there are no users, we need to handle that at a higher level (redirect to user-create page) */
  if (!users.length) {
    throw new UserError(UserErrorCodes.noUsers);
  }
  setCurrentUser(users[0]);

  return users[0];
}

export function updateUser(db: Firestore) {}

export function deleteUser(db: Firestore) {}
