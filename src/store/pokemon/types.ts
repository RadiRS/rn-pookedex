export interface PokemonState {
  pokemons: PokemonsResponse | null;
  pokemon: Pokemon | null;
  status: Status;
  error: string | null;
}

export interface PokemonsResponse {
  count: number;
  previous: string | null;
  next: string | null;
  results: Pokemon[];
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStatus[];
  sprites: PokemonSprites;
}

export interface PokemonType {
  slot: number;
  type: {
    name: Type;
    url: string;
  };
}

export interface PokemonAbility {
  slot: number;
  is_hidden: boolean;
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  back_default: string | null;
  back_female: null | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  front_default: string | null;
  other: {
    home: {
      front_default: string | null;
    };
  };
}

export interface PokemonStatus {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export type Type =
  | 'normal'
  | 'fire'
  | 'grass'
  | 'water'
  | 'ice'
  | 'electric'
  | 'fighting'
  | 'flying'
  | 'bug'
  | 'ghost'
  | 'rock'
  | 'ground'
  | 'steal'
  | 'dark'
  | 'psychic'
  | 'fairy'
  | 'dragon'
  | 'steel'
  | 'poison';
