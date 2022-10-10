/* eslint-disable no-console */
import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { axios } from '@/store/api';

export const getPokemons = createAsyncThunk(
  '/pokemons',
  async ({ limit = 5, offset = 0 }: { limit: number; offset: number }) => {
    try {
      const res = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);

      const urls = res.data.results.map((item: any) => {
        return item.url;
      });

      const results: any[] = [];

      await axios
        .all(urls.map((endpoint: string) => axios.get(endpoint)))
        .then(allResponses => {
          allResponses.forEach((result: any) => {
            results.push(result.data);
          });
        });

      return { ...res.data, results };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  },
);

export const getPokemon = createAsyncThunk('/pokemon', async (id: number) => {
  try {
    const res = await api.get(`/pokemon/${id}`);
    return res.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
});
