import { join } from "path";
import { readdirSync } from "fs";

import { Client } from "discord.js";

import { IPlugin } from "../@types/plugin";

import { REST } from "@discordjs/rest";
import {
  Routes,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord-api-types/v9";
const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const rest = new REST({ version: "9" }).setToken(String(DISCORD_TOKEN));

async function registerCommands(
  commands: RESTPostAPIApplicationCommandsJSONBody[]
) {
  console.log("[Plugins] - Sending commands to Discord...");

  try {
    await rest.put(
      Routes.applicationGuildCommands(String(CLIENT_ID), String(GUILD_ID)),
      {
        body: commands,
      }
    );
  } catch (error) {
    console.error(error);
  }

  console.log("[Plugins] - Commands sent!");
}

export async function loadPlugins(): Promise<IPlugin[]> {
  console.log("[Plugins] - Loading plugins...");
  const pluginsPathDir = join(__dirname, "../plugins");
  const pluginsPath = readdirSync(pluginsPathDir).map((folderName) =>
    join(pluginsPathDir, folderName, "index.ts")
  );
  const plugins = await Promise.all(
    pluginsPath.map(async (path) => {
      const plugin = await import(path);
      if (plugin.onLoad) {
        await plugin.onLoad();
      }
      return plugin;
    })
  );

  console.log("[Plugins] - Plugins loaded!");

  return plugins;
}

async function registerPlugin(plugin: IPlugin) {
  console.log("[Plugins] - Registering plugin...");
  let pluginsDict = Object.create(null);

  const {
    default: { name, slash },
    run,
  } = plugin;

  const validSlash: Array<RESTPostAPIApplicationCommandsJSONBody> = [];

  slash.forEach((command) => {
    if (pluginsDict[command.name]) {
      console.error(
        `     - Plugin ${name} already registered command ${command.name}`
      );
    } else {
      pluginsDict[command.name] = run;
      validSlash.push(command);
      console.log(`     - Plugin ${name} registered command ${command.name}`);
    }
  });

  console.log("[Plugins] - Plugin registered!");

  return { pluginsDict, validSlash };
}

export async function registerPlugins(plugins: IPlugin[]): Promise<{
  pluginsDict: any;
}> {
  let pluginList = Object.create(null);
  
  for (const plugin of plugins) {
    const { pluginsDict, validSlash } = await registerPlugin(plugin);
    await registerCommands(validSlash);
    pluginList = { ...pluginsDict, ...pluginList };
  }
  return pluginList;
}
