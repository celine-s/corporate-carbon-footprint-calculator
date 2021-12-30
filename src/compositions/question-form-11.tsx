import { FC, useEffect } from 'react';
import { InputField } from '../elements/input-field';

type Props = {
  answer: { [key: string]: string };
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};

const validateInput = (answer: string) => {
  if (parseFloat(answer) > 10000) {
    return 'Bist du sicher? das sind sehr viele km.';
  } else if (answer.length > 10) {
    return 'Bitte gib maximal 10 Ziffern nach dem Komma ein.';
  }
  return null;
};

export const Question11: FC<Props> = ({ answer = { km: '100' }, callback }) => {
  useEffect(() => {
    callback({ km: '100' });
  }, []);

  return (
    <div>
      <InputField
        type="number"
        label="km"
        name="answer"
        step="10"
        value={answer.km}
        onChange={(value) => {
          callback({ km: value });
        }}
        validateInput={validateInput}
      />
    </div>
  );
};
