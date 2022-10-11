import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/hooks';
import { AppImage } from '@/assets';
import { Text, Button, Modal } from '@/components/ui';
import { Header } from '@/components/app';
import { useRoute } from '@react-navigation/native';
import { navigate, RootStackParamList } from '@/navigators';

interface WelcomeSectionProps {
  onPress: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  onPress,
}: WelcomeSectionProps) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { Gutters } = useTheme();
  const [isVisibleMenu, setVisibleMenu] = useState(false);
  const route = useRoute();

  const menu = [
    { name: 'Home', title: 'Home' },
    { name: 'PokemonType', title: 'Pokemon Type' },
  ];

  const onPressNavigate = (name: string) => {
    if (route.name === name) {
      setVisibleMenu(false);
    } else {
      setVisibleMenu(false);
      setTimeout(() => {
        navigate(name as keyof RootStackParamList);
      }, 200);
    }
  };

  const renderMenu = () => (
    <Modal
      variant="top"
      isVisible={isVisibleMenu}
      onBackdropPress={() => setVisibleMenu(false)}>
      <View style={styles.menuContainer}>
        <Header isBack onPressMenu={() => setVisibleMenu(false)} />
        <View style={styles.menuContentContainer}>
          {menu.map((item, i) => (
            <Pressable
              key={item.name}
              onPress={() => onPressNavigate(item.name)}
              style={[styles.menu, i !== menu.length - 1 && styles.border]}>
              <Text
                type={item.name === route.name ? 'bold' : 'regular'}
                status={item.name === route.name ? 'primary' : 'basic'}>
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.welcomeContainer}>
      <Header onPressMenu={() => setVisibleMenu(true)} />
      <View style={styles.padder}>
        <Image source={AppImage.background.welcome} style={styles.welcomeImg} />
        <View style={Gutters.largeTMargin}>
          <Text variant="title-regular" style={styles.title}>
            {t('welcome')}
          </Text>
          <Text style={styles.subTitle}>{t('subWelcome')}</Text>
          <Button
            testID="check-button"
            size="large"
            style={styles.btn}
            onPress={onPress}>
            {t('actions.checkPokeDex')}
          </Button>
        </View>
      </View>
      {renderMenu()}
    </View>
  );
};

export default WelcomeSection;

const useStyles = () => {
  const { MetricsSizes, Colors } = useTheme();
  const { height } = Dimensions.get('screen');
  const { top } = useSafeAreaInsets();
  const isAndroid = Platform.OS === 'android';

  return StyleSheet.create({
    welcomeContainer: {
      paddingTop: isAndroid ? 0 : top,
      height,
      backgroundColor: Colors.background,
    },
    padder: {
      padding: MetricsSizes.regular,
    },
    welcomeImg: {
      width: 264,
      alignSelf: 'center',
    },
    title: {
      fontSize: 36,
      lineHeight: 40,
      marginBottom: MetricsSizes.tiny,
    },
    subTitle: {
      color: '#7B8082',
      marginBottom: MetricsSizes.large,
    },
    btn: {
      width: '80%',
      borderRadius: 14,
    },
    menuContainer: {
      paddingTop: isAndroid ? 0 : top,
      backgroundColor: Colors.background,
    },
    menuContentContainer: {
      padding: MetricsSizes.regular,
    },
    menu: {
      paddingVertical: MetricsSizes.regular,
    },
    border: {
      borderBottomColor: Colors.secondary,
      borderBottomWidth: 1,
    },
  });
};
