const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

const jokes = fs.readFileSync("./jokes.txt", "utf-8");
const jokesList = jokes.split ("\n");

var jokeLetter = 0;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'boob') {
    msg.reply('elbow');
  }
  else if (msg.content === 'elbow') {
    msg.reply('boob');
  }

  if (msg.content === '!joke') {
    //random joke
    //msg.reply(jokesList[Math.floor(Math.random()*jokesList.length)]);
    //ur mom
    msg.reply(jokesList[jokeLetter]);
    jokeLetter += 1;
    if (jokeLetter >= jokesList.length) {
      jokeLetter = 0;
    }
  }
  else if (msg.content === "!joke reset") {
    jokeLetter = 0;
    msg.reply("Joke has been reset!");
  }
});

client.login("NDc2ODc1OTkxNDIwMTA4ODEx.Dk0e0A.PmgMWg9dmgTPXS9dDbh4tnpUtu8");