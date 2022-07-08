import 'dotenv/config';
import AudioPlayerQueue from '../src/app/queues/AudioPlayerQueue';
import ConnectToChannelQueue from '../src/app/queues/ConnectToChannelQueue';
import DiscordClient from '../src/DiscordClient';
import RemoveCompletedQueue from '../src/app/queues/RemoveCompletedQueue';

async function run() {
  DiscordClient.login(process.env.APPLICATION_TOKEN);
  DiscordClient.once('ready', async (client) => {
    const promises = client.guilds.cache.map(async (guild) => {
      console.log('adding guild ' + guild.name);
      AudioPlayerQueue.add({ guildId: guild.id }, { delay: 5000 });
      ConnectToChannelQueue.add({ guildId: guild.id });
    });

    await Promise.all(promises);
    console.log('done');
  });

  await RemoveCompletedQueue.add({});
}

run();
