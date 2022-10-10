import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomeContainer, TextPreviewContainer } from '@/containers';
import { RootStackParamList } from './types';

const Drawer = createDrawerNavigator<RootStackParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeContainer}
        options={{
          title: 'Home',
          headerTitle: '',
        }}
      />
      <Drawer.Screen
        name="PokemonType"
        component={TextPreviewContainer}
        options={{
          title: 'Pokemon Type',
          headerTitle: '',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
