import DiscordClient from '../../DiscordClient';
import GetMostMembersChannel from './GetMostMembersChannel';
import PlayAudio from './PlayAudio';

class GuildAudioManager {
  playAudioOnGuilds() {
    DiscordClient.guilds.cache.forEach((guild) => {
      const channel = GetMostMembersChannel.call(guild);

      if (channel) {
        PlayAudio.call(channel);
      }
    });
  }
}

export default new GuildAudioManager();
