import Client from './client';
import Cron from './cron';

const client = new Client();
const token = process.env.DISCORD_TOKEN;

client.login(token).then(() => {
  const cron = new Cron(client);
});
