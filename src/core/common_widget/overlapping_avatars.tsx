import React from 'react';
import { View, StyleSheet } from 'react-native';
import CachedImage from './cache_image';
import CustomText from './custom_text';
import { useTheme } from '../theme/ThemeContext';

interface Props {
  imageUrls: string[];
  extraCount: number;
  size?: number;
  overlap?: number;
}

const OverlappingAvatars: React.FC<Props> = ({
  imageUrls,
  extraCount,
  size = 28,
  overlap = 15,
}) => {
  const { colors } = useTheme();

  const total = imageUrls.length + (extraCount > 0 ? 1 : 0);
  const totalWidth = total > 0 ? size + (total - 1) * (size - overlap) : 0;

  return (
    <View style={[styles.container, { width: totalWidth, height: size }]}>

      {imageUrls.map((url, index) => (
        <View
          key={`${url}-${index}`}
          style={[
            styles.avatarWrapper,
            {
              left: index * (size - overlap),
              width: size + 4,
              height: size + 4,
              borderRadius: (size + 4) / 2,
              backgroundColor: colors.background,
            },
          ]}
        >
          <CachedImage
            uri={url}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
            }}
          />
        </View>
      ))}

      {extraCount > 0 && (
        <View
          style={[
            styles.avatarWrapper,
            {
              left: imageUrls.length * (size - overlap),
              width: size + 4,
              height: size + 4,
              borderRadius: (size + 4) / 2,
              backgroundColor: colors.background,
            },
          ]}
        >
          <View
            style={[
              styles.extraAvatar,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: colors.border, 
              },
            ]}
          >
            <CustomText
              varient="h7"
              fontFamily="Okra-Bold"
              color={colors.dark}
            >
              {extraCount}+
            </CustomText>
          </View>
        </View>
      )}
    </View>
  );
};

export default OverlappingAvatars;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  avatarWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});