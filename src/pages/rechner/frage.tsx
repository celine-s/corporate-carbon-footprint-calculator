import { NextPage } from 'next';
import { Page } from '../../layouts/page';
import { Question } from '../../data/questions';
import React, { useState } from 'react';
import { InputField } from '../../elements/input-field';
import { Copy } from '../../identity/copy';
// eslint-disable-next-line import/no-unresolved
import { Label } from '../../identity/Label';

type Props = {
  xy?: string;
  questions: Question[];
  previousImpact: string;
  initialAnswer: string;
};

const IMPACT_AIRPLANE_HOUR_KG_CO2 = 0.29064;

const Frage: NextPage<Props> = ({ previousImpact = '', initialAnswer = '' }) => {
  const [impact, setImpact] = useState(previousImpact);
  const [answer, setAnswer] = useState(initialAnswer);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(event: any) {
    setImpact((parseInt(event.target.children ? event.target.value : '') * IMPACT_AIRPLANE_HOUR_KG_CO2).toString()),
      setAnswer(event.target.children ? event.target.value : '');
  }

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
        value={answer}
        onChange={handleChange}
      ></InputField>
      <br></br>
      <Copy>Your impact is {impact}</Copy>
    </Page>
  );
};

export default Frage;
