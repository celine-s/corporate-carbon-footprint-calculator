import React, { FC } from 'react';

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
  onChange: (value: string) => void;
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
  autoComplete = undefined,
}) => (
  <div className="grid grid-cols-[2fr,1fr] md:grid-cols-3 gap-2 my-4 lg:text-base">
    <input
      id={id}
      value={value}
      type={type}
      min={min}
      max={max}
      step={step}
      autoComplete={autoComplete}
      onChange={(event) => onChange(event.target.value)}
      className="bg-gray-200 w-full bg-white p-2 rounded-md"
      placeholder={placeholder}
      maxLength={maxLength}
    ></input>
    <label htmlFor={id} className="self-center">
      {label}
    </label>
  </div>
);
