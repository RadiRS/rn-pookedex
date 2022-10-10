import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';

import { useTheme } from '@/hooks';
import { AppImage } from '@/assets';

const HeaderSection = () => {
  const styles = useStyles();

  const onPressMenu = () => {
    // console.log('Test');
  };

  return (
    <View style={styles.container}>
      <Image source={AppImage.logo.app} style={styles.img} />
      <Pressable style={styles.press} onPress={onPressMenu}>
        <Image source={AppImage.icon.burger} style={styles.menu} />
      </Pressable>
    </View>
  );
};

const useStyles = () => {
  const { MetricsSizes } = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: MetricsSizes.regular,
    },
    img: {
      width: 69,
      height: 24,
      resizeMode: 'contain',
    },
    press: {
      paddingHorizontal: MetricsSizes.small,
    },
    menu: {
      width: 16,
      height: 16,
      resizeMode: 'contain',
    },
  });
};
export default HeaderSection;
