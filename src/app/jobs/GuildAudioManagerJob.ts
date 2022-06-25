import DiscordClient from '../../DiscordClient';
import GetMostMembersChannel from '../services/channels/GetMostMembersChannel';
import PlayAudio from '../services/channels/PlayAudio';
import GuildAudioManagerQueue from '../queues/GuildAudioManagerQueue';

export default () => {
  DiscordClient.guilds.cache.forEach((guild) => {
    const channel = GetMostMembersChannel.call(guild);

    const audioName = `${Math.floor(Math.random() * 38) + 1}.mp3`;
    const audioDirectory = `./audios/${audioName}`;
    if (channel) {
      PlayAudio.call(channel, audioDirectory);
    }
  });

  const delay = Math.floor(Math.random() * 300000) + 300000;

  console.log(new Date().toString());
  GuildAudioManagerQueue.add({}, { delay });
};
