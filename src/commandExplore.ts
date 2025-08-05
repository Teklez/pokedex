import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  const locationName: string = args[0];
  console.log(`Exploring ${locationName}...`);
  console.log(`Found Pokemon\n`);

  const locationData = await state.pokeAPI.fetchLocation(locationName);
  for (let encounter of locationData.pokemon_encounters) {
    console.log(encounter.pokemon.name);
  }
}
