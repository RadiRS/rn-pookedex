import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/hooks';
import { AppImage } from '@/assets';
import { Text, Button } from '@/components/ui';
import HeaderSection from './header.component';

interface WelcomeSectionProps {
  onPress: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  onPress,
}: WelcomeSectionProps) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { Gutters } = useTheme();

  return (
    <View style={styles.welcomeContainer}>
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
            onPress={onPress}>
            {t('actions.checkPokeDex')}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default WelcomeSection;

const useStyles = () => {
  const { MetricsSizes } = useTheme();
  const { height } = Dimensions.get('screen');
  const { top } = useSafeAreaInsets();

  return StyleSheet.create({
    padder: {
      padding: MetricsSizes.regular,
    },
    welcomeContainer: {
      paddingTop: top,
      height,
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
  });
};
