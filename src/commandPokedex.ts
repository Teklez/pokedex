import { State } from "./state.js";

export async function commandPokedex(state: State) {
  if (Object.keys(state.pokedex).length === 0) {
    console.log("You don't have caught pokemon");
    return;
  }
  console.log("Your Pokedex:");
  for (let key of Object.keys(state.pokedex)) {
    console.log(`\t-${key}`);
  }
}
