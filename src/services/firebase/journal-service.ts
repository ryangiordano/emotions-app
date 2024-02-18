import {
  type DocumentData,
  type DocumentSnapshot,
  type Firestore,
  type QuerySnapshot,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
  collection,
  addDoc,
} from "firebase/firestore";
import { assertAuthedUser } from "./authentication-service";
import { auth } from ".";
import { getCurrentlySelectedUser, getUser } from "./user-service";
import { type Journal } from "./types";

export async function createJournal(
  db: Firestore,
  {
    text,
    emotion,
  }: {
    text: string;
    emotion: string;
  },
) {
  assertAuthedUser(auth.currentUser);
  const userDoc = await getCurrentlySelectedUser(db);
  const journalsRef = collection(db, "journals");
  return await addDoc(journalsRef, {
    text,
    emotion,
    timestamp: serverTimestamp(),
    accountId: auth.currentUser.uid,
    user: userDoc.ref,
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
  return await getDocs(
    query(journalsCollection, where("accountId", "==", accountId)),
  )
    .then(({ docs }) => {
      return docs;
    })
    .catch((e) => {
      return e;
    });
}

export async function getJournalsByUser(
  db: Firestore,
  userId: string,
  startDate: Date,
  endDate: Date,
) {
  assertAuthedUser(auth.currentUser);
  const currentUser = await getUser(db, userId);

  const journalsCollection = collection(db, "journals");
  return await (getDocs(
    query(
      journalsCollection,
      where("user", "==", currentUser.ref),
      where("timestamp", ">", startDate),
      where("timestamp", "<", endDate),
    ),
  ) as Promise<QuerySnapshot<Journal, DocumentData>>);
}

export function updateJournal(db: Firestore) {}

export function deleteJournal(db: Firestore) {}

export async function getJournal(db: Firestore, journalId: string) {
  const journalsRef = collection(db, "journals");
  const journalDocRef = doc(journalsRef, journalId);

  return await (getDoc(journalDocRef) as Promise<
    DocumentSnapshot<Journal, DocumentData>
  >);
}
