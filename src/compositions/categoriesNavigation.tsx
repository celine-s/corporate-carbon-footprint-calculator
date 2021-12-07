import React, { FC } from 'react';
import { HeatingIcon } from '../icons/fire';
import { UserProps, UsersIcon } from '../icons/usersIcon';
import { Page } from '../layouts/page';
import { LightningIcon } from '../icons/lightningIcon';
import { PaperAirplaneIcon } from '../icons/paperAirplaneIcon';
import Link from 'next/link';
import { Question } from '../data/question';

const categoryNavigation = [
  { name: 'Team', icon: UsersIcon },
  { name: 'Strom', icon: LightningIcon },
  { name: 'Heizung', icon: HeatingIcon },
  { name: 'Transport', icon: PaperAirplaneIcon },
  { name: 'Reisen', icon: PaperAirplaneIcon },
];

type Props = { question?: Question; categoriesWithIndexes?: { [key: string]: string[] } };

export const CategoriesNavigation: FC<Props> = ({ children, question, categoriesWithIndexes }) => {
  const currentCategory = categoryNavigation.find((c) => c.name === question?.category) || categoryNavigation[0];

  return (
    <div>
      <Page>
        <div className="flex flex-row">
          <Navigation currentCategory={currentCategory} categoriesWithIndexes={categoriesWithIndexes} />
        </div>
        {children}
      </Page>
    </div>
  );
};

type NavigationProps = {
  categoriesWithIndexes?: { [key: string]: string[] };
  currentCategory: { name: string; icon: React.FC<UserProps> };
};
const Navigation: FC<NavigationProps> = ({ categoriesWithIndexes, currentCategory }) => {
  const gapAndPadding = 'gap-1';
  const styleKategories = 'group flex justify-center md:justify-start text-xs py-2 px-4 md:text-sm font-medium w-full';

  return (
    <nav className={`flex flex-row bg-white items-center md:items-start w-full ${gapAndPadding}`}>
      {categoryNavigation.map((item) => (
        <Link href={`/rechner/${categoriesWithIndexes?.[item.name]?.[0] || '1'}`} key={item.name}>
          <a
            className={
              item === currentCategory
                ? `text-cornflower-500 text-bold border-t-4 border-cornflower-500 ${styleKategories}`
                : `text-gray-600 bg-gray-200 hover:bg-white-50 hover:text-cornflower-500 rounded-t-lg ${styleKategories}`
            }
          >
            <item.icon active={item === currentCategory ? true : false} />
            <span
              className={`hidden md:inline md:mr-4 ml-1 ${
                item === currentCategory ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
              }`}
            >
              {item.name}
            </span>
          </a>
        </Link>
      ))}
    </nav>
  );
};
