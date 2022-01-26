import { Transition, Dialog } from '@headlessui/react';
import { CheckIcon, ExclamationIcon } from '@heroicons/react/solid';
import React, { FC, Fragment, ReactNode, useRef } from 'react';
import { Button } from './button';

export enum ModalVariant {
  Warning = 'Warning',
  Success = 'Success',
  Custom = 'Custom',
}
type Props = {
  title?: string;
  onClose: (open: boolean) => void;
  open: boolean;
  icon?: ReactNode;
  variant: ModalVariant;
  showCancelButton?: boolean;
};

export const Modal: FC<Props> = ({ children, title, onClose, open, icon: customIcon, variant, showCancelButton = true }) => {
  const cancelButtonRef = useRef(null);
  const { bgColor, icon } =
    variant === 'Warning'
      ? { bgColor: 'bg-red-100', icon: <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> }
      : variant === 'Success'
      ? { bgColor: 'bg-green-100', icon: <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" /> }
      : { bgColor: 'bg-cornflower-500', icon: customIcon };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-8 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white-200 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 min-w-max">
              <div>
                <div className={`mx-auto flex items-center justify-center h-12 w-12 p-8 rounded-full ${bgColor}`}>
                  <div className="text-white-100">{icon}</div>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-xs leading-4 text-gray-600 pb-3">{children}</p>
                  </div>
                </div>
              </div>
              {showCancelButton && (
                <div className="mt-5 sm:mt-6 flex justify-center">
                  <Button onClick={() => onClose(false)} ref={cancelButtonRef} buttonColorGray={true}>
                    Zurück
                  </Button>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
