import { FC } from 'react';
import { InputField } from '../elements/input-field';
import { useRouter } from 'next/dist/client/router';

type Props = {
  href: string;
  answer: { [key: string]: string };
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};

const validateInput = (answer: string) => {
  if (parseFloat(answer) > 2500) {
    return 'Bitte gib eine kleinere Zahl ein.';
  } else if (answer.length > 10) {
    return 'Bitte gib maximal 10 Ziffern nach dem Komma ein.';
  } else if (parseInt(answer) < 0) {
    return 'Bitte gib eine positive Zahl ein.';
  }
  return null;
};

export const Question9: FC<Props> = ({ href, answer = { hours: '100' }, callback }) => {
  const router = useRouter();

  return (
    <div>
      <InputField
        type="number"
        label="Flugstunden"
        name="answer"
        step="10"
        value={answer.hours}
        onChange={(value) => {
          callback({ hours: value });
        }}
        onKeyDown={(key) => key === 'Enter' && router.push(href)}
        validateInput={validateInput}
      />
    </div>
  );
};
