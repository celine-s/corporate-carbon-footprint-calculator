import React, { FC } from 'react';

type Props = {
  as?: keyof JSX.IntrinsicElements;
};

export const Heading1: FC<Props> = ({ children, as: Tag = 'h1' }) => (
  <Tag className="font-sans font-bold text-lg lg:text-xxl md:max-w-prose mb-8">{children}</Tag>
);
