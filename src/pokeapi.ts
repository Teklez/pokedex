import { Cache } from "./pokecache.js";
import { CacheEntry } from "./pokecache.js";
import { Pokemon } from "./types.js";
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #catch = new Cache(1000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    try {
      const catchExists = this.#catch.get(url);
      if (catchExists) {
        return catchExists.value;
      }
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const locations: ShallowLocations = await resp.json();
      const entry: CacheEntry<ShallowLocations> = {
        createdAt: Date.now(),
        value: locations,
      };
      this.#catch.add(url, entry);
      return locations;
    } catch (e) {
      throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    try {
      const catchExists = this.#catch.get(url);
      if (catchExists) {
        return catchExists.value;
      }
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const location: Location = await resp.json();
      const entry: CacheEntry<Location> = {
        createdAt: Date.now(),
        value: location,
      };
      this.#catch.add(url, entry);
      return location;
    } catch (e) {
      throw new Error(
        `Error fetching location '${locationName}': ${(e as Error).message}`
      );
    }
  }

  async fetchPokemonDetail(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    try {
      const cacheExists = this.#catch.get(url);
      if (cacheExists) {
        return cacheExists.value;
      }

      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }
      const pokemon: Pokemon = await resp.json();
      const entry: CacheEntry<Pokemon> = {
        createdAt: Date.now(),
        value: pokemon,
      };

      this.#catch.add(url, entry);
      return pokemon;
    } catch (e) {
      throw new Error(
        `Error fetching location '${pokemonName}': ${(e as Error).message}`
      );
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
