/* eslint-disable @next/next/no-img-element */
import React, { FC, Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HeatingIcon } from '../icons/fire';
import { UsersIcon } from '../icons/usersIcon';
import { Page } from './page';
import { Heading2 } from '../identity/heading-2';
import { MenuIcon } from '@heroicons/react/solid';
import { LightningIcon } from '../icons/lightningIcon';
import { PaperAirplaneIcon } from '../icons/paperAirplaneIcon';
import { LinkElement } from '../elements/link';
import { Question } from '../data/questions';
import { useRouter } from 'next/dist/client/router';

const categoryNavigation = [
  { name: 'Team', icon: UsersIcon },
  { name: 'Strom', icon: LightningIcon },
  { name: 'Heizung', icon: HeatingIcon },
  { name: 'Transport', icon: PaperAirplaneIcon },
  { name: 'Reisen', icon: PaperAirplaneIcon },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = { question?: Question; categoriesWithIndexes?: any };
type PropsSaveDataElement = { onClick?: () => void };

const styleKategories = 'group flex items-center px-2 py-2 text-base md:text-sm font-medium rounded-md';

const SaveDataElement: FC<PropsSaveDataElement> = ({ onClick }) => {
  return (
    <div className="flex-shrink-0 flex border-t border-gray-200 p-4 md:w-full md:group md:block md:ml-3">
      <LinkElement href="/rechner/saved" onClick={onClick}>
        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex justify-start">Take a break?</p>
        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-900 flex justify-start">
          Save your answers here
        </p>
      </LinkElement>
    </div>
  );
};

export const Sidebar: FC<Props> = ({ children, question, categoriesWithIndexes }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoryChangedManually, setCategoryChangedManually] = useState();
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

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <span className="h-6 w-6 text-white" aria-hidden="true">
                      x
                    </span>
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4 mt-4">
                  <Heading2>Kategorien</Heading2>
                </div>
                <nav className="px-2 space-y-1">
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
                      <item.icon active={true} />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <SaveDataElement onClick={() => setSidebarOpen(false)}></SaveDataElement>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Heading2>Kategorien</Heading2>
            </div>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
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
                    className={`${
                      item === currentCategory
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500 mr-4 flex-shrink-0 h-6 w-6'
                    }`}
                  >
                    {item.name}
                  </span>
                </a>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block ml-3 ">
              <SaveDataElement></SaveDataElement>
            </div>
          </div>
        </div>
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Page>{children}</Page>
      </div>
    </div>
  );
};
