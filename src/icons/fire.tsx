import { FireIcon as SolidFire } from '@heroicons/react/solid';
import { FireIcon as OutlineFire } from '@heroicons/react/outline';

import React, { FC } from 'react';

export type HeatingProps = {
  active?: boolean;
};

export const HeatingIcon: FC<HeatingProps> = ({ active = false }) => {
  if (!active) {
    return <OutlineFire className="h-6 w-6"></OutlineFire>;
  } else {
    return <SolidFire className="h-6 w-6"></SolidFire>;
  }
};
