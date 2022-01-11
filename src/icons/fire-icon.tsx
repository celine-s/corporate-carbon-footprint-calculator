import { FireIcon as SolidFire } from '@heroicons/react/solid';
import { FireIcon as OutlineFire } from '@heroicons/react/outline';

import React, { FC } from 'react';

export type IconProps = {
  active?: boolean;
};

export const HeatingIcon: FC<IconProps> = ({ active = false }) => {
  if (!active) {
    return <OutlineFire className="h-6 w-6" />;
  } else {
    return <SolidFire className="h-6 w-6" />;
  }
};
