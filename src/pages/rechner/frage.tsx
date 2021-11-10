import { GetStaticProps, NextPage } from 'next';
import { Page } from '../../layouts/page';
import React, { useEffect, useState } from 'react';
import { InputField } from '../../elements/input-field';
import { Copy } from '../../identity/copy';
import { Heading2 } from '../../identity/heading-2';
import { Question } from '../../data/questions';
import Questions from '../../data/questions.json';

type Props = {
  previousImpact: string;
  initialAnswerProp: string;
  questions: Question[];
};

function useLocalStorageState(key: string, defaultValue = ''): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [state, setState] = useState(() =>
    typeof window !== 'undefined' ? window.localStorage.getItem(key) || defaultValue : ''
  );
  useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
}

const IMPACT_AIRPLANE_HOUR_KG_CO2 = 0.29064;

const Frage: NextPage<Props> = ({ previousImpact = '', initialAnswerProp = '', questions }) => {
  const [answer, setAnswer] = useLocalStorageState('answer', initialAnswerProp);
  const [impact, setImpact] = useLocalStorageState('impact', previousImpact);
  const [questionNumber, setQuestionNumber] = useState(0);
  const sortedQuestions = questions.sort((first, second) => first.category.localeCompare(second.category));

  useEffect(() => {
    setImpact((parseInt(answer) * IMPACT_AIRPLANE_HOUR_KG_CO2).toString());
    window.localStorage.setItem('answer', answer);
    window.localStorage.setItem('impact', impact);
  }, [answer]);
  const MAX_QUESTION_NUMBER = questions.length;

  return (
    <Page>
      {sortedQuestions.slice(questionNumber, questionNumber + 1).map(({ title, label }) => (
        <div key={title}>
          <div className="md:grid md:grid-cols-[3fr,1fr] flex flex-col-reverse">
            <div className="flex flex-1">
              <Heading2>{title}</Heading2>
            </div>
            <div className="md:text-right mb-8">
              Frage {questionNumber + 1} von {MAX_QUESTION_NUMBER}
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
            value={answer === null ? '0' : answer}
            onChange={(value) => setAnswer(value)}
          ></InputField>
          <br></br>
          {answer ? <Copy>Your impact is {impact === null ? '0' : impact}</Copy> : <Copy>Please answer the question</Copy>}
        </div>
      ))}

      <div className="grid grid-cols-[2fr,1fr] items-center">
        {questionNumber <= 0 ? (
          <div></div>
        ) : (
          <button onClick={() => setQuestionNumber(questionNumber - 1)} className="grid justify-start">
            <span className="text-gray-600 border-b-2 hover:text-gray-900 hover:border-black">← Vorherige Frage</span>
          </button>
        )}
        <div className="grid justify-items-end">
          {questionNumber >= MAX_QUESTION_NUMBER - 1 ? (
            <div></div>
          ) : (
            <button onClick={() => setQuestionNumber(questionNumber + 1)}>
              <span className="text-gray-600 border-b-2 hover:text-gray-900 hover:border-black">Nächste Frage →</span>
            </button>
          )}
        </div>
      </div>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: { previousImpact: '', initialAnswerProp: '', questions: Object.values(Questions) },
  };
};

export default Frage;
