import { NextPage } from 'next';
import { Page } from '../../layouts/page';
import { Question } from '../../data/questions';
import React, { useEffect, useState } from 'react';
import { InputField } from '../../elements/input-field';
import { Copy } from '../../identity/copy';
import { Label } from '../../identity/label';

type Props = {
  xy?: string;
  questions: Question[];
  previousImpact: string;
  initialAnswer: string;
};

function useLocalStorageState(key: string, defaultValue = '') {
  const [state, setState] = useState(() =>
    typeof window !== 'undefined' ? window.localStorage.getItem(key) || defaultValue : ''
  );
  useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
}

const IMPACT_AIRPLANE_HOUR_KG_CO2 = 0.29064;

const Frage: NextPage<Props> = ({ previousImpact = '', initialAnswer = '' }) => {
  const [answer, setAnswer] = useLocalStorageState('answer', initialAnswer);
  //ich glaub da müssti eigentlich epis anders im local storage denn mache => und de impact ganz am schluss hinzuefüege
  const [impact, setImpact] = useLocalStorageState('impact', previousImpact);

  return (
    <Page>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <Label htmlFor="answer-1">Flugstunden pro Mitarbeiter*In im Jahr</Label>
        </div>
        <span className="text-right justify-items-end mb-16">Frage 1 von 1</span>
      </div>
      <InputField
        type="number"
        name="answer"
        id="number"
        step="1"
        placeholder="0"
        min="0"
        max="100"
        value={answer === null ? '0' : answer}
        onChange={({ target }) => {
          setAnswer(target.value), setImpact((parseInt(target.value) * IMPACT_AIRPLANE_HOUR_KG_CO2).toString());
        }}
      ></InputField>
      <br></br>
      {answer ? <Copy>Your impact is {impact === null ? '0' : impact}</Copy> : <Copy>Please answer the question</Copy>}
    </Page>
  );
};

export default Frage;
