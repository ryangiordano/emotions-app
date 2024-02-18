import {
  doc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
  addDoc,
} from "firebase/firestore";
import type {
  DocumentData,
  DocumentSnapshot,
  Firestore,
  QuerySnapshot,
} from "firebase/firestore";
import { auth } from ".";
import { assertAuthedUser } from "./authentication-service";
import { UserError, UserErrorCodes } from "./user-errors";
import { type User } from "./types";
import {
  getCurrentUserId,
  setCurrentUserId,
} from "../local-storage/current-user";

export async function createUser(
  db: Firestore,
  { username }: { username: string },
) {
  /** probably a cleaner way to assert logged in user.
   * Could maybe emit an event when the logged in status changes
   */
  assertAuthedUser(auth.currentUser);

  return await addDoc(collection(db, "users"), {
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

export async function getUser(
  db: Firestore,
  uid: string,
): Promise<DocumentSnapshot<User, DocumentData>> {
  const usersRef = collection(db, "users");
  const userDocRef = doc(usersRef, uid);

  return await (getDoc(userDocRef) as Promise<
    DocumentSnapshot<User, DocumentData>
  >);
}

export async function getUsers(
  db: Firestore,
): Promise<QuerySnapshot<User, DocumentData>> {
  const usersRef = collection(db, "users");
  assertAuthedUser(auth.currentUser);
  return await (getDocs(
    query(usersRef, where("accountId", "==", auth.currentUser.uid)),
  ) as Promise<QuerySnapshot<User, DocumentData>>);
}

export async function getCurrentlySelectedUser(db: Firestore) {
  const currentUserId = getCurrentUserId();
  if (currentUserId) {
    const user = await getUser(db, currentUserId);
    return user;
  }
  const users = await getUsers(db);
  if (!users.docs.length) {
    throw new UserError(UserErrorCodes.noUsers);
  }
  setCurrentUserId(users.docs[0].id);

  return users.docs[0];
}

export function updateUser(db: Firestore) {}

export function deleteUser(db: Firestore) {}
