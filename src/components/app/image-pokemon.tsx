import React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';

interface ImagePokemonProps {
  url?: string | null;
  style?: StyleProp<ImageStyle>;
}

const ImagePokemon: React.FC<ImagePokemonProps> = ({
  url,
  style,
}: ImagePokemonProps) => {
  const styles = useStyles();

  if (!url) {
    return null;
  }

  return <Image source={{ uri: url || '' }} style={[styles.img, style]} />;
};

const useStyles = () => {
  return StyleSheet.create({
    img: {
      width: 200,
      height: 200,
    },
  });
};
export default ImagePokemon;
