import 'dotenv/config';
import GuildAudioManagerQueue from './src/app/queues/GuildAudioManagerQueue';

async function call() {
  try {
    await GuildAudioManagerQueue.add({});
  } catch (errr) {
    console.log(errr);
  }
}

call();
