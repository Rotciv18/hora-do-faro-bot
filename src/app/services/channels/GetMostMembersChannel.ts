import { Guild, StageChannel, VoiceChannel } from 'discord.js';

class GetMostMembersChannel {
  call(guild: Guild | undefined): StageChannel | VoiceChannel | undefined {
    if (!guild) {
      return;
    }
    let maxMembersChannel: StageChannel | VoiceChannel | undefined = undefined;
    let maxMembers = 0;

    guild.channels.cache.forEach((channel) => {
      if (!channel.isVoice() || !channel.joinable) return null;

      let membersSize = 0;
      channel.members.forEach((guildMember) => {
        if (!guildMember.user.bot) {
          membersSize++;
        }
      });

      if (membersSize > maxMembers) {
        maxMembers = membersSize;
        maxMembersChannel = channel;
      }
    });

    return maxMembersChannel;
  }
}

export default new GetMostMembersChannel();
