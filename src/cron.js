import cron from 'node-cron';
import Moment from 'moment';

const every_min = {
  sec: 0,
};

export const reminder_param = process.env.NODE_ENV === 'production' ? 
  {
    sec: 0,
    min: 0,
    hour: 19,
    week: 'Sat'
  } : every_min; 
  

export const notifier_param = process.env.NODE_ENV === 'production' ? 
  {
    sec: 0,
    min: 0,
    hour: 21,
    week: 'Sun'
  } : every_min;

/**
* 次回の開催予定を解決して返す
*/
export function getNextSchedule () {
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

export class Cron {  
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
    cron.schedule(this.syntax, func, { 
      scheduled: true, timezone: 'Asia/Tokyo' 
    });
  }
}