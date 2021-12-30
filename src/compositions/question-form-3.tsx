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
    return 'Bist dir sicher? Über 10000 m2 ist bisschen viel für ein Dienstleistungsunternehmen mit weniger als 251 Mitarbeiter.';
  } else if (answer.length > 10) {
    return 'Bitte gib maximal 10 Ziffern ein.';
  }
  return null;
};

export const Question3: FC<Props> = ({ href, answer, callback }) => {
  const router = useRouter();

  useEffect(() => {
    callback({ squaremeter: '500' });
  }, []);

  return (
    <div>
      <InputField
        type="number"
        label="m2"
        name="answer"
        step="10"
        value={answer?.squaremeter}
        onChange={(value) => callback({ squaremeter: value })}
        onKeyDown={(key) => key === 'Enter' && router.push(href)}
        validateInput={validateInput}
      />
    </div>
  );
};
