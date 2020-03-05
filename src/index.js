import Discord from 'discord.js';
import Cron from './cron';
import { shuffleArray } from './util';

const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;

const cron_param = {
  sec: 0,
  min: 0,
  our: 19,
  week: 'Fri'
};

const cron = new Cron();
cron.schedule(cron_param, () => {
  const channel = client.channels.find(ch => ch.name === '一般');
  const mochi = 
    client.emojis.find(emoji => emoji.name === 'mochi') || ':mochi:';
  channel.send(`@everyone 明日はモチ会の日です${mochi}`);
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content === '!mochi' || msg.content === '!roulette') {
    const nonbotUsers = 
      msg.channel.members
        .filter(el => !el.user.bot)
        .filter(el => el.presence.status === 'online');

    const mochi = 
      client.emojis.find(emoji => emoji.name === 'mochi') || ':mochi:';
          
    let messages = shuffleArray(
      nonbotUsers.map(el => `* ${el.user.username}#${el.user.discriminator}`)
    );
    messages.push(`have a good ${mochi}!`);
    
    msg.channel.send(messages);
  }
});

client.login(token);
