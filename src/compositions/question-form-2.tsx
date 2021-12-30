import { FC, useEffect, useState } from 'react';
import { InputField } from '../elements/input-field';
import { useRouter } from 'next/dist/client/router';

type Props = {
  label?: string;
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

export const Question2: FC<Props> = ({ label, href, callback, answer }) => {
  const router = useRouter();
  const [value, setValue] = useState('50');

  useEffect(() => {
    callback({ fte: value });
  }, [value]);

  return (
    <div>
      <InputField
        type="number"
        label={label}
        name="answer"
        value={answer?.fte}
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
