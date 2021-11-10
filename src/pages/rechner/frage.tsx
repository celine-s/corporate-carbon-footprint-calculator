import { GetStaticProps, NextPage } from 'next';
import { Page } from '../../layouts/page';
import React, { useEffect, useState } from 'react';
import { InputField } from '../../elements/input-field';
import { Copy } from '../../identity/copy';
import { Heading2 } from '../../identity/heading-2';
import { Question } from '../../data/questions';
import Questions from '../../data/questions.json';
import { Button, ButtonVariants } from '../../elements/button';

type Props = {
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
const initialAnswerProp = '0';
const initialImpact = '0';

const Frage: NextPage<Props> = ({ questions }) => {
  const [answer, setAnswer] = useLocalStorageState('answer', initialAnswerProp);
  const [impact, setImpact] = useState(initialImpact);
  const [questionIndex, setQuestionIndex] = useState(0);
  const sortedQuestions = questions.sort((first, second) => first.category.localeCompare(second.category));

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
  useEffect(() => {
    window.localStorage.setItem('answer', answer);
    window.localStorage.setItem('impact', impact);
  }, [answer, impact]);
  const MAX_QUESTION_NUMBER = questions.length;

  const saveImpactAndAnswer = () => {
    setQuestionIndex(questionIndex + 1),
      setLocalStorage(questionIndex.toString(), answer),
      setLocalStorage('impact' + questionIndex.toString(), impact.toString()),
      getLocalStorage((questionIndex + 1).toString()) !== undefined
        ? setAnswer(getLocalStorage((questionIndex + 1).toString()) || initialAnswerProp)
        : '',
      getLocalStorage(('impact' + questionIndex + 1).toString()) !== undefined
        ? setImpact(getLocalStorage('impact' + (questionIndex + 1).toString()) || initialImpact)
        : '';
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
    </Page>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: { questions: Object.values(Questions) },
  };
};

export default Frage;
