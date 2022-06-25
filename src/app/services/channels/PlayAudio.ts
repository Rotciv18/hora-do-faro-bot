import { GuildBasedChannel } from 'discord.js';

import {
  joinVoiceChannel,
  createAudioResource,
  createAudioPlayer,
  AudioPlayerStatus,
} from '@discordjs/voice';

class PlayAudio {
  async call(channel: GuildBasedChannel, audioDirectory: string) {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guildId,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    const resource = createAudioResource(audioDirectory, {
      inlineVolume: true,
    });
    resource.volume?.setVolume(1.5);
    const player = createAudioPlayer();
    connection.subscribe(player);

    player.play(resource);

    player.once(AudioPlayerStatus.Idle, async (state) => {
      connection.disconnect();
    });
  }
}

export default new PlayAudio();
