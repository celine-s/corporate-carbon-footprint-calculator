import { FC, useEffect, useState } from 'react';
import { InputField } from '../elements/input-field';
import { useRouter } from 'next/dist/client/router';
import { Copy } from '../identity/copy';

type Props = {
  href: string;
  answer: { [key: string]: string };
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};

const validateInput = (answer: string) => {
  if (parseInt(answer) > 100) {
    return '100 prozent ist das max';
  }
  if (parseInt(answer) < 0) {
    return 'Die Prozentangabe darf nicht negativ sein.';
  }
  return null;
};
export const Question8: FC<Props> = ({
  href,
  callback,
  answer = { car: '25', publicTransport: '25', bicyclet: '25', byFoot: '25' },
}) => {
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (answer === { car: '', publicTransport: '', bicyclet: '', byFoot: '' }) {
      callback({ car: '25', publicTransport: '25', bicyclet: '25', byFoot: '25' });
    } else {
      callback(answer);
    }
  }, []);

  useEffect(() => {
    setTotalAmount(
      (parseInt(answer.car) || 0) +
        (parseInt(answer.publicTransport) || 0) +
        (parseInt(answer.bicyclet) || 0) +
        (parseInt(answer.byFoot) || 0)
    );
  }, [answer]);

  return (
    <div className="w-80">
      <InputField
        type="number"
        label="%Auto"
        name="answer"
        step="5"
        value={answer.car}
        onChange={(value) => {
          callback((prevState) => ({
            ...prevState,
            car: value,
          }));
        }}
        onKeyDown={(key) => key === 'Enter' && router.push(href)}
        validateInput={validateInput}
      />
      <InputField
        type="number"
        label="%ÖV"
        name="answer"
        step="5"
        min="0"
        max="100"
        value={answer?.publicTransport}
        onChange={(value) => {
          callback((prevState) => ({
            ...prevState,
            publicTransport: value,
          }));
        }}
        onKeyDown={(key) => key === 'Enter' && router.push(href)}
        validateInput={validateInput}
      />
      <InputField
        type="number"
        label="%Fahrrad"
        name="answer"
        step="5"
        min="0"
        max="100"
        value={answer?.bicyclet}
        onChange={(value) => {
          callback((prevState) => ({
            ...prevState,
            bicyclet: value,
          }));
        }}
        onKeyDown={(key) => key === 'Enter' && router.push(href)}
        validateInput={validateInput}
      />
      <InputField
        type="number"
        label="%zu Fuss"
        name="answer"
        step="5"
        min="0"
        max="100"
        value={answer?.byFoot}
        onChange={(value) => {
          callback((prevState) => ({
            ...prevState,
            byFoot: value,
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
