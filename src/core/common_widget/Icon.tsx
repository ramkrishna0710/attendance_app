import React from 'react';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps, FC } from 'react';

type IoniconName = ComponentProps<typeof Ionicons>['name'];
type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
type MaterialCommunityIconName =
  ComponentProps<typeof MaterialCommunityIcons>['name'];

interface IconProps {
  color?: string;
  size?: number;
  iconFamily: 'Ionicons' | 'MaterialIcons' | 'MaterialCommunityIcons';
  name: string;
}

const Icon: FC<IconProps> = ({ color, size = 24, name, iconFamily }) => {
  if (iconFamily === 'Ionicons') {
    return <Ionicons name={name as IoniconName} size={size} color={color} />;
  }

  if (iconFamily === 'MaterialCommunityIcons') {
    return (
      <MaterialCommunityIcons
        name={name as MaterialCommunityIconName}
        size={size}
        color={color}
      />
    );
  }

  if (iconFamily === 'MaterialIcons') {
    return <MaterialIcons name={name as MaterialIconName} size={size} color={color} />;
  }

  return null;
};

export default Icon;