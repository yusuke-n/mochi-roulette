import Cron from '../src/cron';
import Client from '../src/client';

let cron;

beforeEach(() => {
  const client = new Client();
  cron = new Cron(client);
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

