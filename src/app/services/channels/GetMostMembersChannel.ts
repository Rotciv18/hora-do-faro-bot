import { Guild, GuildBasedChannel, GuildMember } from 'discord.js';

class GetMostMembersChannel {
  call(guild: Guild | undefined): GuildBasedChannel | null {
    if (!guild) {
      return null;
    }
    let maxMembersChannel: GuildBasedChannel | null = null;
    let maxMembers = 0;

    guild.channels.cache.forEach((channel) => {
      if (!channel.isVoice()) return;

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
