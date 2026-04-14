import React from 'react';
import { Feather } from '@expo/vector-icons';

interface IconProps {
  name: React.ComponentProps<typeof Feather>['name'];
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000' }) => {
  return <Feather name={name} size={size} color={color} />;
};
