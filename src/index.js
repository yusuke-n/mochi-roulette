import { Client } from './client';
import { Cron, reminder_param, notifier_param } from './cron';

const client = new Client();
const token = process.env.DISCORD_TOKEN;

const cron = new Cron();

client.login(token).then(() => {
  const channel = client.getChannel('一般');

  cron.schedule(reminder_param, () => {
    channel.send(`@everyone 明日はモチ会の日です${client.mochiEmoji}`);
  });

  cron.schedule(notifier_param, () => {
    channel.send(`@everyone このあと22時から、モチ会があります${client.mochiEmoji}`);
  });
});