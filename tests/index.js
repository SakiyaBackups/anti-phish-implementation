const { Client } = require('discord.js'); //import client
const cl = new Client({ intents: ['GUILD_MESSAGES', 'GUILDS',] }); //create client, apparently w/o those intents, it wont work
const { Fish } = require('../lib/index'); //import fish

(new Fish(cl, { enabled: true })).init(); //create fish

cl.login('TOKEN'); //login