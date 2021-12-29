import { FC, useEffect, useState } from 'react';
import { InputField } from '../elements/input-field';
import { useRouter } from 'next/dist/client/router';

type Props = {
  label?: string;
  initialAnswer?: string;
  href: string;
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

export const Question2: FC<Props> = ({ label, initialAnswer, href, callback, answer }) => {
  const router = useRouter();
  const [value, setValue] = useState('');

  useEffect(() => {
    callback({ FTE: value });
  }, [value]);

  return (
    <div>
      <InputField
        type="number"
        label={label}
        name="answer"
        id="number"
        placeholder={initialAnswer}
        value={answer?.FTE}
        onChange={(value) => {
          setValue(value);
        }}
        onKeyDown={(key) => key === 'Enter' && router.push(href)}
        step="5"
        min="5"
        max="250"
        validateInput={validateInput}
      />
    </div>
  );
};
