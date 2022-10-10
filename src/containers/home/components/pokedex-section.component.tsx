import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppImage } from '@/assets';
import { Text, FlatList } from '@/components/ui';
import DexItem from './dex-item.component';
import { useTheme } from '@/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const arr = new Array(5);

const PokeDexSection: React.FC = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const renderDexItem = () => {
    return <DexItem />;
  };

  return (
    <ImageBackground
      source={AppImage.background.bg1}
      style={styles.dexContainer}>
      <View style={styles.titleContainer}>
        <Text variant="title-regular" style={styles.title}>
          {t('headerTitle')}
        </Text>
        <Text style={styles.subTitleDex}>
          {t('headerSubtitle', { total: '9999' })}
        </Text>
      </View>
      <FlatList
        data={arr}
        renderItem={renderDexItem}
        contentContainerStyle={styles.listContentContainer}
      />
    </ImageBackground>
  );
};

export default PokeDexSection;

const useStyles = () => {
  const { MetricsSizes, Colors } = useTheme();
  const { height } = Dimensions.get('screen');
  const { top } = useSafeAreaInsets();

  return StyleSheet.create({
    title: {
      fontSize: 36,
      lineHeight: 40,
      marginBottom: MetricsSizes.tiny,
    },
    whiteBg: {
      backgroundColor: Colors.background,
    },
    dexContainer: {
      paddingTop: top + MetricsSizes.regular,
      height: height + 10,
    },
    titleContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    subTitleDex: {
      fontSize: 20,
      textAlign: 'center',
    },
    listContentContainer: {
      alignItems: 'center',
      padding: MetricsSizes.regular,
    },
  });
};
