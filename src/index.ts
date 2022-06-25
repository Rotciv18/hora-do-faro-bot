import app from './DiscordClient';
import 'dotenv/config';
import GuildAudioManagerQueue from './app/queues/GuildAudioManagerQueue';
import GuildAudioManagerJob from './app/jobs/GuildAudioManagerJob';

try {
  app.login(process.env.APPLICATION_TOKEN);

  app.once('ready', () => {
    try {
      GuildAudioManagerQueue.process(GuildAudioManagerJob);
    } catch (er) {
      console.log(er);
    }
  });
} catch (error) {
  console.log(error);
}
