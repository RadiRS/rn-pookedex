import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ListRenderItem,
  Platform,
  StyleSheet,
  View,
  FlatList as RNFlatList,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectPokemons,
  getPokemons,
  selectPokemonStatus,
  selectPokemonError,
  Pokemon,
  setPokemon,
} from '@/store/pokemon';

import { AppImage } from '@/assets';
import { useTheme } from '@/hooks';
import { Text, FlatList } from '@/components/ui';

import DexItem from './dex-item.component';
import PokemonSheet from './pokemon-sheet.component';
import WelcomeSection from './welcome-section.component';

const PokeDexSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const refScroll = useRef<RNFlatList>(null);
  const { t } = useTranslation();
  const [isVisible, setVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const limit = 5;

  const pokemons = useAppSelector(selectPokemons);
  const status = useAppSelector(selectPokemonStatus);
  const error = useAppSelector(selectPokemonError);

  useEffect(() => {
    if (isLoadMore) {
      dispatch(getPokemons({ limit, offset, isLoadMore }));
      setIsLoadMore(false);
      return;
    }

    if (status === 'idle') {
      dispatch(getPokemons({ limit, offset }));
    }
  }, [status, dispatch, offset, pokemons?.results, isLoadMore]);

  const onPressItem = (item: Pokemon) => {
    dispatch(setPokemon(item));

    setVisible(true);
  };

  const onEndReached = () => {
    if (status === 'loading' || !pokemons?.results.length) {
      return;
    }

    setIsLoadMore(true);
    setOffset(prevState => prevState + 5);
  };

  const renderHeader = () => {
    const onPress = () => {
      refScroll.current?.scrollToIndex({ index: 0 });
    };
    return <WelcomeSection onPress={onPress} />;
  };

  const renderDexItem: ListRenderItem<Pokemon> = ({ item, index }) => {
    if (index === 0) {
      return (
        <View style={styles.titleContainer}>
          <Text variant="title-regular" style={styles.title}>
            {t('headerTitle')}
          </Text>
          <Text style={styles.subTitleDex}>
            {t('headerSubtitle', { total: pokemons?.count })}
          </Text>
          {error && <Text status="error">{error}</Text>}
          <DexItem
            data={item}
            onPress={() => onPressItem(item)}
            style={styles.item}
          />
        </View>
      );
    }

    return (
      <DexItem
        data={item}
        onPress={() => onPressItem(item)}
        style={styles.item}
      />
    );
  };

  const renderFooter = () => {
    if (status !== 'loading') {
      return null;
    }

    return (
      <Text type="bold" style={styles.item}>
        Loading...
      </Text>
    );
  };

  return (
    <ImageBackground
      source={AppImage.background.bg1}
      style={styles.dexContainer}>
      <FlatList
        nestedScrollEnabled
        bounces={false}
        ref={refScroll}
        data={pokemons?.results}
        onEndReached={onEndReached}
        renderItem={renderDexItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        // contentContainerStyle={styles.listContentContainer}
      />
      <PokemonSheet isVisible={isVisible} setVisible={setVisible} />
    </ImageBackground>
  );
};

const useStyles = () => {
  const { MetricsSizes, Colors } = useTheme();
  const { height } = Dimensions.get('screen');
  const { top } = useSafeAreaInsets();
  const isAndroid = Platform.OS === 'android';

  return StyleSheet.create({
    dexContainer: {
      // paddingTop: isAndroid ? MetricsSizes.regular : top + MetricsSizes.regular,
      height: height + 10,
    },
    title: {
      fontSize: 36,
      lineHeight: 40,
      marginBottom: MetricsSizes.tiny,
    },
    whiteBg: {
      backgroundColor: Colors.background,
    },
    titleContainer: {
      paddingTop: isAndroid ? MetricsSizes.regular : top + MetricsSizes.regular,
      justifyContent: 'center',
      alignItems: 'center',
    },
    subTitleDex: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: MetricsSizes.regular,
    },
    listContentContainer: {
      alignItems: 'center',
      padding: MetricsSizes.regular,
    },
    item: {
      alignSelf: 'center',
    },
  });
};

export default PokeDexSection;
