import { FC, useState } from 'react';
import { InputField } from '../elements/input-field';
import { useRouter } from 'next/dist/client/router';
import { RadioGroup } from '@headlessui/react';

type Props = {
  label: string;
  initialAnswer?: string;
  href: string;
  answer: { [key: string]: string };
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};
const validateInput = (answer: string) => {
  if (parseFloat(answer) > 10000) {
    return 'Bist dir sicher? Über 10000 m2 für weniger als 251 Mitarbeiter scheint mir nach zu viel Büro.';
  } else if (answer.length > 10) {
    return 'Bitte gib maximal 10 Ziffern nach dem Komma ein.';
  }
  return null;
};

export const Question4: FC<Props> = ({ label, href, answer, callback }) => {
  const router = useRouter();
  const answerQuestion4 = answer?.kWh === undefined ? { kWh: '', electricityType: '' } : answer;

  return (
    <div className="mb-8">
      <InputField
        type="number"
        label={label}
        name="answer"
        id="number"
        step="1"
        placeholder="5000"
        min="0"
        max="250"
        value={answerQuestion4?.kWh || ''}
        onChange={(value) => {
          callback({ ...answerQuestion4, kWh: value });
        }}
        onKeyDown={(key) => key === 'Enter' && router.push(href)}
        validateInput={validateInput}
      />
      <RadioButton callback={callback} answerQuestion4={answerQuestion4} />
    </div>
  );
};

const electricityOptions = ['Ökostrom', 'Nöd Öko', 'Weiss nöd'];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
type PropsRadioButton = {
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  answerQuestion4: { [key: string]: string };
};

export const RadioButton: FC<PropsRadioButton> = ({ answerQuestion4, callback }) => {
  const [electricityType, setElectricityType] = useState(answerQuestion4?.electricityType);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Wie wird euer Strom produziert?</h2>
      </div>

      <RadioGroup
        value={electricityType || answerQuestion4?.electricityType}
        onChange={(value) => {
          setElectricityType(value);
          callback({ ...answerQuestion4, electricityType: value });
        }}
        className="mt-2"
      >
        <RadioGroup.Label className="sr-only">Wie wird euer Strom produziert?</RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {electricityOptions.map((option) => (
            <RadioGroup.Option
              key={option}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  'cursor-pointer focus:outline-none',
                  active ? 'ring-2 ring-offset-2 ring-cornflower-500' : '',
                  checked
                    ? 'bg-cornflower-500 border-transparent text-white-100 hover:bg-cornflower-800'
                    : 'bg-white-100 border-gray-200 text-gray-900 hover:bg-gray-50',
                  'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium sm:flex-1'
                )
              }
            >
              <RadioGroup.Label as="p">{option}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
