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
  if (parseFloat(answer) > 10000) {
    return 'Bist dir sicher? Über 10000 m2 ist bisschen viel für ein Dienstleistungsunternehmen mit weniger als 251 Mitarbeiter.';
  } else if (answer.length > 10) {
    return 'Bitte gib maximal 10 Ziffern nach dem Komma ein.';
  }
  return null;
};

export const Question3: FC<Props> = ({ label, href, answer, callback }) => {
  const router = useRouter();
  const [value, setValue] = useState('');

  useEffect(() => {
    callback({ squaremeter: value });
  }, [value]);

  return (
    <div>
      <InputField
        type="number"
        label={label}
        name="answer"
        id="number"
        step="10"
        placeholder="500" // initialAnswer vode Frage?
        value={answer?.squaremeter}
        onChange={setValue}
        onKeyDown={(key) => key === 'Enter' && router.push(href)}
        validateInput={validateInput}
      />
    </div>
  );
};
