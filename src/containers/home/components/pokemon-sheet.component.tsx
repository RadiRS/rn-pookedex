import React from 'react';
import { StyleSheet, View } from 'react-native';

import { navigate } from '@/navigators';
import { useAppSelector } from '@/store';
import { selectPokemon } from '@/store/pokemon';
import { useTheme } from '@/hooks';
import { Button, Modal, Text } from '@/components/ui';
import { ImagePokemon, TypePokemon } from '@/components/app';
import { useTranslation } from 'react-i18next';
import { capFirstLetter } from '@/helpers';

interface PokemonSheetProps {
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
}

const PokemonSheet: React.FC<PokemonSheetProps> = ({
  isVisible = false,
  setVisible,
}: PokemonSheetProps) => {
  const styles = useStyles();
  const pokemon = useAppSelector(selectPokemon);
  const { t } = useTranslation();

  const onPressDetail = () => {
    setVisible(false);
    setTimeout(() => {
      navigate('PokemonDetail', { id: pokemon?.id });
    }, 200);
  };

  return (
    <Modal
      variant="bottom"
      swipeDirection="down"
      isVisible={isVisible}
      onBackdropPress={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}>
      <View style={styles.contentContainer}>
        <View style={styles.bullet} />
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
            {t('labels.type')} :
          </Text>
          <View style={styles.typeContainer}>
            {pokemon?.types.map(item => (
              <TypePokemon name={item.type.name} key={item.slot} />
            ))}
          </View>
        </View>
        <Button style={styles.btn} onPress={onPressDetail}>
          {t('actions.moreDetail')}
        </Button>
      </View>
    </Modal>
  );
};

const useStyles = () => {
  const { MetricsSizes, Colors } = useTheme();

  return StyleSheet.create({
    contentContainer: {
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      paddingBottom: MetricsSizes.large,
      padding: MetricsSizes.regular,
      paddingHorizontal: MetricsSizes.large,
      backgroundColor: Colors.background,
    },
    title: {
      fontSize: 36,
      marginBottom: MetricsSizes.regular,
    },
    bullet: {
      width: 100,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: Colors.hint,
      alignSelf: 'center',
      marginBottom: MetricsSizes.large,
    },
    img: {
      marginBottom: MetricsSizes.regular,
      alignSelf: 'center',
    },
    row: {
      flexDirection: 'row',
      marginBottom: MetricsSizes.regular,
    },
    mr: {
      marginRight: MetricsSizes.regular,
    },
    typeContainer: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: MetricsSizes.regular,
    },
    btn: {
      width: '60%',
      alignSelf: 'center',
      borderRadius: 14,
    },
  });
};

export default PokemonSheet;
