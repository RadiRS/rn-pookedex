import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks';
import { Pokemon } from '@/store/pokemon';
import { Text } from '@/components/ui';
import { ImagePokemon, TypePokemon } from '@/components/app';
import { capFirstLetter } from '@/helpers';

interface DexItemProps {
  data: Pokemon;
  onPress?: () => void;
}

const DexItem: React.FC<DexItemProps> = ({ data, onPress }: DexItemProps) => {
  const styles = useStyles();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <ImagePokemon
        url={data.sprites.other.home.front_default}
        style={styles.mb}
      />
      <Text variant="title-small" style={styles.textId}>
        {`# ${data.id}`}
      </Text>
      <Text variant="title-regular">{capFirstLetter(data.name)}</Text>
      <View style={styles.typeContainer}>
        {data.types.map(item => (
          <TypePokemon name={item.type.name} key={item.slot} />
        ))}
      </View>
    </Pressable>
  );
};

export default DexItem;

const useStyles = () => {
  const { MetricsSizes, Colors } = useTheme();

  return StyleSheet.create({
    container: {
      maxWidth: 300,
      backgroundColor: Colors.white,
      borderRadius: MetricsSizes.border * 3,
      padding: 25,
      marginBottom: MetricsSizes.regular,
    },
    textId: {
      color: Colors.grey,
      fontSize: 14,
    },
    typeContainer: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    mb: {
      marginBottom: MetricsSizes.regular,
    },
  });
};
