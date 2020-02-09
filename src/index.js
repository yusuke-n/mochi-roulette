import Discord from 'discord.js';

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
        
    let messages = shuffle(
      nonbotUsers.map(el => `* ${el.user.username}#${el.user.discriminator}`)
    );
    messages.push('have a good :mochi:!');
    
    msg.channel.send(messages);
  }
});

client.login(token);
