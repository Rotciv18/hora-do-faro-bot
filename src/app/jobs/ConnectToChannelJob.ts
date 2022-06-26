import IConnectToChannelQueue from '../interfaces/IConnectToChannelQueue';
import DiscordClient from '../../DiscordClient';
import GetMostMembersChannel from '../services/channels/GetMostMembersChannel';
import { joinVoiceChannel } from '@discordjs/voice';

export default async function (job: IConnectToChannelQueue) {
  const { guildId } = job.data;

  const guild = DiscordClient.guilds.cache.get(guildId);
  const channel = GetMostMembersChannel.call(guild);

  if (guild && channel) {
    const connection = joinVoiceChannel({
      guildId: guildId,
      channelId: channel?.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
  }
}
