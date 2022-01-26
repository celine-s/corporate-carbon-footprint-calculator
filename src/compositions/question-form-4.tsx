import { FC, useEffect } from 'react';
import { InputField } from '../elements/input-field';
import { Copy } from '../identity/copy';
import { getLocalStorage } from '../utils/local-storage';

type Props = {
  answer: { [key: string]: string };
  callback: (value: { [key: string]: string }) => void;
};
const validateInput = (answer: string) => {
  if (parseFloat(answer) > 1000000) {
    return 'Bist du am Übertreiben? Bitte gib eine kleinere Zahl ein.';
  } else if (answer.length > 100) {
    return 'Bist du am Übertreiben? Bitte gib eine kleinere Zahl ein.';
  } else if (parseInt(answer) < 0) {
    return 'Die Kilowattstunden können nicht kleiner als 0 sein.';
  }
  return null;
};
const AVG_KWH_PER_SQM = 55;
export const Question4: FC<Props> = ({ answer, callback }) => {
  const answerQuestion4 =
    answer?.kWh === undefined && answer?.electricityType === undefined
      ? { kWh: '20000', electricityType: 'notEcoElectricity' }
      : answer;

  useEffect(() => {
    callback(answerQuestion4);
  }, []);
  const squaremeter = getLocalStorage('3');

  return (
    <div className="mb-8 grid md:grid-cols-[45%,55%] grid-row gap-4">
      <div className="">
        <InputField
          type="number"
          label="kWh"
          name="answer"
          step="100"
          min="0"
          max="100000"
          value={answerQuestion4.kWh}
          onChange={(value) => {
            callback({ ...answerQuestion4, kWh: value });
          }}
          validateInput={validateInput}
        />
        {squaremeter && (
          <Copy>
            Der Schätzwert für euer Büro liegt bei ca.
            {` ${squaremeter.squaremeter * AVG_KWH_PER_SQM} kWh.`}
          </Copy>
        )}
      </div>
      <RadioButton callback={callback} answerQuestion4={answerQuestion4} />
    </div>
  );
};

export const electricityOptions = [
  { value: 'ecoElectricity', label: 'Erneuerbar' },
  { value: 'notEcoElectricity', label: 'Nicht erneuerbar' },
  { value: 'unavailable', label: 'Unbekannt' },
];

type PropsRadioButton = {
  callback: (value: { [key: string]: string }) => void;
  answerQuestion4: { [key: string]: string };
};

const RadioButton: FC<PropsRadioButton> = ({ answerQuestion4, callback }) => (
  <div className="md:pl-8 md:border-l-2">
    <div className="flex items-center justify-between -mb-8 -mt-8">
      <Copy>Wie wird euer Strom produziert?</Copy>
    </div>
    <div>
      <fieldset className="mt-4">
        <div className="xl:flex xl:items-center xl:space-x-4 grid">
          {electricityOptions.map(({ label, value }) => (
            <div key={value} className="flex items-center h-12">
              <input
                id={value}
                name="electricity-type"
                type="radio"
                onChange={() => {
                  callback({ ...answerQuestion4, electricityType: value });
                }}
                checked={value === answerQuestion4.electricityType}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label htmlFor={value} className="ml-3">
                <Copy>{label}</Copy>
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  </div>
);
