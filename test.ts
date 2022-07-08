import 'dotenv/config';
import AudioPlayerQueue from './src/app/queues/AudioPlayerQueue';
import ConnectToChannelQueue from './src/app/queues/ConnectToChannelQueue';
import DiscordClient from './src/DiscordClient';
import RemoveCompletedQueue from './src/app/queues/RemoveCompletedQueue';

import { getVoiceConnection } from '@discordjs/voice';

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
async function run() {
  DiscordClient.login(process.env.APPLICATION_TOKEN);
  DiscordClient.once('ready', async (client) => {
    const promises = client.guilds.cache.map(async (guild) => {
      console.log('adding guild ' + guild.name);
      AudioPlayerQueue.add({ guildId: guild.id }, { delay: 5000 });
      // ConnectToChannelQueue.add({ guildId: guild.id });
    });

    await Promise.all(promises);
    console.log('done');

    // const connection = getVoiceConnection('862479111225212978');
    // console.log(connection);
  });

  // await RemoveCompletedQueue.add({});
}

run();
