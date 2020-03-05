import cron from 'node-cron';

export default class Cron {  
  constructor (schedule) {
    if(typeof(schedule) !== 'object') {
      this.syntax = this.buildCronSyntax({});
    } else {
      this.syntax = this.buildCronSyntax(schedule);
    }
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
    cron.schedule(this.syntax, func);
  }
}