import { Firestore, getDocs, limit, query, where } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { auth } from ".";
import { assertAuthedUser } from "./authentication-service";

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

export function getCurrentUser(db: Firestore) {
  const usersRef = collection(db, "users");
  assertAuthedUser(auth.currentUser);

  return getDocs(
    query(
      usersRef,
      where("accountId", "==", auth.currentUser.uid),
      where("defaultUser", "==", true),
      limit(1)
    )
  )
    .then((user) => {
      return user.docs[0];
    })
    .catch((e) => {
      return e;
    });
}

export function setDefaultUser(db: Firestore) {
  const usersRef = collection(db, "users");
  assertAuthedUser(auth.currentUser);

  return getDocs(
    query(
      usersRef,
      where("accountId", "==", auth.currentUser.uid),
      where("defaultUser", "==", true),
      limit(1)
    )
  )
    .then((user) => {
      return user.docs[0];
    })
    .catch((e) => {
      return e;
    });
}

export function updateUser(db: Firestore) {}

export function deleteUser(db: Firestore) {}
