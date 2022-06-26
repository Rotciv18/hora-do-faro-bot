import 'dotenv/config';
import { Client, Intents } from 'discord.js';
import AddToConnectChannelQueueService from './app/services/guilds/AddToConnectChannelQueueService';
import AudioPlayerQueue from './app/queues/AudioPlayerQueue';

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

    this.clientEvents();
  }

  clientEvents() {
    this.discordClient.on('guildCreate', async (guild) => {
      try {
        AddToConnectChannelQueueService.call(guild.id);
        AudioPlayerQueue.add({ guildId: guild.id }, { delay: 7000 });
      } catch (error) {
        console.log(error);
      }
    });
  }
}

export default new DiscordApp().discordClient;
