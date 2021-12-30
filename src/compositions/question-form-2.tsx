import { FC, useEffect } from 'react';
import { InputField } from '../elements/input-field';
import { useRouter } from 'next/dist/client/router';

type Props = {
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

export const Question2: FC<Props> = ({ href, callback, answer }) => {
  const router = useRouter();

  useEffect(() => {
    callback({ fte: '50' });
  }, []);

  return (
    <div>
      <InputField
        type="number"
        label="VZÄ"
        name="answer"
        value={answer?.fte}
        onChange={(value) => callback({ fte: value })}
        onKeyDown={(key) => key === 'Enter' && router.push(href)}
        step="5"
        min="5"
        max="250"
        validateInput={validateInput}
      />
    </div>
  );
};
