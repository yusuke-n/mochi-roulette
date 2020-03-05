import Discord from 'discord.js';

export default class Client {
  constructor (token) {
    this.client = new Discord.Client();
    this.token = token;
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
    });
  }

  discordClient () {
    return this.client;
  }

  login (token) {
    this.client.login(token || this.token);
  }

  onMessage (func) {
    this.client.on('message', func);
  }
}