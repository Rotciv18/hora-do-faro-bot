import {
  VoiceConnection,
  createAudioResource,
  createAudioPlayer,
  AudioPlayerStatus,
} from '@discordjs/voice';

class PlayAudioService {
  call(connection: VoiceConnection, audioDirectory: string) {
    const resource = createAudioResource(audioDirectory, {
      inlineVolume: true,
    });
    resource.volume?.setVolume(1.5);
    const player = createAudioPlayer();
    connection.subscribe(player);

    player.play(resource);

    player.once(AudioPlayerStatus.Idle, (p) => {
      player.stop();
    });
  }
}

export default new PlayAudioService();
