import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Page } from '../../layouts/page';
import React, { useEffect, useState } from 'react';
import { InputField } from '../../elements/input-field';
import { Copy } from '../../identity/copy';
import { Heading2 } from '../../identity/heading-2';
import { Question } from '../../data/questions';
import Questions from '../../data/questions.json';
import { Heading1 } from '../../identity/heading-1';
import { getLocalStorage, setLocalStorage } from '../../utils/local-storage';
import { LinkElement } from '../../elements/link';
import { useRouter } from 'next/dist/client/router';

type Props = {
  question: Question;
  MAX_QUESTION_NUMBER: number;
};

const LOCALSTORAGE_IMPACT_KEY = 'impact';

//later into data file or DB
const theory = {
  title: 'Facts/Transparenz über diese Kategorie und oder Frage',
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error neque odio explicabo, necessitatibus eaque numquam tenetur deleniti sequi at facere earum eos, voluptates culpa nam, quae exercitationem recusandae? Aspernatur, aliquam.',
};

const Frage: NextPage<Props> = ({
  question: { id, title, label, emissionfactor, initialAnswer, category },
  MAX_QUESTION_NUMBER,
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
    <Page>
      <Heading1>Kategorie {category}</Heading1>
      <div>
        <div className="md:grid md:grid-cols-[3fr,1fr] flex flex-col-reverse">
          <div className="flex flex-1 h-24">
            <Heading2>{title}</Heading2>
          </div>
          <div className="md:text-right mb-8">
            Frage {id} von {MAX_QUESTION_NUMBER}
          </div>
        </div>
        <InputField
          type="number"
          label={label}
          name="answer"
          id="number"
          step="1"
          placeholder={initialAnswer.toString()}
          min="0"
          max="100"
          value={answer}
          onChange={(value) => {
            setAnswer(value);
            setImpact((parseFloat(value) * emissionfactor).toString());
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
              border={true}
              onClick={() => saveCurrentQuestionIntoLocalStorage()}
            >
              ← Vorherige Frage
            </LinkElement>
          </div>
        )}
        <div className="grid justify-items-end">
          <LinkElement href={hrefNextQuestion} border={true} onClick={() => saveCurrentQuestionIntoLocalStorage()}>
            {parseInt(id) >= MAX_QUESTION_NUMBER ? 'Save' : 'Nächste Frage →'}
          </LinkElement>
        </div>
      </div>
      <div className="border-2 p-8 mt-16">
        <Heading2>{theory.title}</Heading2>
        <Copy>{theory.content}</Copy>
      </div>
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Questions.map(({ id }) => ({ params: { frage: id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const questions = Object.values(Questions);
  const currentId = params?.frage || '1';
  return {
    props: {
      question: questions.find(({ id }) => currentId === id) || questions[0],
      MAX_QUESTION_NUMBER: questions.length,
    },
  };
};

export default Frage;
