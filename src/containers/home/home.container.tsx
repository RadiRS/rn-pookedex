import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/hooks';
import { Button, Text, SafeArea } from '@/components/ui';
import { AppImage } from '@/assets';
import HeaderSection from './header-section.component';

const HomeContainer = () => {
  const { t } = useTranslation();
  const { Gutters } = useTheme();
  const styles = useStyles();

  return (
    <SafeArea>
      <HeaderSection />
      <View style={styles.padder}>
        <Image source={AppImage.background.welcome} style={styles.welcomeImg} />
        <View style={Gutters.largeTMargin}>
          <Text variant="title-regular" style={styles.title}>
            {t('welcome')}
          </Text>
          <Text style={styles.subTitle}>{t('subWelcome')}</Text>
          <Button
            testID="light-button"
            size="large"
            style={styles.btn}
            onPress={() => {}}>
            {t('actions.checkPokeDex')}
          </Button>
        </View>
      </View>
    </SafeArea>
  );
};

const useStyles = () => {
  const { MetricsSizes } = useTheme();

  return StyleSheet.create({
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
    padder: {
      padding: MetricsSizes.regular,
    },
  });
};

export default HomeContainer;
