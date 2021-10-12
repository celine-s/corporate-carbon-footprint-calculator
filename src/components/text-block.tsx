import React, { FC, ReactNode } from 'react';

export type TextBlockProps = {
  title: string;
  link?: { label: string; href: string };
  number?: number;
  unit?: string;
  highlightNumber?: boolean;
  children: ReactNode;
};

export const TextBlock: FC<TextBlockProps> = ({ title, children, link, number, unit, highlightNumber = false }) => (
  <div>
    {number && (
      <p className={`text-xl lg:text-xxl font-bold ${highlightNumber ? 'fancy-text' : ''}`}>
        {new Intl.NumberFormat('de-CH').format(number)}
        {unit ? ` ${unit}` : ''}
      </p>
    )}
    <h3>{title}</h3>
    <span className={link ? 'mb-8' : ''}>{children}</span>
    {link && <a href={link.href}>{link.label}</a>}
  </div>
);
