import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  const pokemonName: string = args[0];
  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemonDetails = await state.pokeAPI.fetchPokemonDetail(pokemonName);
  const baseExperience = pokemonDetails.base_experience;
  const chanceToCatch = Math.random() * 10;

  if ((baseExperience < 100 && chanceToCatch > 5) || chanceToCatch > 8) {
    console.log("pikachu was caught!");
    state.pokedex[pokemonName] = pokemonDetails;
  } else {
    console.log("pikachu escaped!");
  }
}
