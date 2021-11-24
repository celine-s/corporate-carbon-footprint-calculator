import { FC } from 'react';
import Link from 'next/link';

export type LinkProps = {
  newTab?: boolean;
  href: string;
  border?: boolean;
  onClick?: () => void;
};

export const LinkElement: FC<LinkProps> = ({ newTab = false, children, href, border = false, onClick }) => {
  const borderStyle = border ? 'border-b-2 hover:border-black' : '';
  return (
    <Link href={href}>
      <a
        target={newTab ? '_blank' : ''}
        onClick={onClick}
        className={`inline-block text-center text-xs md:text-sm text-gray-500 hover:text-gray-900 ${borderStyle}`}
      >
        {children}
      </a>
    </Link>
  );
};
