import { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./commandHelp.js";
import { commandMapBack, commandMapForward } from "./commandMap.js";
import { commandExplore } from "./commandExplore.js";
import { commandCatch } from "./commandCatch.js";
import { commandInspect } from "./commandInspect.js";
import { commandPokedex } from "./commandPokedex.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Get the next page of locations",
      callback: commandMapForward,
    },
    mapb: {
      name: "mapb",
      description: "Get the previous page of locations",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "Get the detailed data of specific area by its name",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Catch pokemon based on random chance",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "get the details of catched pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "get the list of catched pokemon",
      callback: commandPokedex,
    },
  };
}
