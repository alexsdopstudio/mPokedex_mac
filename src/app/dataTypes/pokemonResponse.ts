import { Results } from './paginatedResponse';

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    back_default: string | null;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };

  stats: Stat[];

  types: {
    slot: number;
    type: Results;
  }[];
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Results;
}
