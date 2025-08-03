
import { State } from "./state.js";

function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((item) => item != null);
}

async function startREPL(state: State) {
  const rl = state.rl;
  const commands = state.commands;

  rl.prompt();

  rl.on("line", async (input) => {
    const cleanedInput = cleanInput(input);
    if (cleanedInput == null) {
      rl.prompt();
      return;
    } else {
      console.log();
      if (cleanedInput[0] in commands) {
        try {
          await commands[cleanedInput[0]].callback(state);
        } catch (err) {
          if (err instanceof Error) {
            console.log(err.message);
          }
        }
      } else {
        console.log("Unknown command");
      }

      rl.prompt();
    }
  });
}

export { cleanInput, startREPL };
