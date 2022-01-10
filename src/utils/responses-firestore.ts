import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore/lite';
import { Response } from '../data/response';
import { initializeFirestore } from './get-firestore';

export const getResponseWithId = async (id?: string) => {
  if (!id) {
    return null;
  }
  const database = await initializeFirestore();
  const docRef = doc(database, 'responses', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const getResponses = async () => {
  const database = await initializeFirestore();

  const q = query(collection(database, 'responses'));

  const querySnapshot = await getDocs(q);
  const responses: Response[] = [];
  querySnapshot.forEach((doc) => {
    responses.push(doc.data() as Response);
  });
  return responses;
};
