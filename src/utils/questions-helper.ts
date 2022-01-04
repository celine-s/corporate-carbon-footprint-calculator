import { collection, getDocs, query } from 'firebase/firestore/lite';
import { Question } from '../data/question';
import { initializeFirestore } from './get-firestore';

export const getQuestions = async () => {
  const database = await initializeFirestore();

  const q = query(collection(database, 'questions'));

  const querySnapshot = await getDocs(q);
  const questions: Question[] = [];
  querySnapshot.forEach((doc) => {
    questions.push(doc.data() as Question);
  });
  return questions;
};
