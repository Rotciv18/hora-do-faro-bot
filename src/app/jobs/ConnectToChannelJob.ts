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
import { DoneCallback } from 'bull';

export default async function (
  job: IConnectToChannelQueue,
  done: DoneCallback
) {
  const { guildId } = job.data;

  const guild = DiscordClient.guilds.cache.get(guildId);
  if (!guild) {
    done();
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

  await ConnectToChannelQueue.add({ guildId }, { delay: 1000 });
  done();
}
