import { GetStaticProps, NextPage } from 'next';
import { Page } from '../../layouts/page';
import React, { useMemo, useState } from 'react';
import { InputField } from '../../elements/input-field';
import { Copy } from '../../identity/copy';
import { Heading2 } from '../../identity/heading-2';
import { Question } from '../../data/questions';
import Questions from '../../data/questions.json';
import { Button, ButtonVariant } from '../../elements/button';
import { Heading1 } from '../../identity/heading-1';
import {
  getLocalStorage,
  setLocalStorage,
  ifQuestionHasAnswer,
  initialAnswerProp,
  initialImpact,
  theory,
  isInputValid,
} from '../../utils/helper-functions';

type Props = {
  questions: Question[];
  MAX_QUESTION_NUMBER: number;
};

const Frage: NextPage<Props> = ({ questions, MAX_QUESTION_NUMBER }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState(initialAnswerProp);
  const [impact, setImpact] = useState(initialImpact);

  const sortedQuestions = useMemo(() => {
    return questions.sort((first, second) => first.category.localeCompare(second.category));
  }, [questions]);

  const setAnswerFromLocalStorage = (index: number) => setAnswer(getLocalStorage(index.toString()) || initialAnswerProp);
  const setImpactFromLocalStorage = (index: number) =>
    setImpact(getLocalStorage('impact' + index.toString()) || initialImpact);

  const setQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    if (ifQuestionHasAnswer(index)) {
      setAnswerFromLocalStorage(index);
      setImpactFromLocalStorage(index);
    }
  };

  const saveCurrentQuestionIntoLocalStorage = () => {
    setLocalStorage(currentQuestionIndex.toString(), answer);
    setLocalStorage('impact' + currentQuestionIndex.toString(), impact);
  };

  const setNextQuestion = (index: number) => {
    if (isInputValid(answer.toString())) {
      setQuestion(index);
      saveCurrentQuestionIntoLocalStorage();
    }
  };

  return (
    <Page>
      <Heading1>Question Loop über alli Frage</Heading1>
      {sortedQuestions.slice(currentQuestionIndex, currentQuestionIndex + 1).map(({ title, label, emissionfactor }) => (
        <div key={title}>
          <div className="md:grid md:grid-cols-[3fr,1fr] flex flex-col-reverse">
            <div className="flex flex-1 h-24">
              <Heading2>{title}</Heading2>
            </div>
            <div className="md:text-right mb-8">
              Frage {currentQuestionIndex + 1} von {MAX_QUESTION_NUMBER}
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
          {answer ? <Copy>Your impact is {impact}</Copy> : <Copy>Please answer the question</Copy>}
        </div>
      ))}

      <div className="grid grid-cols-2 md:grid-cols-[2fr,1fr] items-center">
        {currentQuestionIndex <= 0 ? (
          <div></div>
        ) : (
          <div className="grid justify-start">
            <Button variant={ButtonVariant.Text} onClick={() => setQuestion(currentQuestionIndex - 1)}>
              ← Vorherige Frage
            </Button>
          </div>
        )}
        <div className="grid justify-items-end">
          {currentQuestionIndex >= MAX_QUESTION_NUMBER - 1 ? (
            <Button
              variant={ButtonVariant.Text}
              onClick={() => {
                if (isInputValid(answer)) {
                  saveCurrentQuestionIntoLocalStorage;
                }
              }}
            >
              Save
            </Button>
          ) : (
            <Button variant={ButtonVariant.Text} onClick={() => setNextQuestion(currentQuestionIndex + 1)}>
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
    props: { questions, MAX_QUESTION_NUMBER: questions.length },
  };
};

export default Frage;
