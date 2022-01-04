import { FC, useEffect } from 'react';
import { InputField } from '../elements/input-field';
import { RadioGroup } from '@headlessui/react';
import { classNames } from '../utils/classNames';

type Props = {
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

export const Question4: FC<Props> = ({ answer, callback }) => {
  const answerQuestion4 = answer?.kWh === undefined ? { kWh: '5000', electricityType: 'notEcoElectricity' } : answer;

  useEffect(() => {
    callback(answerQuestion4);
  }, []);
  return (
    <div className="mb-8">
      <InputField
        type="number"
        label="kWh"
        name="answer"
        step="1"
        min="0"
        max="250"
        value={answerQuestion4.kWh}
        onChange={(value) => {
          callback({ ...answerQuestion4, kWh: value });
        }}
        validateInput={validateInput}
      />
      <RadioButton callback={callback} answerQuestion4={answerQuestion4} />
    </div>
  );
};

const electricityOptions = [
  { value: 'ecoElectricity', label: 'Ökostrom' },
  { value: 'notEcoElectricity', label: 'Nöd Öko' },
  { value: 'unavailable', label: 'Weiss nöd' },
];

type PropsRadioButton = {
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  answerQuestion4: { [key: string]: string };
};

export const RadioButton: FC<PropsRadioButton> = ({ answerQuestion4, callback }) => (
  <div>
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-medium text-gray-900">Wie wird euer Strom produziert?</h2>
    </div>

    <RadioGroup
      value={answerQuestion4?.electricityType}
      onChange={(value) => {
        callback({ ...answerQuestion4, electricityType: value });
      }}
      className="mt-2"
    >
      <RadioGroup.Label className="sr-only">Wie wird euer Strom produziert?</RadioGroup.Label>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {electricityOptions.map(({ label, value }) => (
          <RadioGroup.Option
            key={value}
            value={value}
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
            <RadioGroup.Label as="p">{label}</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  </div>
);
