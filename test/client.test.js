import { Client } from '../src/client';
import Moment from 'moment';

let client;

beforeEach (() => {
  client = new Client();
});

test ('getNextSchedule', () => {
  const now = Moment();
  let sun;
  let result = client.getNextSchedule();
  if (now.hour() >= 22) {
    sun = Moment().day(7+7);
  } else {
    sun = Moment().day(7);
  }
  expect(result.month()).toBe(sun.month());
  expect(result.date()).toBe(sun.date());
  expect(result.day()).toBe(0);
  expect(result.hour()).toBe(22);
  expect(result.minute()).toBe(0);
});