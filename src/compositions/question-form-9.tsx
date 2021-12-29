import { FC } from 'react';
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
  if (parseFloat(answer) > 2500) {
    return 'Bitte gib eine kleinere Zahl ein.';
  } else if (answer.length > 10) {
    return 'Bitte gib maximal 10 Ziffern nach dem Komma ein.';
  } else if (parseInt(answer) < 0) {
    return 'Bitte gib eine positive Zahl ein.';
  }
  return null;
};

export const Question9: FC<Props> = ({ label, initialAnswer, href, answer, callback }) => {
  const router = useRouter();

  return (
    <div>
      <InputField
        type="number"
        label={label || 'Flugstunden'}
        name="answer"
        id="number"
        step="10"
        placeholder={initialAnswer || '100'}
        value={answer?.Flugstunden}
        onChange={(value) => {
          callback({ Flugstunden: value });
        }}
        onKeyDown={(key) => key === 'Enter' && router.push(href)}
        validateInput={validateInput}
      />
    </div>
  );
};
