import { FC, useEffect } from 'react';
import { InputField } from '../elements/input-field';

type Props = {
  answer: { [key: string]: string };
  callback: (value: { [key: string]: string }) => void;
};
const validateInput = (answer: string) => {
  if (parseFloat(answer) > 10000000000) {
    return 'Das scheint nach einem sehr grossem Büro für weniger als 251 Mitarbeiter. Bitte gib eine kleinere Anzahl ein.';
  } else if (answer.length > 10) {
    return 'Bitte gib maximal 10 Ziffern ein.';
  } else if (parseInt(answer) < 0) {
    return 'Die Quadratmeterzahl kann nicht kleiner als 0 sein.';
  }
  return null;
};

export const Question3: FC<Props> = ({ answer, callback }) => {
  useEffect(() => {
    callback({ squaremeter: '500' });
  }, []);

  return (
    <div>
      <InputField
        type="number"
        label="Quadratmeter"
        name="answer"
        min="0"
        step="10"
        value={answer?.squaremeter}
        onChange={(value) => callback({ squaremeter: value })}
        validateInput={validateInput}
      />
    </div>
  );
};
