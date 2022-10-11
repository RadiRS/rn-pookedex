import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { capFirstLetter, getRandomColor } from '@/helpers';
import { Text } from '@/components/ui';
import { useTheme } from '@/hooks';

interface StatsPokemonProps {
  name: string;
  stat: number;
}

const StatPokemon: React.FC<StatsPokemonProps> = ({
  name,
  stat,
}: StatsPokemonProps) => {
  const styles = useStyles();

  return (
    <View style={styles.status}>
      <Text style={styles.textStats} type="bold">
        {stat}
      </Text>
      <Text variant="small" style={styles.textStatsName}>
        {capFirstLetter(name)}
      </Text>
    </View>
  );
};

export default StatPokemon;

const useStyles = () => {
  const { MetricsSizes } = useTheme();
  const { width } = Dimensions.get('screen');
  return StyleSheet.create({
    status: {
      justifyContent: 'center',
      alignItems: 'center',
      width: width / 3.8,
      height: width / 3.8,
      borderWidth: 5,
      borderRadius: 100,
      marginVertical: MetricsSizes.small,
      borderColor: getRandomColor(),
    },
    textStats: {
      fontSize: 28,
      textAlign: 'center',
    },
    textStatsName: {
      textAlign: 'center',
    },
  });
};
