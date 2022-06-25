import { Guild, GuildBasedChannel } from 'discord.js';

class GetMostMembersChannel {
  call(guild: Guild): GuildBasedChannel | null {
    let maxMembersChannel: GuildBasedChannel | null = null;
    let maxMembers = 0;

    guild.channels.cache.forEach((channel) => {
      if (channel.type !== 'GUILD_VOICE') return;
      console.log(`${channel.name} -------- ${channel.members.size}`);

      if (channel.members.size > maxMembers) {
        maxMembers = channel.members.size;
        maxMembersChannel = channel;
      }
    });

    return maxMembersChannel;
  }
}

export default new GetMostMembersChannel();
