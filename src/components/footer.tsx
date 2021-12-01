import { FC } from 'react';
import { footerNavigation } from '../data/navigation';
import { LinkElement } from '../elements/link';

export const Footer: FC = () => {
  return (
    <footer className="py-8">
      <nav className="flex flex-col md:flex-row justify-center items-center" aria-label="Footer">
        {footerNavigation.main.map((item) => (
          <div key={item.name} className="p-2">
            <LinkElement href={item.href} newTab={item.newTab}>
              {item.name}
            </LinkElement>
          </div>
        ))}
      </nav>
      <div className="mt-12 flex justify-center space-x-6 text-gray-400">
        {footerNavigation.social.map((item) => (
          <LinkElement key={item.name} href={item.href} newTab={item.newTab}>
            <span className="sr-only">{item.name}</span>
            <item.icon className="h-6 w-6 " aria-hidden="true" />
          </LinkElement>
        ))}
      </div>
      <p className="mt-8 text-center text-xxs md:text-s text-gray-400">&copy; 2022 Bachelorarbeit UZH – smartive™.</p>
    </footer>
  );
};
