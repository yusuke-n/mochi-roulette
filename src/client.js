import Discord from 'discord.js';
import { shuffleArray } from './util';
import Moment from 'moment';

export class Client {
  constructor (token) {
    this.token = token;
    this.client = new Discord.Client();
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
    });
    this.registerHandlers();
  }

  /**
   * Discord.Clientインスタンスを返す
   */
  get discordClient () {
    return this.client;
  }

  /**
   * Emoji :mochi: を返す
   * クライアントが :mochi: を使用できない場合は、文字列':mochi:' を返す
   */
  get mochiEmoji () {
    return this.client.emojis.cache.find(emoji => emoji.name === 'mochi') || ':mochi:';
  }

  async getChannel (id) {
    await this.client.channels.fetch(id);
    return this.client.channels.cache.get(id);
  }

  login (token) {
    this.token = token;
    return new Promise((resolve, reject) => {
      this.client.login(this.token).then(resolve).catch(reject);
    });
  }
  
  /**
   * Discord.Client.onハンドラを登録する
   */
  registerHandlers () {
    this.client.on('message', (msg) => {
      switch (msg.content) {
        case '!mochi':
        case '!roulette':
          let msg_list = this.getUsersAndShuffle(msg.channel);
          msg_list.push(`have a good ${this.mochiEmoji}!`);
          this.sendMessage(msg.channel, msg_list);
          break;
        case '!next':
          const format = this.getNextSchedule().format('MM/DD(ddd) HH:mm');
          let next_msg = `次回開催は ${format} です${this.mochiEmoji}`;
          this.sendMessage(msg.channel, next_msg);
          break;
      }
    });
  }

  /**
   * 指定チャンネルにメッセージを送信する
   * @param {*} ch 
   * @param {*} content 
   */
  sendMessage (ch, content) {
    ch.send(content);
  }

  /**
   * 指定チャンネルにいるbotでないオンラインユーザの一覧をシャッフルして返す
   * @param {*} channel 
   */
  getUsersAndShuffle (channel) {
    const cache = channel.members;
    const nonbotUsers = 
      cache.filter(el => !el.user.bot).filter(el => el.presence.status === 'online');
            
    return shuffleArray(
      nonbotUsers.map(el => `* ${el.user.username}#${el.user.discriminator}`)
    );
  }

  /**
   * 次回の開催予定を解決して返す
   */
  getNextSchedule () {
    const now = Moment();
    let next = Moment().day(7);

    if(now.day() === 0 && now.hour() >= 22) {
      next = Moment().day(7+7);
    }

    return Moment({
      month: next.month(),
      date: next.date(),
      hour: 22,
      minute: 0,
    });
  }
}