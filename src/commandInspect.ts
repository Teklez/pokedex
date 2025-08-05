import { State } from "./state.js";
import { Pokemon } from "./types.js";

export async function commandInspect(state: State, ...args: string[]) {
  const pokemonName: string = args[0];
  const pokemonDetails: Pokemon = state.pokedex[pokemonName];
  if (pokemonDetails) {
    console.log(`Name: ${pokemonDetails.name}`);
    console.log(`Height: ${pokemonDetails.height}`);
    console.log(`Weight: ${pokemonDetails.weight}`);
    console.log(`Stats:`);
    for (let status of pokemonDetails.stats) {
      console.log(`\t${status.stat.name}: ${status.base_stat}`);
    }
    console.log(`Types:`);
    for (let type of pokemonDetails.types) {
      console.log(`\t${type.type.name}: ${type.slot}`);
    }
  } else {
    console.log("you have not caught that pokemon");
  }
}
