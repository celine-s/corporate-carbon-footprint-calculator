import { FC } from 'react';
import Link from 'next/link';

export type LinkProps = {
  newTab?: boolean;
  href: string;
};
export const LinkElement: FC<LinkProps> = ({ newTab, children, href }) => {
  return (
    <Link href={href}>
      <a target={newTab ? '_blank' : ''} className="inline-block">
        {children}
      </a>
    </Link>
  );
};
