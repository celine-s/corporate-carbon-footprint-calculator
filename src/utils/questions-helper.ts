import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore/lite';
import { Question } from '../data/question';
import { initializeFirestore } from './get-firestore';
import Questions from '../data/questions.json';

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

export const setQuestions = async () => {
  const database = await initializeFirestore();
  const questions = Questions;

  questions.map(
    async ({ id, title, category, label, initialAnswer, emissionfactor }) =>
      await setDoc(doc(database, 'questions', id), { id, initialAnswer, label, emissionfactor, category, title })
  );
};
