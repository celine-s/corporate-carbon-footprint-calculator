import { FC } from 'react';

export type LabelProps = {
  htmlFor: string;
};

export const Label: FC<LabelProps> = ({ children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="font-sans font-bold text-base lg:text-lg md:max-w-prose mb-8">
      {children}
    </label>
  );
};
