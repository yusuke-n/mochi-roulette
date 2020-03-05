import Discord from 'discord.js';
import Cron from 'node-cron';

const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;

function shuffle (array) {
  for (let i=array.length-1; i>=0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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
          
    let messages = shuffle(
      nonbotUsers.map(el => `* ${el.user.username}#${el.user.discriminator}`)
    );
    messages.push(`have a good ${mochi}!`);
    
    msg.channel.send(messages);
  }
});


const schedule = '0 0 19 * * Fri'
Cron.schedule(schedule, () => {
  const channel = client.channels.find("name", "一般")
  const mochi = 
    client.emojis.find(emoji => emoji.name === 'mochi') || ':mochi:';
  channel.send(`@everyone 明日はモチ会の日です${mochi}`)
})

client.login(token);
