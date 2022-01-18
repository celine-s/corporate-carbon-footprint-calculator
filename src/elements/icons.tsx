import {
  FireIcon,
  LightningBoltIcon,
  UsersIcon as TwoUsersIcon,
  PaperAirplaneIcon as AirplaneIcon,
} from '@heroicons/react/solid';

import React, { FC } from 'react';

export const HeatingIcon: FC = () => <FireIcon className="h-6 w-6" />;
export const LightningIcon: FC = () => <LightningBoltIcon className="h-6 w-6" />;
export const PaperAirplaneIcon: FC = () => <AirplaneIcon className="h-6 w-6" />;

export const UsersIcon: FC = () => <TwoUsersIcon className="h-6 w-6" />;

export const TrainIcon: FC = () => (
  <div>
    <svg width="24" height="24" viewBox="0 0 985 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M763 792.5H819.7C837 792.5 851.1 778.4 851.1 761.1V156.1C851.1 112.7 815.9 77.6 772.6 77.6H600.2V32.7H399.8V77.5H227.4C184.1 77.5 148.9 112.7 148.9 156V761.1C148.9 778.5 163 792.5 180.3 792.5H237L10 967.3H155.9L333.7 792.6H666.3L844.1 967.3H990L763 792.5ZM666.3 693.5C666.3 666.9 687.8 645.4 714.4 645.4C741 645.4 762.5 666.9 762.5 693.5C762.5 720.1 741 741.6 714.4 741.6C687.8 741.6 666.3 720.1 666.3 693.5ZM289 741.6C262.4 741.6 240.9 720.1 240.9 693.5C240.9 666.9 262.4 645.4 289 645.4C315.6 645.4 337.1 666.9 337.1 693.5C337.1 720.1 315.5 741.6 289 741.6ZM242.8 492.9C234.1 492.9 227.1 485.9 227.1 477.2V173.1C227.1 164.4 234.1 157.4 242.8 157.4H757.3C766 157.4 773 164.4 773 173.1V477.2C773 485.9 766 492.9 757.3 492.9H242.8Z"
        fill="currentColor"
      />
    </svg>
  </div>
);
