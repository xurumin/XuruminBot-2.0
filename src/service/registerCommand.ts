import { REST } from "@discordjs/rest";
import {
  Routes,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord-api-types/v9";

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
const rest = new REST({ version: "9" }).setToken(String(DISCORD_TOKEN));

async function registerCommand(
  commands: RESTPostAPIApplicationCommandsJSONBody[]
) {
  await rest.put(
    Routes.applicationGuildCommands(String(CLIENT_ID), String(GUILD_ID)),
    {
      body: commands,
    }
  );
}

export { registerCommand };
