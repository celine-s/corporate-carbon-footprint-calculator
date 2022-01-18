import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Copy } from '../../identity/copy';
import { Heading2 } from '../../identity/heading-2';
import { getLocalStorage, setLocalStorage } from '../../utils/local-storage';
import { LinkElement } from '../../elements/link';
import { CategoriesNavigation } from '../../compositions/categories-navigation';
import { Question } from '../../data/question';
import { Button } from '../../elements/button';
import { getQuestions } from '../../utils/questions-helper';
import { v4 as uuidv4 } from 'uuid';
import { Question1 } from '../../compositions/question-form-1';
import { Question2 } from '../../compositions/question-form-2';
import { Question3 } from '../../compositions/question-form-3';
import { Question4 } from '../../compositions/question-form-4';
import { Question5 } from '../../compositions/question-form-5';
import { Question6 } from '../../compositions/question-form-6';
import { Question7 } from '../../compositions/question-form-7';
import { Question8 } from '../../compositions/question-form-8';
import { Question9 } from '../../compositions/question-form-9';
import { Question10 } from '../../compositions/question-form-10';
import { Question11 } from '../../compositions/question-form-11';
import { useRouter } from 'next/dist/client/router';
import { WhatIsHappening } from '../../components/info-box';

type Props = {
  question: Question;
  MAX_QUESTION_NUMBER: number;
  categoriesWithIndexes: { [key: string]: string[] };
  questionIDs: string[];
};

const Frage: NextPage<Props> = ({
  question,
  questionIDs,
  MAX_QUESTION_NUMBER,
  categoriesWithIndexes,
  question: { id, title, category, infobox, whatTitle, whatText },
}) => {
  const [answer, setAnswer] = useState(getLocalStorage(id));
  const router = useRouter();

  useEffect(() => {
    const localStorageValue = getLocalStorage(id);
    if (localStorageValue !== undefined) {
      setAnswer(localStorageValue);
    }
  }, [id]);

  const saveCurrentQuestionIntoLocalStorage = () => {
    setLocalStorage(id, answer);
  };

  const submitAnswers = async () => {
    let answers = questionIDs?.map((id) => getLocalStorage(id));
    answers = Object.assign({}, answers);
    const uniqueId = uuidv4();
    const response = await fetch('/api/save-response', {
      method: 'POST',
      body: JSON.stringify({ uniqueId, answers }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      router.push(`/rechner/report/${uniqueId}`);
      localStorage.clear();
    } else {
      alert('Technischer fehler beim sichern. Deine Daten sind weiterhin lokal gespeichert.');
    }
  };

  return (
    <CategoriesNavigation
      question={question}
      categoriesWithIndexes={categoriesWithIndexes}
      questionsLength={MAX_QUESTION_NUMBER}
    >
      <div className="bg-white-100 p-6 rounded-md">
        <div className="text-xs py-2">
          Frage {categoriesWithIndexes[category].findIndex((element) => element === id) + 1}/
          {categoriesWithIndexes[category].length}
        </div>
        <div className="mb-8">
          <Heading2>{title}</Heading2>
          <div className="-mt-8 mb-16">
            <Copy>{infobox}</Copy>
          </div>
          {id === '1' && <Question1 answer={answer} callback={setAnswer} />}
          {id === '2' && <Question2 answer={answer} callback={setAnswer} />}
          {id === '3' && <Question3 answer={answer} callback={setAnswer} />}
          {id === '4' && <Question4 answer={answer} callback={setAnswer} />}
          {id === '5' && <Question5 answer={answer} callback={setAnswer} />}
          {id === '6' && <Question6 answer={answer} callback={setAnswer} />}
          {id === '7' && <Question7 callback={setAnswer} answer={answer} />}
          {id === '8' && <Question8 callback={setAnswer} answer={answer} />}
          {id === '9' && <Question9 callback={setAnswer} answer={answer} />}
          {id === '10' && <Question10 callback={setAnswer} answer={answer} />}
          {id === '11' && <Question11 callback={setAnswer} answer={answer} />}
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          {parseInt(id) > 1 && (
            <div className="grid justify-start">
              <LinkElement href={`/rechner/${(parseInt(id) - 1).toString()}`} onClick={saveCurrentQuestionIntoLocalStorage}>
                <Button buttonColorGray={true}>Zurück</Button>
              </LinkElement>
            </div>
          )}
          <div className="flex justify-end">
            {parseInt(id) >= MAX_QUESTION_NUMBER ? (
              <Button
                onClick={() => {
                  saveCurrentQuestionIntoLocalStorage();
                  submitAnswers();
                }}
              >
                Ende
              </Button>
            ) : (
              <LinkElement href={`/rechner/${(parseInt(id) + 1).toString()}`} onClick={saveCurrentQuestionIntoLocalStorage}>
                <Button>Weiter</Button>
              </LinkElement>
            )}
          </div>
        </div>
      </div>
      <WhatIsHappening title={whatTitle} content={whatText} />
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
  const question = questions.find(({ id }) => currentId === id) || questions[0];
  const categoriesWithIndexes = questions.reduce((acc, obj) => {
    const key = obj['category'];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj.id);
    for (const val in acc) {
      acc[val].sort((a, b) => parseInt(a) - parseInt(b));
    }
    return acc;
  }, {} as { [key: string]: string[] });
  const allIds = questions.map(({ id }) => id);
  return {
    props: {
      questions,
      categoriesWithIndexes,
      question,
      MAX_QUESTION_NUMBER: questions.length,
      questionIDs: allIds.sort((firstEl, secondEl) => parseInt(firstEl) - parseInt(secondEl)),
    },
    revalidate: 14400,
  };
};

export default Frage;
