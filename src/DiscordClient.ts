import { Client, Intents } from 'discord.js';

class DiscordApp {
  discordClient: Client;

  constructor() {
    this.discordClient = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
      ],
    });
  }
}

export default new DiscordApp().discordClient;
