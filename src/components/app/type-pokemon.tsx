import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Type } from '@/store/pokemon';
import { Text } from '@/components/ui';
import { useTheme } from '@/hooks';
import { capFirstLetter } from '@/helpers';

interface PokemonTypeProps {
  name: Type;
}

const PokemonType: React.FC<PokemonTypeProps> = ({
  name,
}: PokemonTypeProps) => {
  const styles = useStyles(name);

  return (
    <View style={styles.badge}>
      <Text status="control" type="bold">
        {capFirstLetter(name)}
      </Text>
    </View>
  );
};

const useStyles = (name: Type) => {
  const { MetricsSizes } = useTheme();
  let color;

  switch (name) {
    case 'fire':
      color = 'orange';
      break;
    case 'grass':
      color = 'green';
      break;
    case 'water':
      color = 'blue';
      break;
    case 'ice':
      color = 'lightblue';
      break;
    case 'electric':
      color = 'gold';
      break;
    case 'fighting':
      color = 'darkred';
      break;
    case 'flying':
      color = 'skyblue';
      break;
    case 'bug':
      color = 'yellowgreen';
      break;
    case 'ghost':
      color = 'purple';
      break;
    case 'rock':
      color = 'sienna';
      break;
    case 'ground':
      color = 'burlywood';
      break;
    case 'steel':
      color = 'silver';
      break;
    case 'dark':
      color = 'darkgrey';
      break;
    case 'psychic':
      color = 'palevioletred';
      break;
    case 'fairy':
      color = 'pink';
      break;
    case 'dragon':
      color = 'teal';
      break;
    case 'poison':
      color = 'darkviolet';
      break;
    default:
      color = 'black';
      break;
  }

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
