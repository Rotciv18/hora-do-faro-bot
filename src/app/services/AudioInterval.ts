import GuildAudioManager from './GuildAudioManager';

class SetAudioInterval {
  call() {
    setInterval(GuildAudioManager.playAudioOnGuilds, 5000);
  }
}

export default new SetAudioInterval();
