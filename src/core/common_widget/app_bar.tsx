import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import CustomText from './custom_text';
import { goBack } from '../utils/NavigationUtils';

interface AppBarProps {
  title?: string;
  isCenter?: boolean;
  onBackPress?: () => void;
}

const AppBar: React.FC<AppBarProps> = ({
  title,
  isCenter = false,
  onBackPress = goBack,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} activeOpacity={0.7}>
        <Icon iconFamily="Ionicons" name="arrow-back" size={24} />
      </TouchableOpacity>

      {title ? (
        <CustomText
          varient="h4"
          fontFamily="Okra-Bold"
          style={[
            styles.title,
            isCenter ? styles.centerTitle : undefined,
          ]}
        >
          {title}
        </CustomText>
      ) : null}
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  title: {
    marginLeft: 12,
  },
  centerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});
