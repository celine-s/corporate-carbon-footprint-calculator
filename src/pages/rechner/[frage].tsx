import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { InputField } from '../../elements/input-field';
import { Copy } from '../../identity/copy';
import { Heading2 } from '../../identity/heading-2';
import { getLocalStorage, setLocalStorage } from '../../utils/local-storage';
import { LinkElement } from '../../elements/link';
import { useRouter } from 'next/dist/client/router';
import { CategoriesNavigation } from '../../compositions/categories-navigation';
import { Question } from '../../data/question';
import { Button } from '../../elements/button';
import { InformationCircleIcon } from '@heroicons/react/solid';
import { getQuestions } from '../../utils/questions-helper';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  question: Question;
  MAX_QUESTION_NUMBER: number;
  categoriesWithIndexes?: { [key: string]: string[] };
  questionIDs: string[];
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
  questionIDs,
  MAX_QUESTION_NUMBER,
  categoriesWithIndexes,
  question: { id, title, label, emissionfactor, initialAnswer, category },
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
    parseInt(id) >= MAX_QUESTION_NUMBER ? '/rechner/report/' : `/rechner/${(parseInt(id) + 1).toString()}`;

  return (
    <CategoriesNavigation
      question={question}
      categoriesWithIndexes={categoriesWithIndexes}
      questionsLength={MAX_QUESTION_NUMBER}
    >
      <div className="bg-white-100 p-6 rounded-md">
        <div className="text-xs py-2">
          Frage {categoriesWithIndexes?.[category].findIndex((element) => element === id) || 0 + 1}/
          {categoriesWithIndexes?.[category].length}
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
          />
          <br />
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          {parseInt(id) <= 1 ? (
            <div />
          ) : (
            <div className="grid justify-start">
              <LinkElement href={`/rechner/${(parseInt(id) - 1).toString()}`} onClick={saveCurrentQuestionIntoLocalStorage}>
                <Button buttonColorGray={true}>Zurück</Button>
              </LinkElement>
            </div>
          )}
          <LinkElement href={hrefNextQuestion} onClick={saveCurrentQuestionIntoLocalStorage}>
            <div className="flex justify-end">
              {parseInt(id) >= MAX_QUESTION_NUMBER ? (
                <Button onClick={() => submitAnswers(questionIDs)}>Save</Button>
              ) : (
                <Button>Weiter</Button>
              )}
            </div>
          </LinkElement>
        </div>
      </div>
      <div className="mt-24">
        <div className="font-bold py-2 flex flex-row">
          <InformationCircleIcon className="h-6 w-6 mr-2" />
          What is happening here?
        </div>
        <Heading2>{theory.title}</Heading2>
        <Copy>{theory.content}</Copy>
      </div>
    </CategoriesNavigation>
  );
};

const submitAnswers = async (questionIDs: string[]) => {
  const answers = questionIDs?.map((id) => getLocalStorage(id) || '');
  const id = uuidv4();
  const response = await fetch('/api/save-response', {
    method: 'POST',
    body: JSON.stringify({ id, answers }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  console.log(data);
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
    return acc;
  }, {} as { [key: string]: string[] });

  return {
    props: {
      questions,
      categoriesWithIndexes,
      question,
      MAX_QUESTION_NUMBER: questions.length,
      questionIDs: questions.map(({ id }) => id),
    },
    revalidate: 14400,
  };
};

export default Frage;
