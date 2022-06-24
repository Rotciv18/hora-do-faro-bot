import app from './DiscordApp';
import 'dotenv/config';

try {
  app.login(process.env.APPLICATION_TOKEN);
} catch (error) {
  console.log(error);
}