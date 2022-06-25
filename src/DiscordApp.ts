import { Client, Intents } from 'discord.js';

class DiscordApp {
  discordClient: Client;

  constructor() {
    this.discordClient = new Client({
      intents: [Intents.FLAGS.GUILDS],
    });
  }
}

export default new DiscordApp().discordClient;
