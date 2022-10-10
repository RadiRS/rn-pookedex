import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React, { FC } from 'react';
import { useTheme } from '@/hooks';

interface SafeAreaProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  padder?: boolean;
}

const SafeArea: FC<SafeAreaProps> = ({
  style,
  children,
  padder,
  ...props
}: SafeAreaProps) => {
  const styles = useStyles();
  const padding = padder && styles.padder;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, padding, style]} {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const useStyles = () => {
  const { MetricsSizes, Colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    padder: {
      padding: MetricsSizes.regular,
    },
  });
};

export default SafeArea;
