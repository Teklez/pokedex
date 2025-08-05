import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
import { Pokemon } from "./types.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
  pokedex: Record<string, Pokemon>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "pokedex> ",
  });

  const state: State = {
    rl,
    commands: getCommands(),
    pokeAPI: new PokeAPI(),
    prevLocationsURL: "",
    nextLocationsURL: "",
    pokedex: {},
  };

  return state;
}
