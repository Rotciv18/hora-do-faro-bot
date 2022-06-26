import IConnectToChannelQueue from '../interfaces/IConnectToChannelQueue';
import AudioPlayerQueue from '../queues/AudioPlayerQueue';
import randomIntFromInterval from '../helpers/randomIntFromInterval';
import { getVoiceConnection } from '@discordjs/voice';
import PlayAudioService from '../services/connections/PlayAudioService';
import DiscordClient from '../../DiscordClient';

export default async (job: IConnectToChannelQueue) => {
  const { guildId } = job.data;
  const delay = randomIntFromInterval(300000, 600000);

  const guild = DiscordClient.guilds.cache.get(guildId);
  if (!guild) {
    return;
  }
  const connection = getVoiceConnection(guildId);

  if (!connection) {
    AudioPlayerQueue.add({ guildId }, { delay });
    return;
  }

  const audioName = `${randomIntFromInterval(1, 39)}.mp3`;
  const audioDirectory = `./audios/${audioName}`;

  PlayAudioService.call(connection, audioDirectory);

  AudioPlayerQueue.add({ guildId }, { delay });
};
