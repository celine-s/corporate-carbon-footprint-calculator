import { FC, useState } from 'react';
import { Heading1 } from '../identity/heading-1';

export const Error: FC = () => {
  const [error, setError] = useState(false);
  return <div>{error && <Heading1>Something went wrong here.</Heading1>}</div>;
};
