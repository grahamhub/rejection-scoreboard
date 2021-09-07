import Discord from 'discord.js';
import Messenger from './messenger.js';
import dotenv from 'dotenv';
dotenv.config();

export default class Client extends Discord.Client {
  constructor() {
    super({
      intents: [
        Discord.Intents.FLAGS.GUILD_MESSAGES,
      ]
    });
    this.messenger = new Messenger();
    this.readyState = false;
    this.on('ready', this.setState);
  }

  static shouldHandle(message) {
    return (
      message.channel.id === process.env.CHANNEL &&
      message.content.startsWith('!')
    );
  }

  static buildCommand(content) {
    const contArr = content.split(' ');

    const command = contArr.shift().slice(1);
    const args = [...contArr];

    return {
      command,
      args,
    };
  }

  async bindChannel(channelId = process.env.CHANNEL) {
    const channel = await this.channels.fetch(String(channelId));
    this.messenger.setChannel(channel);
  }

  async setState() {
    await this.bindChannel();
    this.readyState = true;
  }

  static parseCommand(message) {
    if (Client.shouldHandle(message)) {
      console.log('user:', message.member.id);
      return Client.buildCommand(message.content);
    }

    return null;
  }
}
