import Client from './client';
import Cron from './cron';

const client = new Client();
const discordClient = client.discordClient;
const token = process.env.DISCORD_TOKEN;

const cron_param = {
  sec: 0,
  min: 0,
  hour: 19,
  week: 'Fri'
};

const cron = new Cron();
cron.schedule(cron_param, () => {
  const channel = discordClient.channels.find(ch => ch.name === '一般');
  const mochi = 
    discordClient.emojis.find(emoji => emoji.name === 'mochi') || ':mochi:';
  channel.send(`@everyone 明日はモチ会の日です${mochi}`);
});

client.login(token);
