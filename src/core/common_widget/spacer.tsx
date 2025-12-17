import React from 'react';
import { View } from 'react-native';
import { heightBox, widthBox } from '../utils/size';

interface SpacerProps {
  h?: number;
  w?: number;
}

const Spacer: React.FC<SpacerProps> = ({ h, w }) => {
  return (
    <View
      style={{
        height: h ? heightBox(h) : undefined,
        width: w ? widthBox(w) : undefined,
      }}
    />
  );
};

export default Spacer;
