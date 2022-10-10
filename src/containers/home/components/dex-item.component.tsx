import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks';
import { Text } from '@/components/ui';

const imgUri = 'https://placeimg.com/640/480/animals';

const DexItem: React.FC = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Image source={{ uri: imgUri }} style={styles.img} />
      <Text variant="title-small" style={styles.textId}>
        #001
      </Text>
      <Text variant="title-regular">Poke Name</Text>
      <View style={styles.typeContainer}>
        <View style={styles.badge}>
          <Text status="control" type="bold">
            Type 1
          </Text>
        </View>
        <View style={styles.badge}>
          <Text status="control" type="bold">
            Type 1
          </Text>
        </View>
        <View style={styles.badge}>
          <Text status="control" type="bold">
            Type 1
          </Text>
        </View>
        <View style={styles.badge}>
          <Text status="control" type="bold">
            Type 1
          </Text>
        </View>
      </View>
    </View>
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
    img: {
      width: 200,
      height: 200,
      backgroundColor: Colors.grey,
      marginBottom: MetricsSizes.regular,
    },
    typeContainer: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    badge: {
      paddingVertical: MetricsSizes.tiny,
      paddingHorizontal: MetricsSizes.regular,
      backgroundColor: 'red',
      borderRadius: 50,
      margin: MetricsSizes.tiny,
    },
  });
};
