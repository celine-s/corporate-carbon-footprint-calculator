import React, { FC } from 'react';
import { UsersIcon as UserSolid } from '@heroicons/react/solid';
import { UsersIcon as UserOutline } from '@heroicons/react/outline';
import { IconProps } from './fire-icon';

export const UsersIcon: FC<IconProps> = ({ active = false }) => {
  if (!active) {
    return <UserOutline className="h-6 w-6" />;
  } else {
    return <UserSolid className="h-6 w-6" />;
  }
};
