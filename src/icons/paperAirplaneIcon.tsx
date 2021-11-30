import { PaperAirplaneIcon as SolidPaperAirplane } from '@heroicons/react/solid';
import { PaperAirplaneIcon as OutlinePaperAirplane } from '@heroicons/react/outline';

import React, { FC } from 'react';

export type PaperAirplaneProps = {
  active?: boolean;
};

export const PaperAirplaneIcon: FC<PaperAirplaneProps> = ({ active = false }) => {
  if (!active) {
    return <OutlinePaperAirplane className="h-6 w-6"></OutlinePaperAirplane>;
  } else {
    return <SolidPaperAirplane className="h-6 w-6"></SolidPaperAirplane>;
  }
};
