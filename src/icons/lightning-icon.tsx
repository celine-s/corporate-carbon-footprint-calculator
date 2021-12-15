import { LightningBoltIcon as SolidLightning } from '@heroicons/react/solid';
import { LightningBoltIcon as OutlineLightning } from '@heroicons/react/outline';

import React, { FC } from 'react';

export type LightningProps = {
  active?: boolean;
};

export const LightningIcon: FC<LightningProps> = ({ active = false }) => {
  if (!active) {
    return <OutlineLightning className="h-6 w-6" />;
  } else {
    return <SolidLightning className="h-6 w-6" />;
  }
};
