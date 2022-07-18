import IConnectToChannelQueue from '../interfaces/IConnectToChannelQueue';
import AudioPlayerQueue from '../queues/AudioPlayerQueue';
import randomIntFromInterval from '../helpers/randomIntFromInterval';
import { getVoiceConnection } from '@discordjs/voice';
import PlayAudioService from '../services/connections/PlayAudioService';
import DiscordClient from '../../DiscordClient';
import { DoneCallback } from 'bull';

export default async (job: IConnectToChannelQueue, done: DoneCallback) => {
  const { guildId } = job.data;
  const delay = randomIntFromInterval(300000, 600000);

  const guild = DiscordClient.guilds.cache.get(guildId);
  if (!guild) {
    done();
    return;
  }
  const connection = getVoiceConnection(guildId);

  if (!connection) {
    await AudioPlayerQueue.add({ guildId }, { delay });
    done();
    return;
  }

  const audioName = `${randomIntFromInterval(1, 39)}.mp3`;
  const audioDirectory = `./audios/${audioName}`;

  PlayAudioService.call(connection, audioDirectory);

  await AudioPlayerQueue.add({ guildId }, { delay });
  done();
};
