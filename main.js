const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const botFunctions = require('./botFunctions.js');
const request = require('request-promise');

const settings = JSON.parse(fs.readFileSync("settings/settings.json", "utf-8"));
const jokes = fs.readFileSync("./jokes.txt", "utf-8");
const jokesList = jokes.split ("\n");


var jokeLetter = 0;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
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
  else if (msg.content.slice(0,2) === "gg") {
    let options = 'https://www.reddit.com/r/osugame/hot.json?limit=10';
    request(options, function(err, res, body){
      if (err) {
        msg.reply('There was an error!');
      }
      else {
        fs.writeFileSync("./data.json", body);
        var threadData = JSON.parse(fs.readFileSync("./data.json","utf-8")).data.children[msg.content.slice(2)];
        //console.log(threadData.data.children[0].data.link_url);
        msg.reply(threadData.data.url);
      }
    })

  }

});

client.login(settings.discordToken);