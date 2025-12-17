import React, { FC, useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, ViewStyle, ImageStyle, Text } from 'react-native';
import {
  Image,
  type ImageContentFit,
  type ImageSource,
} from 'expo-image';
import { useTheme } from '../theme/ThemeContext';

export interface CachedImageProps {
  uri: string;
  width?: number;
  height?: number;
  fit?: ImageContentFit;
  radius?: number;
  isCircle?: boolean;
  isBorder?: boolean;
  borderColor?: string;
  borderRadius?: number;
  errorWidget?: React.ReactNode;
  fadeInDuration?: number;
  placeholderSource?: ImageSource | ImageSource[] | string | string[];
}

const CachedImage: FC<CachedImageProps> = ({
  uri,
  width,
  height,
  fit = 'cover',
  radius = 0,
  isCircle = false,
  isBorder = false,
  borderColor,
  borderRadius,
  errorWidget,
  fadeInDuration = 300,
  placeholderSource,
}) => {
  const { colors } = useTheme();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [uri]);

  const finalUri = useMemo(() => {
    return uri ? `${uri}?cb=${Date.now()}` : uri;
  }, [uri]);

  const effectiveBorderColor = borderColor ?? colors.border;
  const circleRadius = (width ?? height ?? 0) / 2;
  const finalBorderRadius = isCircle ? circleRadius : borderRadius ?? radius;

  const containerStyle: ViewStyle = {
    width,
    height,
    borderRadius: finalBorderRadius,
    borderWidth: isBorder ? 2 : 0,
    borderColor: isBorder ? effectiveBorderColor : 'transparent',
    overflow: 'hidden',
    backgroundColor: colors.background,
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {!hasError && (
        <Image
          source={{ uri: finalUri }}
          style={[
            StyleSheet.absoluteFillObject,
            { borderRadius: finalBorderRadius } as ImageStyle,
          ]}
          cachePolicy="disk"
          contentFit={fit}
          transition={fadeInDuration}
          placeholder={placeholderSource}
          onError={() => setHasError(true)}
        />
      )}

      {hasError && (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            styles.errorOverlay,
            {
              borderRadius: finalBorderRadius,
              backgroundColor: colors.primary_light,
            },
          ]}
        >
          {errorWidget ?? (
            <Text style={[styles.errorMark, { color: colors.dark }]}>!</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default CachedImage;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMark: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});