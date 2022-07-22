import "dotenv/config";

import {
  APIApplicationCommandInteraction,
  InteractionType,
} from "discord-api-types/v10";

import { Commands } from "./commands/commands";
import * as Plugins from "./commands/Plugins";

import { login } from "./config";

(async () => {
  const client = await login();

  const plugins = await Plugins.loadPlugins();

  const pluginsDict: any = await Plugins.registerPlugins(plugins);

  client.on(
    "interactionCreate",
    async (interaction: APIApplicationCommandInteraction) => {
      if (interaction.type !== InteractionType.ApplicationCommand) return;

      const { commandName } = interaction as any;

      if (pluginsDict[commandName]) {
        return await pluginsDict[commandName](interaction);
      }
    }
  );

  // await Commands();
})();
