import app from './DiscordClient';
import ConnectToChannelQueue from './app/queues/ConnectToChannelQueue';
import ConnectToChannelJob from './app/jobs/ConnectToChannelJob';
import AudioPlayerQueue from './app/queues/AudioPlayerQueue';
import AudioPlayerJob from './app/jobs/AudioPlayerJob';
import RemoveCompletedQueue from './app/queues/RemoveCompletedQueue';
import RemoveCompletedJob from './app/jobs/RemoveCompletedJob';

try {
  app.login(process.env.APPLICATION_TOKEN);

  app.once('ready', (client) => {
    try {
      ConnectToChannelQueue.process(ConnectToChannelJob);
      AudioPlayerQueue.process(AudioPlayerJob);
      RemoveCompletedQueue.process(RemoveCompletedJob);
    } catch (er) {
      console.log(er);
    }

    // client.guilds.cache.forEach((g) => g.leave());
  });
} catch (error) {
  console.log(error);
}
