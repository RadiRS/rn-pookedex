import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { getPokemon, getPokemons } from './pokemonService';
import { PokemonsResponse, PokemonState } from './types';

const initialState: PokemonState = {
  pokemons: null,
  pokemon: null,
  status: 'idle',
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      state.pokemon = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getPokemons.pending, (state, _) => {
      state.status = 'loading';
    });
    builder.addCase(getPokemons.fulfilled, (state, action) => {
      const {
        meta: { arg },
      } = action;

      state.status = 'succeeded';

      if (!arg.isLoadMore) {
        state.pokemons = action.payload;
        return;
      }

      state.pokemons = {
        ...state.pokemons,
        results: action.payload.results.length
          ? state.pokemons?.results.concat(action.payload?.results)
          : state.pokemons?.results,
      } as PokemonsResponse;
    });
    builder.addCase(getPokemons.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || null;
    });
    builder.addCase(getPokemon.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.pokemon = action.payload;
    });
  },
});

export const { setPokemon } = pokemonSlice.actions;

export const selectPokemons = (state: RootState) => state.pokemon.pokemons;
export const selectPokemon = (state: RootState) => state.pokemon.pokemon;
export const selectPokemonStatus = (state: RootState) => state.pokemon.status;
export const selectPokemonError = (state: RootState) => state.pokemon.error;

export default pokemonSlice.reducer;
