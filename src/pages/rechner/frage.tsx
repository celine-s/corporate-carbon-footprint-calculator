import { NextPage } from 'next';
import { Page } from '../../layouts/page';
import React, { useEffect, useState } from 'react';
import { InputField } from '../../elements/input-field';
import { Copy } from '../../identity/copy';
import { Heading2 } from '../../identity/heading-2';

type Props = {
  previousImpact: string;
  initialAnswer: string;
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
const MAX_QUESTION_NUMBER = 20;

const Frage: NextPage<Props> = ({ previousImpact = '', initialAnswer = '' }) => {
  const [answer, setAnswer] = useLocalStorageState('answer', initialAnswer);
  //ich glaub da müssti eigentlich epis anders im local storage denn mache => und de impact ganz am schluss hinzuefüege
  const [impact, setImpact] = useLocalStorageState('impact', previousImpact);

  useEffect(() => {
    setImpact((parseInt(answer) * IMPACT_AIRPLANE_HOUR_KG_CO2).toString());
    window.localStorage.setItem('answer', answer);
    window.localStorage.setItem('impact', impact);
  }, [answer]);

  return (
    <Page>
      <div className="md:grid md:grid-cols-[2fr, 1fr] flex flex-col-reverse">
        <div className="md:col-start-1 md:col-span-2 flex flex-1">
          <Heading2>Flugstunden pro Mitarbeiter*In im Jahr</Heading2>
        </div>
        <div className="md:grid md:text-right mb-8 md:col-span-1 md:col-start-4">
          Frage {1} von {MAX_QUESTION_NUMBER}
        </div>
      </div>
      <InputField
        type="number"
        label="Flugstunden"
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
    </Page>
  );
};

export default Frage;
