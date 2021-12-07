import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { InputField } from '../../elements/input-field';
import { Copy } from '../../identity/copy';
import { Heading2 } from '../../identity/heading-2';
import { getLocalStorage, setLocalStorage } from '../../utils/local-storage';
import { LinkElement } from '../../elements/link';
import { useRouter } from 'next/dist/client/router';
import { CategoriesNavigation } from '../../compositions/categoriesNavigation';
import { initializeFirestore } from '../../utils/get-firestore';
import { collection, getDocs, query } from 'firebase/firestore/lite';
import { Question } from '../../data/question';
import { Button } from '../../elements/button';

type Props = {
  question: Question;
  MAX_QUESTION_NUMBER: number;
  allCategoriesWithIndexes: { [key: string]: string[] };
};

const LOCALSTORAGE_IMPACT_KEY = 'impact';

//later into data file or DB
const theory = {
  title: 'Facts/Transparenz über diese Kategorie und oder Frage',
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error neque odio explicabo, necessitatibus eaque numquam tenetur deleniti sequi at facere earum eos, voluptates culpa nam, quae exercitationem recusandae? Aspernatur, aliquam.',
};

const Frage: NextPage<Props> = ({
  question,
  question: { id, title, label, emissionfactor, initialAnswer },
  MAX_QUESTION_NUMBER,
  allCategoriesWithIndexes,
}) => {
  const [answer, setAnswer] = useState(getLocalStorage(id) || '');
  const [impact, setImpact] = useState(getLocalStorage(LOCALSTORAGE_IMPACT_KEY + id) || '');
  const router = useRouter();

  useEffect(() => {
    if (getLocalStorage(id) !== undefined) {
      setAnswer(getLocalStorage(id) || '');
      setImpact(getLocalStorage(LOCALSTORAGE_IMPACT_KEY + id) || '');
    }
  }, [id]);

  const saveCurrentQuestionIntoLocalStorage = () => {
    setLocalStorage(id, answer);
    setLocalStorage(LOCALSTORAGE_IMPACT_KEY + id, impact);
  };

  const hrefNextQuestion =
    parseInt(id) >= MAX_QUESTION_NUMBER ? '/rechner/saved' : `/rechner/${(parseInt(id) + 1).toString()}`;

  return (
    <CategoriesNavigation question={question} categoriesWithIndexes={allCategoriesWithIndexes}>
      <div className="w-full border-cornflower-500 border-2 my-6"></div>
      <div className="text-xs py-2">
        Frage {id}/{MAX_QUESTION_NUMBER}
      </div>
      <div>
        <div className="md:grid md:grid-cols-[3fr,1fr] flex flex-col-reverse">
          <div className="flex flex-1 h-24">
            <Heading2>{title}</Heading2>
          </div>
        </div>
        <InputField
          type="number"
          label={label}
          name="answer"
          id="number"
          step="1"
          placeholder={initialAnswer?.toString()}
          min="0"
          max="100"
          value={answer}
          onChange={(value) => {
            setAnswer(value);
            setImpact((parseFloat(value) * parseFloat(emissionfactor)).toString());
          }}
          onKeyDown={(key) => key === 'Enter' && router.push(hrefNextQuestion)}
        ></InputField>
        <br />
        {answer ? <Copy>Your impact is {impact}</Copy> : <Copy>Please answer the question</Copy>}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-[2fr,1fr] items-center">
        {parseInt(id) <= 1 ? (
          <div></div>
        ) : (
          <div className="grid justify-start">
            <LinkElement
              href={`/rechner/${(parseInt(id) - 1).toString()}`}
              onClick={() => saveCurrentQuestionIntoLocalStorage()}
            >
              <Button buttonColorGray={true}>← Vorherige Frage</Button>
            </LinkElement>
          </div>
        )}
        <LinkElement href={hrefNextQuestion} onClick={() => saveCurrentQuestionIntoLocalStorage()}>
          <div className="flex justify-end">
            <Button>{parseInt(id) >= MAX_QUESTION_NUMBER ? 'Save' : 'Nächste Frage →'}</Button>
          </div>
        </LinkElement>
      </div>
      <div className="border-2 p-8 mt-24 bg-gray-300">
        <div className="font-bold py-2">What is happening here?</div>
        <Heading2>{theory.title}</Heading2>
        <Copy>{theory.content}</Copy>
      </div>
    </CategoriesNavigation>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const questions = await getQuestions();

  return {
    paths: questions.map(({ id }) => ({ params: { frage: id } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const currentId = params?.frage || '1';
  const questions = await getQuestions();

  const allCategoriesWithIndexes = questions.reduce((acc, obj) => {
    const key = obj['category'];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj.id);
    return acc;
  }, {} as { [key: string]: string[] });

  return {
    props: {
      allCategoriesWithIndexes,
      question: questions.find(({ id }) => currentId === id) || questions[0],
      MAX_QUESTION_NUMBER: questions.length,
    },
    revalidate: 14400,
  };
};

const getQuestions = async () => {
  const database = await initializeFirestore();

  const q = query(collection(database, 'questions'));

  const querySnapshot = await getDocs(q);
  const questions: Question[] = [];
  querySnapshot.forEach((doc) => {
    questions.push(doc.data() as Question);
  });
  return questions;
};

export default Frage;
