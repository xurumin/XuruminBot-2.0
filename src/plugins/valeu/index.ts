import { SlashCommandBuilder } from "@discordjs/builders";
import { APIApplicationCommandInteraction } from "discord-api-types/v10";

function makeCommands(name: string, description: string) {
  return new SlashCommandBuilder().setName(name).setDescription(description);
}

const names = ["luiz", "jon", "laks", "carlos", "laks", "carlos"];

const commands = names.map((name) =>
  makeCommands(name, `Reply with Valeu, ${name}!`).toJSON()
);

export async function onLoad() {
  console.log("-- Plugin teste loaded!");
}

export async function run(interaction: APIApplicationCommandInteraction | any) {
  console.log("it is working!");

  await interaction.reply("Valeu, " + interaction.commandName + "!");
}

export default {
  name: "Valeu, Carlos!",
  slash: commands,
};
