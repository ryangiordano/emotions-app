import { Firestore, getDocs, limit, query, where } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { auth } from ".";
import { assertAuthedUser } from "./authentication-service";

export async function createUser(
  db: Firestore,
  { userName }: { userName: string }
) {
  /** probably a cleaner way to assert logged in user.
   * Could maybe emit an event when the logged in status changes
   */
  assertAuthedUser(auth.currentUser);

  return addDoc(collection(db, "users"), {
    name: userName,
    accountId: auth.currentUser.uid,
  })
    .then((docRef) => {
      return docRef;
    })
    .catch((e) => {
      return e;
    });
}

export function getUser(db: Firestore, accountId: string) {
  const usersRef = collection(db, "users");

  return (
    getDocs(query(usersRef, where("accountId", "==", accountId), limit(1)))
      // TODO: return the currently selected user
      .then((user) => {
        return user.docs[0];
      })
      .catch((e) => {
        return e;
      })
  );
}

export function updateUser(db: Firestore) {}

export function deleteUser(db: Firestore) {}
