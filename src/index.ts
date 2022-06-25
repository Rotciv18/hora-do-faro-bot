import app from './DiscordApp';
import 'dotenv/config';
import {
  joinVoiceChannel,
  createAudioResource,
  createAudioPlayer,
} from '@discordjs/voice';

const channelId = '636930598631637002';
const guildId = '361276782135214080';

try {
  app.login(process.env.APPLICATION_TOKEN);

  app.once('ready', async (client) => {
    const guild = client.guilds.cache.get('361276782135214080');
    if (!guild) {
      return;
    }

    const connection = joinVoiceChannel({
      channelId,
      guildId,
      adapterCreator: guild.voiceAdapterCreator,
    });

    const resource = createAudioResource('../audios/tome.mp3');
    const player = createAudioPlayer();
    connection.subscribe(player);

    player.play(resource);
  });
} catch (error) {
  console.log(error);
}
