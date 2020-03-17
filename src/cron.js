import cron from 'node-cron';

const reminder_param = {
  sec: 0,
  min: 0,
  hour: 19,
  week: 'Fri'
};

const notifier_param = {
  sec: 0,
  min: 0,
  hour: 21,
  week: 'Sat'
};

export default class Cron {  
  constructor (client, schedule) {
    this.client = client;

    if(typeof(schedule) !== 'object') {
      this.syntax = this.buildCronSyntax({});
    } else {
      this.syntax = this.buildCronSyntax(schedule);
    }

    const channel = this.client.getChannel('一般');
    this.schedule(reminder_param, () => {
      channel.send(`@everyone 明日はモチ会の日です${this.client.mochiEmoji}`);
    });

    this.schedule(notifier_param, () => {
      channel.send(`@everyone このあと22時から、モチ会があります${this.client.mochiEmoji}`);
    });
  }

  buildCronSyntax (arg) {
    let ary = [];
    ary[0] = arg.sec   || '*';
    if(arg.sec === 0) {
      ary[0] = '0';
    }

    ary[1] = arg.min   || '*';
    if(arg.min === 0) {
      ary[1] = '0';
    }

    ary[2] = arg.hour  || '*';
    if(arg.hour === 0) {
      ary[2] = '0';
    }

    ary[3] = arg.day   || '*';
    ary[4] = arg.month || '*';
    ary[5] = arg.week  || '*';
    if(arg.week === 0) {
      ary[5] = '0';
    }

    return ary.join(' ');
  }

  schedule (schedule, func) {
    if(schedule) {
      this.syntax = this.buildCronSyntax(schedule);
    }
    cron.schedule(this.syntax, func, { 
      scheduled: true, timezone: 'Asia/Tokyo' 
    });
  }
}