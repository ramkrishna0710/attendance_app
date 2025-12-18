import { Dimensions, PixelRatio } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const baseHeight = 852;
export const baseWidth = 393;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;

export const BOTTOM_TAB_HEIGHT = 60;
export const isBannerHeight = SCREEN_HEIGHT * 0.4;

const MIN_HEIGHT = 700;
const MAX_WIDTH = 500;

const safeHeight = (): number => Math.max(SCREEN_HEIGHT, MIN_HEIGHT);

const safeWidth = (): number => Math.min(SCREEN_WIDTH, MAX_WIDTH);

const heightScale = (): number => safeHeight() / baseHeight;

const widthScale = (): number => safeWidth() / baseWidth;

const round = (value: number): number => PixelRatio.roundToNearestPixel(value);

export const heightBox = (value: number): number => round(value * heightScale());

export const widthBox = (value: number): number => round(value * widthScale());

export const rf = (size: number) => RFValue(size);
