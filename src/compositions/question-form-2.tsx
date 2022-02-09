import { FC, useEffect } from 'react';
import { InputField } from '../elements/input-field';

type Props = {
  answer: { [key: string]: string };
  callback: (value: { [key: string]: string }) => void;
};

const validateInput = (answer: string) => {
  if (parseFloat(answer) > 249) {
    return 'Dieser Fussabdruck-Rechner ist für KMUs gedacht (max. 249 Mitarbeitende). Gib eine Zahl unter 250 ein.';
  } else if (answer.length > 10) {
    return 'Bitte gib maximal 10 Ziffern nach dem Komma ein.';
  } else if (parseInt(answer) < 1) {
    return 'Die Anzahl Mitarbeitenden kann nicht kleiner als 1 sein.';
  }
  return null;
};

export const Question2: FC<Props> = ({ callback, answer }) => {
  useEffect(() => {
    answer?.fte ? callback(answer) : callback({ fte: '50' });
  }, []);

  return (
    <div>
      <InputField
        type="number"
        label="Mitarbeitenden"
        name="answer"
        value={answer?.fte}
        onChange={(value) => callback({ fte: value })}
        step="5"
        min="5"
        max="250"
        validateInput={validateInput}
      />
    </div>
  );
};
