import { FC } from 'react';
import { navigation } from '../data/navigation';
import Link from 'next/link';

export const Footer: FC = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto py-16 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a href={item.href} className="text-sm text-gray-500 hover:text-gray-900">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-12 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <Link key={item.name} href={item.href}>
              <a target={item.newTab ? '_blank' : ''} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center text-s text-gray-400">&copy; 2022 Bachelorarbeit UZH – smartive™.</p>
      </div>
    </footer>
  );
};
