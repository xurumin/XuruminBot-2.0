import { login } from "../config";
import { InteractionType } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { registerCommand } from "../service/registerCommand";

function makeCommands(name: string, description: string) {
  return new SlashCommandBuilder().setName(name).setDescription(description);
}

async function Commands() {
  try {
    const client = await login();

    const names = ["luiz", "jon", "laks", "carlos"];
    const commands = names.map((name) =>
      makeCommands(name, `Reply with Valeu, ${name}!`).toJSON()
    );

    await registerCommand(commands);

    client?.on("interactionCreate", async (interaction) => {
      if (interaction.type !== InteractionType.ApplicationCommand) return;

      const { commandName } = interaction;

      if (names.includes(commandName)) {
        await interaction.reply(`Valeu, ${commandName}!`);
      }
    });
  } catch (error) {
    console.error({
      message: "Something went error while trying to register commands",
      error,
    });
  }
}

export { Commands };
