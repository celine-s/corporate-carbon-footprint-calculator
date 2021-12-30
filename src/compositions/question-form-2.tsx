import { FC, useEffect } from 'react';
import { InputField } from '../elements/input-field';

type Props = {
  answer: { [key: string]: string };
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};

const validateInput = (answer: string) => {
  if (parseFloat(answer) > 250) {
    return 'Dieser Fussabdruck schätzer ist für KMUs (max 250 VZÄ) gedacht.';
  } else if (answer.length > 10) {
    return 'Bitte gib maximal 10 Ziffern nach dem Komma ein.';
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
        label="VZÄ"
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
