import { Client, Intents } from 'discord.js';
import AudioInterval from './app/services/AudioInterval';

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

    this.setAudioInterval();
  }

  setAudioInterval() {
    AudioInterval.call();
  }
}

export default new DiscordApp().discordClient;
