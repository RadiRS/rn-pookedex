/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  background: '#FFFF',
  splashBackground: '#212529',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  text: '#42494D',
  dark: '#212529',
  textDisabled: '#9C9C9C',
  alternative: '#ffffff',
  primary: '#E6AB09',
  secondary: '#F1F1F1',
  hint: '#AFB1B6',
  info: '#8AC0FF',
  disabled: '#DEDEDE',
  success: '#01B956',
  warning: '#FCCC6F',
  error: '#DE2C2C',
  border: '#AFB1B6',
  orange: '#E66D00',
  grey: '#B3B6B8',
  pink: '#E34C88',
  blue: '#0571A6',
  purple: '#3C48CF',
};

export const NavigationColors = {
  primary: Colors.primary,
  background: Colors.background,
};

/**
 * FontFamily
 */
export const FontsFamily = {
  regular: 'Poppins-Regular',
  bold: 'Poppins-Bold',
  semiBold: 'Poppins-SemiBold',
};
/**
 * FontSize
 */
export const FontSize = {
  tiny: 12,
  small: 13,
  regular: 16,
  regular2: 14,
  large: 32,
  large2: 24,
  large3: 18,
};

/**
 * Metrics Sizes
 */
const tiny = 4; // 4
const small = tiny * 2; // 8
const regular = small * 2; // 16
const large = regular * 2; // 32
const border = 8; // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
  border,
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
  FontsFamily,
};
