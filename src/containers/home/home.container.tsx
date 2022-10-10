import React, { useRef } from 'react';
import { ScrollView as RNScrollView } from 'react-native';

import { ScrollView } from '@/components/ui';
import WelcomeSection from './components/welcome-section.component';
import PokeDexSection from './components/pokedex-section.component';

const HomeContainer = () => {
  const refScroll = useRef<RNScrollView>(null);

  const onPressCheckPokeDex = () => {
    refScroll.current?.scrollToEnd();
  };

  return (
    <ScrollView pagingEnabled ref={refScroll}>
      <WelcomeSection onPress={onPressCheckPokeDex} />
      <PokeDexSection />
    </ScrollView>
  );
};

export default HomeContainer;
