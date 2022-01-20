import { FC, useEffect } from 'react';
import { InputField } from '../elements/input-field';

type Props = {
  answer: { [key: string]: string };
  callback: (value: { [key: string]: string }) => void;
};

const validateInput = (answer: string) => {
  if (parseFloat(answer) > 1000000) {
    return 'Bitte gib eine kleinere Zahl ein.';
  } else if (answer.length > 10) {
    return 'Bitte gib maximal 10 Ziffern nach dem Komma ein.';
  } else if (parseInt(answer) < 0) {
    return 'Bitte gib eine positive Zahl ein.';
  }
  return null;
};

export const Question9: FC<Props> = ({ answer = { hours: '100' }, callback }) => {
  useEffect(() => {
    callback({ hours: '100' });
  }, []);

  return (
    <InputField
      type="number"
      label="Flugstunden"
      name="answer"
      step="1"
      value={answer.hours}
      onChange={(value) => callback({ hours: value })}
      validateInput={validateInput}
    />
  );
};
