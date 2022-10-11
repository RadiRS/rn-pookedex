import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

import { themeReducer } from './theme';
import { pokemonReducer } from './pokemon';

const mainPersistConfig = {
  key: 'main',
  whitelist: ['theme'],
  storage: AsyncStorage,
};

const rootReducers = combineReducers({
  theme: themeReducer,
  pokemon: pokemonReducer,
});

export default persistReducer(mainPersistConfig, rootReducers);
