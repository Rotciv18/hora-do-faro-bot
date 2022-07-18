import 'dotenv/config';
import { Client, Intents } from 'discord.js';
import AddToConnectChannelQueueService from './app/services/guilds/AddToConnectChannelQueueService';
import AudioPlayerQueue from './app/queues/AudioPlayerQueue';
import RemoveByGuildIdService from './app/services/queues/AudioPlayerQueue/RemoveByGuildIdService';

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
        await AddToConnectChannelQueueService.call(guild.id);
        await AudioPlayerQueue.add({ guildId: guild.id }, { delay: 7000 });
      } catch (error) {
        console.log(error);
      }
    });

    // Removing only the AudioPlayerQueue on guildDelete.
    // The ConnectChannelQueue will be removed as soon as it process
    this.discordClient.on('guildDelete', async (guild) => {
      await RemoveByGuildIdService.call(guild.id);
    });
  }
}

export default new DiscordApp().discordClient;
