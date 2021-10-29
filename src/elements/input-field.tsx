import React, { FC } from 'react';

type InputFieldProps = {
  placeholder?: string;
  maxLength?: number;
  type?: string;
  min?: string;
  max?: string;
  name?: string;
  value: string;
  step?: string | number | undefined;
  id: string;
  autoComplete?: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: any;
};

export const InputField: FC<InputFieldProps> = ({
  placeholder = 'Schreiben...',
  maxLength,
  type = 'text',
  id,
  min,
  max,
  value,
  step,
  onChange,
  autoComplete = undefined,
}) => {
  return (
    <input
      id={id}
      value={value}
      type={type}
      min={min}
      max={max}
      step={step}
      {...(autoComplete ? autoComplete : undefined)} // not sure how to solve this
      onChange={onChange}
      className="flex-none bg-gray-200 w-full bg-white p-2 rounded-md"
      placeholder={placeholder}
      maxLength={maxLength}
    ></input>
  );
};
