import Client from '../src/client';
import Moment from 'moment';

let client;

beforeEach (() => {
  client = new Client();
});

test ('getUsersAndShuffle', () => {

});

test ('getNextSchedule', () => {
  const now = Moment();
  let sat;
  let result = client.getNextSchedule();
  if (now.hour() >= 22) {
    sat = Moment().day(6+7);
  } else {
    sat = Moment().day(6);
  }
  expect(result.month()).toBe(sat.month());
  expect(result.date()).toBe(sat.date());
  expect(result.day()).toBe(6);
  expect(result.hour()).toBe(22);
  expect(result.minute()).toBe(0);
});