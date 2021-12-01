import { initializeApp } from 'firebase/app';
import { collection, DocumentData, getDocs, getFirestore, query } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.API_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

export const initializeFirestore = async (documentTitle: string) => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const q = query(collection(db, documentTitle));

  const querySnapshot = await getDocs(q);
  const allDocuments: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    allDocuments.push(doc.data());
  });

  return allDocuments;
};
