import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '@/store';
import {
  getPokemon,
  selectPokemon,
  selectPokemonError,
  Type,
} from '@/store/pokemon';
import { capFirstLetter } from '@/helpers';
import { useTheme } from '@/hooks';
import {
  Header,
  ImagePokemon,
  StatPokemon,
  TypePokemon,
} from '@/components/app';
import { SafeArea, ScrollView, Text } from '@/components/ui';

interface PokemonDetailContainerProps {
  params: { id: number };
  key: string;
  name: string;
}

const PokemonDetailContainer: React.FC = () => {
  const { t } = useTranslation();
  const router = useRoute<PokemonDetailContainerProps>();
  const dispatch = useAppDispatch();
  const styles = useStyles();

  const pokemon = useAppSelector(selectPokemon);
  const error = useAppSelector(selectPokemonError);

  const pokemonId = router.params.id;

  const pokemonSprites = Object.values(pokemon?.sprites || {})
    .map((item: string) => typeof item === 'string' && item)
    .filter(item => item !== false);

  useEffect(() => {
    dispatch(getPokemon(pokemonId));
  }, [dispatch, pokemonId]);

  return (
    <SafeArea>
      <Header />
      <ScrollView style={styles.contentContainer} nestedScrollEnabled>
        {error && <Text status="error">{error}</Text>}
        <Text variant="title-regular" style={styles.title}>
          {capFirstLetter(pokemon?.name || '')}
        </Text>
        <ImagePokemon
          url={pokemon?.sprites.other.home.front_default}
          style={styles.img}
        />
        <View style={styles.row}>
          <Text type="bold" style={styles.mr}>
            {t('labels.weight')} :
          </Text>
          <Text>{pokemon?.weight}</Text>
        </View>
        <View style={styles.row}>
          <Text type="bold" style={styles.mr}>
            {t('labels.height')} :
          </Text>
          <Text>{pokemon?.height}</Text>
        </View>
        <View style={styles.row}>
          <Text type="bold" style={styles.mr}>
            {t('labels.abilities')} :
          </Text>
          <View>
            {pokemon?.abilities.map(item => (
              <Text key={item.slot}>
                {`• ${capFirstLetter(item.ability.name)} ${
                  item.is_hidden ? '(hidden)' : ''
                }`}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.row}>
          <Text type="bold" style={styles.mr}>
            {t('labels.type')} :
          </Text>
          <View style={styles.typeContainer}>
            {pokemon?.types.map(item => (
              <TypePokemon name={item.type.name as Type} key={item.slot} />
            ))}
          </View>
        </View>
        <View style={styles.mb}>
          <Text type="bold" style={styles.mr}>
            {t('labels.otherImages')} :
          </Text>
          <View style={styles.spriteContainer}>
            {pokemonSprites.map((item, i) => (
              <ImagePokemon
                url={item || ''}
                key={i.toString()}
                style={styles.sprite}
              />
            ))}
          </View>
        </View>
        <View style={styles.mb}>
          <Text type="bold" style={styles.mr}>
            {t('labels.stats')} :
          </Text>
          <View style={styles.spriteContainer}>
            {pokemon?.stats.map(item => (
              <StatPokemon
                key={item.stat.name}
                name={item.stat.name}
                stat={item.base_stat}
              />
            ))}
          </View>
        </View>
        <View style={styles.mb}>
          <Text type="bold" style={styles.mr}>
            {t('labels.evolution')} :
          </Text>
          <View style={styles.spriteContainer}>
            {/* {pokemon?.stats.map(item => (
              <View key={item.stat.name} style={styles.status}>
                <Text variant="small" style={styles.textStatsName}>
                  {capFirstLetter(item.stat.name)}
                </Text>
              </View>
            ))} */}
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

const useStyles = () => {
  const { MetricsSizes } = useTheme();
  const { width } = Dimensions.get('screen');

  return StyleSheet.create({
    contentContainer: {
      padding: MetricsSizes.regular,
    },
    title: {
      fontSize: 36,
      marginBottom: MetricsSizes.regular,
    },
    img: {
      alignSelf: 'center',
      top: -30,
    },
    typeContainer: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: MetricsSizes.regular,
    },
    row: {
      flexDirection: 'row',
      marginBottom: MetricsSizes.regular,
    },
    mr: {
      marginRight: MetricsSizes.regular,
    },
    mb: {
      marginBottom: MetricsSizes.regular,
    },
    spriteContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    sprite: {
      width: width / 3.3,
      height: 86,
    },
  });
};

export default PokemonDetailContainer;
