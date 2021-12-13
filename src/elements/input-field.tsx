import React, { FC, useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

export type InputFieldProps = {
  placeholder?: string;
  maxLength?: number;
  type?: string;
  min?: string;
  max?: string;
  name?: string;
  value: string;
  step?: string | number;
  id: string;
  label?: string;
  autoComplete?: string;
  onKeyDown?: (key: string) => void;
  onChange: (value: string) => void;
};
const errorStyle = 'block border border-red-300 text-red-900 focus:outline-none focus:ring-red-500 focus:border-red-500';
const inputStyle = 'bg-gray-200';

const validateInput = (answer: string) => {
  if (parseFloat(answer) > 9999) {
    return 'Bitte gib eine kleinere Zahl ein.';
  } else if (answer.length > 10) {
    return 'Bitte gib maximal 10 Ziffern ein.';
  }
  return null;
};

export const InputField: FC<InputFieldProps> = ({
  placeholder = 'Schreiben...',
  maxLength,
  type = 'text',
  id,
  min,
  max,
  value,
  label,
  step,
  onChange,
  onKeyDown,
  autoComplete = undefined,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  return (
    <div>
      <div className="grid grid-cols-[2fr,1fr] md:grid-cols-3 gap-2 my-4 lg:text-base">
        <div className="relative">
          <input
            id={id}
            value={value}
            type={type}
            min={min}
            max={max}
            step={step}
            autoComplete={autoComplete}
            onChange={(event) => {
              const error = validateInput(event.target.value);
              if (error === null) {
                onChange(event.target.value);
              }
              setErrorMessage(error);
            }}
            className={`rounded-md w-full p-2 ${errorMessage === null ? inputStyle : errorStyle}`}
            placeholder={placeholder}
            maxLength={maxLength}
            onKeyDown={onKeyDown ? (event) => onKeyDown(event.key) : undefined}
          />
          {errorMessage ? (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none mr-3">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            </span>
          ) : null}
        </div>
        <label htmlFor={id} className="self-center">
          {label}
        </label>
      </div>
      {errorMessage ? (
        <>
          <p className="mt-2 text-sm text-red-600" id="input-error">
            {errorMessage}
          </p>
        </>
      ) : null}
    </div>
  );
};
