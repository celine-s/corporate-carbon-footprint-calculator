import React, { FC } from 'react';

type Props = {
  as?: keyof JSX.IntrinsicElements;
};

export const Heading2: FC<Props> = ({ children, as: Tag = 'h2' }) => (
  <Tag className="font-sans font-bold text-base lg:text-lg md:max-w-prose mb-8">{children}</Tag>
);
