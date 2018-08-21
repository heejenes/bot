const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const botFunctions = require('./botFunctions.js');

const settings = JSON.parse(fs.readFileSync("settings/settings.json", "utf-8"));
const jokes = fs.readFileSync("./jokes.txt", "utf-8");
const jokesList = jokes.split ("\n");

const dir = 'https://www.reddit.com/r/osugame/hot.json?limit=';
var size = 10
var options = dir + size.toString();

var jokeLetter = 0;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  botFunctions.getThreads(options);
});

client.on('message', msg => {
  if (msg.content.slice(0,2) === '==') {//math
    msg.reply(msg.content.slice(2) + " = " + botFunctions.basicMath(msg.content));
  }
  else if (msg.content === '!joke') {//joke
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

  //data.children.data.link_url
  else if (msg.content.slice(0,2) === "`r") {
    let ind = msg.content.slice(2);
    if (msg.content.slice(0,4) === '`rs=') {//command to set size
      let newSize = parseInt(msg.content.slice(4));
        if (!isNaN(newSize) && newSize < 31 && newSize > 0) {//if it isn't NaN, set size
          size = newSize;
          options = dir + size.toString();
          msg.reply("Set size to " + size);
          botFunctions.getThreads(options);
        }
        else {
          msg.reply("Please enter an integer between 0 and 30");
        }
    }
    else if (ind > size | ind < 1) {//if out of range
      msg.reply("Out of range! Use command `rs=num to increase range.");
    }
    else if (!isNaN(ind)) {//if in range, get data
      var threadData = JSON.parse(fs.readFileSync("./data.json","utf-8")).data.children[ind];
      //console.log(threadData.data.children[0].data.link_url);
      msg.reply(threadData.data.url);
    }
    else { msg.reply('Please enter a valid command.');}

  }

});

client.login(settings.discordToken);