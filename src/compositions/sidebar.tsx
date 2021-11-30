import React, { FC } from 'react';
import { HeatingIcon } from '../icons/fire';
import { UserProps, UsersIcon } from '../icons/usersIcon';
import { Page } from '../layouts/page';
import { Heading2 } from '../identity/heading-2';
import { LightningIcon } from '../icons/lightningIcon';
import { PaperAirplaneIcon } from '../icons/paperAirplaneIcon';
import { LinkElement } from '../elements/link';
import { Question } from '../data/questions';
import { SaveAsIcon } from '@heroicons/react/outline';
import Link from 'next/link';

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
      <div className="hidden md:flex w-64 md:flex-col fixed md:inset-y-0">
        <div className="flex-1 flex flex-col border-r border-gray-200 bg-white">
          <div className="flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="px-4">
              <Heading2>Kategorien</Heading2>
            </div>
            <Navigation currentCategory={currentCategory} categoriesWithIndexes={categoriesWithIndexes} />
          </div>
          <SaveDataElement />
        </div>
      </div>
      <div className="md:pl-64">
        <Page>
          <div className="md:hidden">
            <Navigation currentCategory={currentCategory} categoriesWithIndexes={categoriesWithIndexes} />
          </div>
          {children}
        </Page>
      </div>
    </div>
  );
};

type NavigationProps = {
  categoriesWithIndexes?: { [key: string]: string[] };
  currentCategory: { name: string; icon: React.FC<UserProps> };
};
const Navigation: FC<NavigationProps> = ({ categoriesWithIndexes, currentCategory }) => {
  const gapAndPadding = 'px-2 md:px-4 gap-4 md:gap-0 mb-8 md:mb-0 -ml-3 md:ml-0 md:mt-5 ';
  const styleKategories = 'group flex justify-center md:justify-start text-xs p-2 md:text-sm font-medium rounded-md w-full';

  return (
    <nav
      className={`flex flex-row md:flex-col md:flex-1 bg-white md:space-y-1 items-center md:items-start ${gapAndPadding}`}
    >
      {categoryNavigation.map((item) => (
        <Link href={`/rechner/${categoriesWithIndexes?.[item.name][0] || '1'}`} key={item.name}>
          <a
            className={
              item === currentCategory
                ? `bg-gray-100 text-gray-900  ${styleKategories}`
                : `text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${styleKategories}`
            }
          >
            <item.icon active={item === currentCategory ? true : false} />
            <span
              className={`hidden md:inline md:mr-4 ${
                item === currentCategory ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
              }`}
            >
              {item.name}
            </span>
          </a>
        </Link>
      ))}
      <div className="md:hidden">
        <SaveDataElement />
      </div>
    </nav>
  );
};

type PropsSaveDataElement = { onClick?: () => void };

const SaveDataElement: FC<PropsSaveDataElement> = ({ onClick }) => {
  return (
    <div className="group flex-shrink-0 flex md:border-t md:border-gray-200 md:p-4 md:w-full md:group md:block ">
      <LinkElement href="/rechner/saved" onClick={onClick}>
        <SaveAsIcon className="md:hidden h-6 w-6 justify-center items-center m-2"></SaveAsIcon>
        <div className="hidden md:contents">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex justify-start">Take a break?</p>
          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-900 flex justify-start">
            Save your answers here
          </p>
        </div>
      </LinkElement>
    </div>
  );
};
