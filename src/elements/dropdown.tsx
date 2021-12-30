import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import React, { FC, useEffect } from 'react';
import { classNames } from '../utils/classNames';

type Props = {
  selection: string[];
  selected: { [key: string]: string };
  optionKey: string;
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};
export const DropDown: FC<Props> = ({ selection, selected, callback, optionKey }) => {
  useEffect(() => {
    callback(selected);
  }, []);

  return (
    <Menu as="div" className="relative inline-block text-left mb-8">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-cornflower-500">
          {selected?.[optionKey]}
          <ChevronDownIcon className="-mr-1 ml-2 mt-1 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Menu.Items className="absolute origin-top-right right-0 mt-2 rounded-md shadow-lg bg-white-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {selection.map((option) => (
            <Menu.Item key={option}>
              {({ active }) => (
                <button
                  onClick={() => callback({ [optionKey]: option })}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'pr-10 pl-4 py-2 text-sm border-b w-full flex justify-start'
                  )}
                >
                  {option}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};
