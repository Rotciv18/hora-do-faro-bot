import IConnectToChannelQueue from '../interfaces/IConnectToChannelQueue';
import DiscordClient from '../../DiscordClient';
import GetMostMembersChannel from '../services/channels/GetMostMembersChannel';
import {
  joinVoiceChannel,
  getVoiceConnection,
  VoiceConnection,
} from '@discordjs/voice';

import ConnectToChannelQueue from '../queues/ConnectToChannelQueue';
import { VoiceChannel } from 'discord.js';

export default async function (job: IConnectToChannelQueue) {
  const { guildId } = job.data;

  const guild = DiscordClient.guilds.cache.get(guildId);
  if (!guild) {
    return;
  }
  const channel = GetMostMembersChannel.call(guild);
  const currentConnection = getVoiceConnection(guildId);

  if (
    guild &&
    channel &&
    channel.id !== currentConnection?.joinConfig.channelId
  ) {
    joinVoiceChannel({
      guildId: guildId,
      channelId: channel?.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
  } else if (currentConnection?.joinConfig.channelId) {
    const myChannel: VoiceChannel | any = guild?.channels.cache.get(
      currentConnection?.joinConfig.channelId
    );

    if (myChannel?.members.size <= 1) {
      currentConnection.disconnect();
    }
  }

  ConnectToChannelQueue.add({ guildId }, { delay: 1000 });
}
