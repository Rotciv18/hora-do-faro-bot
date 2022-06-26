import IConnectToChannelQueue from '../interfaces/IConnectToChannelQueue';
import DiscordClient from '../../DiscordClient';
import GetMostMembersChannel from '../services/channels/GetMostMembersChannel';
import { joinVoiceChannel, getVoiceConnection } from '@discordjs/voice';

import ConnectToChannelQueue from '../queues/ConnectToChannelQueue';

export default async function (job: IConnectToChannelQueue) {
  const { guildId } = job.data;

  const guild = DiscordClient.guilds.cache.get(guildId);
  const channel = GetMostMembersChannel.call(guild);
  const currentConnection = getVoiceConnection(guildId);

  if (
    guild &&
    channel &&
    channel.id !== currentConnection?.joinConfig.channelId
  ) {
    const connection = joinVoiceChannel({
      guildId: guildId,
      channelId: channel?.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
  }

  ConnectToChannelQueue.add({ guildId }, { delay: 1000 });
}
