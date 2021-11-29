import React, { FC, useEffect, useState } from 'react';
import { HeatingIcon } from '../icons/fire';
import { UsersIcon } from '../icons/usersIcon';
import { Page } from '../layouts/page';
import { Heading2 } from '../identity/heading-2';
import { LightningIcon } from '../icons/lightningIcon';
import { PaperAirplaneIcon } from '../icons/paperAirplaneIcon';
import { LinkElement } from '../elements/link';
import { Question } from '../data/questions';
import { useRouter } from 'next/dist/client/router';
import { SaveAsIcon } from '@heroicons/react/outline';

const categoryNavigation = [
  { name: 'Team', icon: UsersIcon },
  { name: 'Strom', icon: LightningIcon },
  { name: 'Heizung', icon: HeatingIcon },
  { name: 'Transport', icon: PaperAirplaneIcon },
  { name: 'Reisen', icon: PaperAirplaneIcon },
];

type Props = { question?: Question; categoriesWithIndexes?: { [key: string]: string[] } };
type NavigationProps = { className?: string };
type PropsSaveDataElement = { onClick?: () => void };

const styleKategories = 'group flex items-center md:justify-start text-xs px-2 py-2 md:text-sm font-medium rounded-md';

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

export const CategoriesNavigation: FC<Props> = ({ children, question, categoriesWithIndexes }) => {
  const [categoryChangedManually, setCategoryChangedManually] = useState('0');
  const [currentCategory, setCurrentCategorie] = useState(
    categoryNavigation.find((c) => c.name === question?.category) || categoryNavigation[0]
  );
  const router = useRouter();
  useEffect(() => {
    setCurrentCategorie(categoryNavigation.find((c) => c.name === question?.category) || categoryNavigation[0]);
  }, [router]);

  useEffect(() => {
    router.push(`/rechner/${categoryChangedManually || '1'}`);
  }, [categoryChangedManually]);

  const Navigation: FC<NavigationProps> = ({ className }) => {
    const gapAndPadding = 'px-2 md:px-4 gap-4 md:gap-0 mb-8 md:mb-0 -ml-3 md:ml-0 md:mt-5 ';
    return (
      <nav className={`bg-white md:space-y-1 items-center md:items-start ${gapAndPadding} ${className}`}>
        {categoryNavigation.map((item) => (
          <a
            key={item.name}
            onClick={() => {
              setCurrentCategorie(item);
              setCategoryChangedManually(categoriesWithIndexes?.[item.name][0] || '1');
            }}
            className={
              item === currentCategory
                ? `bg-gray-100 text-gray-900 ${styleKategories}`
                : `text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${styleKategories}`
            }
          >
            <item.icon active={item === currentCategory ? true : false} />
            <span
              className={`hidden md:flex ${
                item === currentCategory
                  ? 'text-gray-500'
                  : 'text-gray-400 group-hover:text-gray-500 md:mr-4 flex flex-1 flex-shrink flex-grow'
              }`}
            >
              {item.name}
            </span>
          </a>
        ))}
        <div className="md:hidden">
          <SaveDataElement></SaveDataElement>
        </div>
      </nav>
    );
  };

  return (
    <div>
      <div className="hidden md:flex w-64 flex-col fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex flex-shrink-0 px-4">
              <Heading2>Kategorien</Heading2>
            </div>
            <Navigation className="flex-1"></Navigation>
          </div>
          <SaveDataElement></SaveDataElement>
        </div>
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <Page>
          <Navigation className="md:hidden -mt-4 flex flex-row"></Navigation>
          {children}
        </Page>
      </div>
    </div>
  );
};
