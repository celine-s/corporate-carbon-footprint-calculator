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

  try {
    for (const idx in questions) {
      const { id, title, category, label, infobox, initialAnswer, whatText, whatTitle, constraints, emissionfactor } =
        questions[idx];
      await setDoc(doc(database, 'questions', id), {
        id,
        title,
        category,
        label,
        infobox,
        initialAnswer,
        whatText,
        whatTitle,
        constraints,
        emissionfactor,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
