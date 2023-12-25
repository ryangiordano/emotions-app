import {
  Firestore,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { auth } from ".";
import { assertAuthedUser } from "./authentication-service";
import { UserError, UserErrorCodes, UserErrorCodeText } from "./user-errors";
import { User } from "./types";
import {
  getCurrentUserId,
  setCurrentUserId,
} from "../local-storage/current-user";

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

export function getUser(db: Firestore, uid: string) {
  const usersRef = collection(db, "users");
  const userDocRef = doc(usersRef, uid);

  return getDoc(userDocRef)
    .then((user) => {
      return user;
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
      return user;
    })
    .catch((e) => {
      return e;
    });
}

export async function getCurrentlySelectedUser(db: Firestore) {
  const currentUserId = getCurrentUserId();
  if (currentUserId) {
    const user = await getUser(db, currentUserId);
    return user;
  }
  const users = await getUsers(db);
  /** If there are no users, we need to handle that at a higher level (redirect to user-create page) */
  if (!users.length) {
    throw new UserError(UserErrorCodes.noUsers);
  }
  setCurrentUserId(users[0].id);

  return users[0];
}

export function updateUser(db: Firestore) {}

export function deleteUser(db: Firestore) {}
