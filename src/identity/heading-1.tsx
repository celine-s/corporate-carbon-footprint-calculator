import React, { FC } from 'react';

export type Heading1Props = {
  as?: keyof JSX.IntrinsicElements;
};

export const Heading1: FC<Heading1Props> = ({ children, as: Tag = 'h1' }) => (
  <Tag className="font-sans font-bold text-lg lg:text-xl md:max-w-prose mb-8">{children}</Tag>
);
