import { startREPL } from "./repl.js";
import { initState, State } from "./state.js";

async function main() {
  const state:State =  initState();
  await startREPL(state);
}

main();
