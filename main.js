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
  if (msg.slice(0,2) === '==') {
    //determine where operator is
    for (var i = 2; i < msg.content.length; i++) {
      if (msg.content[i] === '+') {
        var index = i;
      }
      else if (msg.content[i] === '-') {
        var index = i;
      }
      else if (msg.content[i] === '*') {
        var index = i;
      }
      else if (msg.content[i] === '/') {
        var index = i;
      }
    }
    //create numbers
    var numA = parseFloat(msg.content.slice(2,index));
    var numB = parseFloat(msg.content.slice(index+1));
    //ensure that conversion worked
    if (numA != NaN & numB != NaN) {
      //carry out operation
      var answer;
      if (msg.content[index] === '+') {
        answer = numA + numB;
      }
      else if (msg.content[index] === '-') {
        answer = numA - numB;
      }
      else if (msg.content[index] === '*') {
        answer = numA * numB;
      }
      else if (msg.content[index] === '/') {
        answer = numA / numB;
      }
      //send message
      msg.reply(msg.content + " " + answer.toString());
    }
  }

  else if (msg.content === 'boob') {
    msg.reply('elbow');
  }
  else if (msg.content === 'elbow') {
    msg.reply('boob');
  }

  else if (msg.content === '!joke') {
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