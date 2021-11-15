import { GetStaticProps, NextPage } from 'next';
import { Page } from '../../layouts/page';
import React, { useMemo, useState } from 'react';
import { InputField } from '../../elements/input-field';
import { Copy } from '../../identity/copy';
import { Heading2 } from '../../identity/heading-2';
import { Question } from '../../data/questions';
import Questions from '../../data/questions.json';
import { Button, ButtonVariants } from '../../elements/button';

type Props = {
  questions: Question[];
};

const theory = {
  title: 'Some Facts über diese Kategorie',
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error neque odio explicabo, necessitatibus eaque numquam tenetur deleniti sequi at facere earum eos, voluptates culpa nam, quae exercitationem recusandae? Aspernatur, aliquam.',
};

const initialAnswerProp = '';
const initialImpact = '';

const Frage: NextPage<Props> = ({ questions }) => {
  const [answer, setAnswer] = useState(initialAnswerProp);
  const [impact, setImpact] = useState(initialImpact);
  const [questionIndex, setQuestionIndex] = useState(0);
  const MAX_QUESTION_NUMBER = questions.length;

  const sortedQuestions = useMemo(() => {
    return questions.sort((first, second) => first.category.localeCompare(second.category));
  }, [questions]);

  const setLocalStorage = (key: string, value: string) => window.localStorage.setItem(key, value);

  const getLocalStorage = (key: string) => window.localStorage.getItem(key);

  const getImpactAndAnswerFromQuestionBefore = () => {
    setQuestionIndex(questionIndex - 1),
      setLocalStorage(questionIndex.toString(), answer),
      getLocalStorage((questionIndex - 1).toString()) !== undefined
        ? setAnswer(getLocalStorage((questionIndex - 1).toString()) || initialAnswerProp)
        : '',
      getLocalStorage((questionIndex - 1).toString()) !== undefined
        ? setImpact(getLocalStorage('impact' + (questionIndex - 1).toString()) || initialImpact)
        : '';
  };

  const saveImpactAndAnswer = () => {
    setQuestionIndex(questionIndex + 1),
      setLocalStorage(questionIndex.toString(), answer),
      setLocalStorage('impact' + questionIndex.toString(), impact),
      getLocalStorage((questionIndex + 1).toString()) !== undefined
        ? setAnswer(getLocalStorage((questionIndex + 1).toString()) || initialAnswerProp)
        : initialAnswerProp,
      getLocalStorage(('impact' + questionIndex + 1).toString()) !== undefined
        ? setImpact(getLocalStorage('impact' + (questionIndex + 1).toString()) || initialImpact)
        : initialImpact;
  };

  return (
    <Page>
      {sortedQuestions.slice(questionIndex, questionIndex + 1).map(({ title, label, emissionfactor }) => (
        <div key={title}>
          <div className="md:grid md:grid-cols-[3fr,1fr] flex flex-col-reverse">
            <div className="flex flex-1">
              <Heading2>{title}</Heading2>
            </div>
            <div className="md:text-right mb-8">
              Frage {questionIndex + 1} von {MAX_QUESTION_NUMBER}
            </div>
          </div>
          <InputField
            type="number"
            label={label}
            name="answer"
            id="number"
            step="1"
            placeholder="0"
            min="0"
            max="100"
            value={answer}
            onChange={(value) => {
              setAnswer(value), setImpact((parseFloat(value) * emissionfactor).toString());
            }}
          ></InputField>
          <br />
          {answer ? <Copy>Your impact is {impact === null ? '0' : impact}</Copy> : <Copy>Please answer the question</Copy>}
        </div>
      ))}

      <div className="grid grid-cols-2 md:grid-cols-[2fr,1fr] items-center">
        {questionIndex <= 0 ? (
          <div></div>
        ) : (
          <div className="grid justify-start">
            <Button variant={ButtonVariants.Text} onClick={() => getImpactAndAnswerFromQuestionBefore()}>
              ← Vorherige Frage
            </Button>
          </div>
        )}
        <div className="grid justify-items-end">
          {questionIndex >= MAX_QUESTION_NUMBER - 1 ? (
            <Button
              variant={ButtonVariants.Text}
              onClick={() => {
                setLocalStorage(questionIndex.toString(), answer),
                  setLocalStorage('impact' + questionIndex.toString(), impact);
              }}
            >
              Save
            </Button>
          ) : (
            <Button variant={ButtonVariants.Text} onClick={() => saveImpactAndAnswer()}>
              Nächste Frage →
            </Button>
          )}
        </div>
      </div>
      <div className="border-2 p-8 mt-16">
        <Heading2>{theory.title}</Heading2>
        <Copy>{theory.content}</Copy>
      </div>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const questions = Object.values(Questions);

  return {
    props: { questions },
  };
};

export default Frage;
