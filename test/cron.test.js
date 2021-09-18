import { Cron, getNextSchedule } from '../src/cron';
import Moment from 'moment';

let cron;

beforeEach(() => {
  cron = new Cron();
});

test('build cron syntax', () => {
  const arg = {
    sec  : 0,
    min  : 1,
    hour : 2,
    day  : 3,
    month: 4,
    week : 'Fri'
  };
  const syntax = cron.buildCronSyntax(arg);
  expect(syntax).toBe('0 1 2 3 4 Fri');
});

test('"0" is valid parameter.', () => {
  const arg = {
    sec  : 0,
    min  : 0,
    hour : 0,
    day  : 1,
    month: 1,
    week : 0
  };
  const syntax = cron.buildCronSyntax(arg);
  expect(syntax).toBe('0 0 0 1 1 0');
});

test('optional parameters', () => {
  const arg = {};
  const syntax = cron.buildCronSyntax(arg);
  expect(syntax).toBe('* * * * * *');
});


test ('getNextSchedule', () => {
  const now = Moment();
  let sun;
  let result = getNextSchedule();
  if (now.hour() >= 21) {
    sun = Moment().day(7+7);
  } else {
    sun = Moment().day(7);
  }
  expect(result.month()).toBe(sun.month());
  expect(result.date()).toBe(sun.date());
  expect(result.day()).toBe(0);
  expect(result.hour()).toBe(21);
  expect(result.minute()).toBe(0);
});