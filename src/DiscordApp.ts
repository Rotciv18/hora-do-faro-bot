import DiscordClient from './DiscordClient';
import { Client } from 'discord.js';

class DiscordApp {
  app: Client;
  constructor() {
    this.app = DiscordClient;
  }
}

export default new DiscordApp().app;
