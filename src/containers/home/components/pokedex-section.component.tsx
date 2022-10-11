import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ListRenderItem,
  Platform,
  StyleSheet,
  View,
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

const PokeDexSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const { t } = useTranslation();
  const [isVisible, setVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const [listPokemon, setListPokemon] = useState<Pokemon[]>([]);
  const limit = 5;

  const pokemons = useAppSelector(selectPokemons);
  const status = useAppSelector(selectPokemonStatus);
  const error = useAppSelector(selectPokemonError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getPokemons({ limit, offset }));
    }

    if (offset === 0) {
      setListPokemon(pokemons?.results || []);
    }
  }, [status, dispatch, offset, pokemons?.results]);

  useEffect(() => {
    dispatch(getPokemons({ limit, offset }));

    if (offset !== 0) {
      if (!pokemons) {
        return;
      }
      const newData = [...listPokemon, ...pokemons.results];

      setListPokemon(newData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, dispatch]);

  const onPressItem = (item: Pokemon) => {
    dispatch(setPokemon(item));

    setVisible(true);
  };

  const onEndReached = () => {
    if (status === 'loading' || !pokemons?.results.length) {
      return;
    }

    setOffset(prevState => prevState + 5);
  };

  const renderDexItem: ListRenderItem<Pokemon> = ({ item }) => {
    return <DexItem data={item} onPress={() => onPressItem(item)} />;
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
          {t('headerSubtitle', { total: pokemons?.count })}
        </Text>
        {error && <Text status="error">{error}</Text>}
      </View>
      <FlatList
        nestedScrollEnabled
        data={listPokemon}
        onEndReached={onEndReached}
        renderItem={renderDexItem}
        contentContainerStyle={styles.listContentContainer}
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
      paddingTop: isAndroid ? MetricsSizes.regular : top + MetricsSizes.regular,
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

export default PokeDexSection;
