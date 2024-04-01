export interface PokemonSpecies {
  id: number;
  name: string;
  is_legendary: boolean;

  evolves_from_species: {
    name: string;
  } | null;

  color: {
    name: string;
  };

  shape: {
    name: string;
  };

  habitat: {
    name: string;
  };

  evolution_chain: {
    url: string;
  };

  varieties: {
    is_default: boolean;
    pokemon: {
      name: string;
    };
  }[];

  names: {
    language: {
      name: string;
    };
    name: string;
  }[];
}
