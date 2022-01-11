import { LightningBoltIcon as SolidLightning } from '@heroicons/react/solid';
import { LightningBoltIcon as OutlineLightning } from '@heroicons/react/outline';

import React, { FC } from 'react';
import { IconProps } from './fire-icon';

export const LightningIcon: FC<IconProps> = ({ active = false }) => {
  if (!active) {
    return <OutlineLightning className="h-6 w-6" />;
  } else {
    return <SolidLightning className="h-6 w-6" />;
  }
};
