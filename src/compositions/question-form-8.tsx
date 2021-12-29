import { FC, useEffect, useState } from 'react';
import { InputField } from '../elements/input-field';
import { useRouter } from 'next/dist/client/router';
import { Copy } from '../identity/copy';

type Props = {
  label?: string;
  href: string;
  answer: { [key: string]: string };
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};

const validateInput = (answer: string) => {
  if (parseFloat(answer) > 100) {
    return '100 prozent ist das max';
  }
  if (parseFloat(answer) < 0) {
    return 'Die Prozentangabe darf nicht negativ sein.';
  }
  return null;
};
export const Question8: FC<Props> = ({ label, href, callback, answer }) => {
  const initialAnswer = '25%';
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (answer === { Auto: '', ÖV: '', Fahrrad: '', Fuss: '' }) {
      callback({ Auto: '25', ÖV: '25', Fahrrad: '25', Fuss: '25' });
    } else {
      callback(answer);
    }
    setTotalAmount(
      (parseFloat(answer.Auto) || 0) +
        (parseFloat(answer.ÖV) || 0) +
        (parseFloat(answer.Fahrrad) || 0) +
        (parseFloat(answer.Fuss) || 0)
    );
  }, [answer]);

  return (
    <div className="w-80">
      <InputField
        type="number"
        label={`%${label?.[0]}`}
        name="answer"
        id="number"
        step="5"
        placeholder={initialAnswer}
        value={answer?.Auto}
        onChange={(value) => {
          callback((prevState) => ({
            ...prevState,
            ['Auto']: value,
          }));
        }}
        onKeyDown={(key) => key === 'Enter' && router.push(href)}
        validateInput={validateInput}
      />
      <InputField
        type="number"
        label={`%${label?.[1]}`}
        name="answer"
        id="number"
        step="5"
        placeholder={initialAnswer}
        min="0"
        max="100"
        value={answer?.ÖV}
        onChange={(value) => {
          callback((prevState) => ({
            ...prevState,
            ['ÖV']: value,
          }));
        }}
        onKeyDown={(key) => key === 'Enter' && router.push(href)}
        validateInput={validateInput}
      />
      <InputField
        type="number"
        label={`%${label?.[2]}`}
        name="answer"
        id="number"
        step="5"
        placeholder={initialAnswer}
        min="0"
        max="100"
        value={answer?.Fahrrad}
        onChange={(value) => {
          callback((prevState) => ({
            ...prevState,
            ['Fahrrad']: value,
          }));
        }}
        onKeyDown={(key) => key === 'Enter' && router.push(href)}
        validateInput={validateInput}
      />
      <InputField
        type="number"
        label={`%${label?.[3]}`}
        name="answer"
        id="number"
        step="5"
        placeholder={initialAnswer}
        min="0"
        max="100"
        value={answer?.Fuss}
        onChange={(value) => {
          callback((prevState) => ({
            ...prevState,
            ['Fuss']: value,
          }));
        }}
        onKeyDown={(key) => key === 'Enter' && router.push(href)}
        validateInput={validateInput}
      />
      {totalAmount > 100 ? (
        <div className="mt-2 text-sm text-red-600" id="input-error">
          <Copy>Die Summe aller darf nicht grösser als 100% sein.</Copy>
        </div>
      ) : (
        <Copy>Bis jetzt hast du {totalAmount} von 100%</Copy>
      )}
    </div>
  );
};
