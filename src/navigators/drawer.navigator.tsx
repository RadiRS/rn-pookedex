import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomeContainer } from '@/containers';
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
