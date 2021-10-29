import React, { FC } from 'react';

type Props = {
  as?: keyof JSX.IntrinsicElements;
};

export const Copy: FC<Props> = ({ children, as: Tag = 'p' }) => (
  <Tag className="font-sans font-normal text-xs lg:text-base self-center my-4 lg:my-8">{children}</Tag>
);
