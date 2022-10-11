import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui';
import { useTheme } from '@/hooks';
import { capFirstLetter, getRandomColor } from '@/helpers';

interface PokemonTypeProps {
  name: string;
}

const PokemonType: React.FC<PokemonTypeProps> = ({
  name,
}: PokemonTypeProps) => {
  const styles = useStyles();

  return (
    <View style={styles.badge}>
      <Text status="control" type="bold">
        {capFirstLetter(name)}
      </Text>
    </View>
  );
};

const useStyles = () => {
  const { MetricsSizes } = useTheme();
  const color = getRandomColor();

  return StyleSheet.create({
    badge: {
      paddingVertical: MetricsSizes.tiny,
      paddingHorizontal: MetricsSizes.regular,
      backgroundColor: color,
      borderRadius: 50,
      margin: MetricsSizes.tiny,
    },
  });
};

export default PokemonType;
