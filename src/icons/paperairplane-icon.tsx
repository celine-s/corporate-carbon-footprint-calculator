import { PaperAirplaneIcon as SolidPaperAirplane } from '@heroicons/react/solid';
import { PaperAirplaneIcon as OutlinePaperAirplane } from '@heroicons/react/outline';

import React, { FC } from 'react';
import { IconProps } from './fire-icon';

export const PaperAirplaneIcon: FC<IconProps> = ({ active = false }) => {
  if (!active) {
    return <OutlinePaperAirplane className="h-6 w-6" />;
  } else {
    return <SolidPaperAirplane className="h-6 w-6" />;
  }
};
