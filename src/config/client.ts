import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

async function login() {
  try {
    const logged = await client.login(process.env.DISCORD_TOKEN);
    console.log(`login successfully ${logged}`);
  } catch (error) {
    console.log(error);
  } finally {
    return client;
  }
}
export { login };
