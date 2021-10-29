import { NextPage } from 'next';
import { Page } from '../../layouts/page';
import React, { useEffect, useState } from 'react';
import { InputField } from '../../elements/input-field';
import { Copy } from '../../identity/copy';
import { Label } from '../../identity/label';

type Props = {
  previousImpact: string;
  initialAnswer: string;
};

const IMPACT_AIRPLANE_HOUR_KG_CO2 = 0.29064;

const Frage: NextPage<Props> = ({ previousImpact = '', initialAnswer = '' }) => {
  const [answer, setAnswer] = useState(
    typeof window !== 'undefined' ? window.localStorage.getItem('answer') || initialAnswer : ''
  );
  //ich glaub da müssti eigentlich epis anders im local storage denn mache => und de impact ganz am schluss hinzuefüege
  const [impact, setImpact] = useState(
    typeof window !== 'undefined' ? window.localStorage.getItem('impact') || previousImpact : ''
  );

  useEffect(() => {
    setImpact((parseInt(answer) * IMPACT_AIRPLANE_HOUR_KG_CO2).toString());
    window.localStorage.setItem('answer', answer);
    window.localStorage.setItem('impact', impact);
  }, [answer]);

  return (
    <Page>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <Label htmlFor="answer-1">Flugstunden pro Mitarbeiter*In im Jahr</Label>
        </div>
        <span className="text-right justify-items-end mb-16">Frage 1 von 1</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <InputField
          type="number"
          name="answer"
          id="number"
          step="1"
          placeholder="0"
          min="0"
          max="100"
          value={answer === null ? '0' : answer}
          onChange={(event: { target: { value: React.SetStateAction<string> } }) => {
            setAnswer(event.target.value);
          }}
        ></InputField>
        <Copy> Flugstunden</Copy>
      </div>
      <br></br>
      {answer ? <Copy>Your impact is {impact === null ? '0' : impact}</Copy> : <Copy>Please answer the question</Copy>}
    </Page>
  );
};

export default Frage;
