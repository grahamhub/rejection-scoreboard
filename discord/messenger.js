import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export default class Messenger {
  setChannel(channel) {
    this.channel = channel;
  }

  sendHelp() {
    const help = `Command structure:
- !rejection

It's really that simple. No wonder you got rejected...`;

    this.channel.send(help);
  }

  static async getGif() {
    const url = `https://api.tenor.com/v1/search?q=nice,wow,great&key=${process.env.TENOR_KEY}&limit=50`;
    const response = await fetch(url);
    const result = await response.json();
    return result.results[Math.floor(Math.random() * result.results.length)].url;
  }

  async sendResponse() {
    const gif = await Messenger.getGif();

    this.send(gif);
  }

  async sendScores(scores) {
    let msg = 'Scoreboard:\n'

    Object.keys(scores).forEach(k => {
      msg += '<@' + k + '>: ' + scores[k] + '\n';
    });

    this.send(msg);
  }

  send(msg) {
    this.channel.send(msg);
  }
}
