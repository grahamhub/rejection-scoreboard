import Client from './discord/client.js';
import Database from './db/db.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client();
const db = new Database();

client.on('message', async (message) => {
  const cmd = Client.parseCommand(message);

  if (!cmd) return;

  switch (cmd.command) {
    case 'helpme':
      client.messenger.sendHelp();
      break;
    case 'rejection':
      db.update(message.author.id);
      await client.messenger.sendResponse();
      break;
    case 'scores':
      // TODO
      client.messenger.sendScores(db.getScores());
      break;
    default:
      break;
  }
});

console.log(process.env.DISCORD_TOKEN);

client.login(process.env.DISCORD_TOKEN);