import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';

import { useTheme } from '@/hooks';
import { AppImage } from '@/assets';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  onPressMenu?: () => void;
  isBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onPressMenu,
  isBack,
}: HeaderProps) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const canGoBack = isBack || navigation.canGoBack();
  const ic = canGoBack ? AppImage.icon.times : AppImage.icon.burger;

  const extOnPressMenu = () => {
    if (onPressMenu) {
      onPressMenu();
      return;
    }

    if (canGoBack) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Image source={AppImage.logo.app} style={styles.img} />
      <Pressable style={styles.press} onPress={extOnPressMenu}>
        <Image source={ic} style={styles.menu} />
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
export default Header;
