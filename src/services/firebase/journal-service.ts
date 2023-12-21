import {
  Firestore,
  getDocs,
  limit,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { assertAuthedUser } from "./authentication-service";
import { auth } from ".";
import { getCurrentlySelectedUser } from "./user-service";

export async function createJournal(
  db: Firestore,
  {
    text,
    emotion,
  }: {
    text: string;
    emotion: string;
  }
) {
  assertAuthedUser(auth.currentUser);
  const userDoc = await getCurrentlySelectedUser(db);
  const journalsRef = collection(db, "journals");
  return addDoc(journalsRef, {
    text,
    emotion,
    timestamp: serverTimestamp(),
    accountId: auth.currentUser.uid,
    user: userDoc,
  })
    .then((journal) => {
      return journal;
    })
    .catch((e) => {
      return e;
    });
}

export async function getJournalsByAccount(db: Firestore, accountId: string) {
  const journalsCollection = collection(db, "journals");
  return getDocs(query(journalsCollection, where("accountId", "==", accountId)))
    .then(({ docs }) => {
      return docs;
    })
    .catch((e) => {
      return e;
    });
}

export async function getJournalsByUser(db: Firestore) {
  assertAuthedUser(auth.currentUser);

  const userDoc = await getCurrentlySelectedUser(db);

  const journalsCollection = collection(db, "journals");
  return getDocs(query(journalsCollection, where("user", "==", userDoc.ref)))
    .then(({ docs }) => {
      return docs;
    })
    .catch((e) => {
      return e;
    });
}

export function updateJournal(db: Firestore) {}

export function deleteJournal(db: Firestore) {}

export async function getJournal(db: Firestore, journalId: string) {
  assertAuthedUser(auth.currentUser);

  const userDoc = await getCurrentlySelectedUser(db);

  const journalsCollection = collection(userDoc, "journals");
  return getDocs(
    query(journalsCollection, where("id", "==", journalId), limit(1))
  )
    .then((journal) => {
      return journal.docs[0].data();
    })
    .catch((e) => {
      return e;
    });
}
