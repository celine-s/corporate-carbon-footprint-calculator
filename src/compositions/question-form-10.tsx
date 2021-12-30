import { FC, useEffect } from 'react';
import { InputField } from '../elements/input-field';
import { useRouter } from 'next/dist/client/router';

type Props = {
  href: string;
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

export const Question10: FC<Props> = ({ href, answer = { autokm: '100' }, callback }) => {
  const router = useRouter();

  useEffect(() => {
    callback(answer);
  }, []);

  return (
    <div>
      <InputField
        type="number"
        label="km"
        name="answer"
        step="10"
        value={answer.autokm}
        onChange={(value) => {
          callback({ autokm: value });
        }}
        onKeyDown={(key) => key === 'Enter' && router.push(href)}
        validateInput={validateInput}
      />
    </div>
  );
};
