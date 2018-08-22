const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const botFunctions = require('./botFunctions.js');

const settings = JSON.parse(fs.readFileSync('settings/settings.json', 'utf-8'));
//const save = JSON.parse(fs.readFileSync('./save.json', 'utf-8'));
const jokes = fs.readFileSync("./jokes.txt", "utf-8");
const jokesList = jokes.split ("\n");

//https://www.reddit.com/r/osugame/hot.json?limit=2
var options = botFunctions.getOptions();
/*var options = {
  dirA: 'https://www.reddit.com/r/',
  size: 10,
  subreddit: 'osugame',
  sort: 'hot'
};*/
//"stickied": bool
var dir = botFunctions.setUrl (options);
var numOfThreads;
var numOfSticky;
var jokeLetter = 0;

client.on('ready', () => {//on start
  console.log(`Logged in as ${client.user.tag}!`);

  botFunctions.getThreads(dir, a => {
    botFunctions.callbackFuck(fs.readFileSync("./data.json","utf-8"), data => {
      var threadData = data;
      numOfThreads = threadData.children.length;
      numOfSticky = botFunctions.getNumOfSticky(threadData);
    })
  });
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
  else if (msg.content.slice(0,2) === "`r") {//reddit scraper

    let ind = parseInt(msg.content.slice(2)) + numOfSticky;//save index

    if (msg.content.slice(0,5) === '`rsi=') {//command to set size
      let newSize = parseInt(msg.content.slice(5));

        if (!isNaN(newSize) && newSize < 31 && newSize > 0) {//if it isn't NaN, set size
          options.size = newSize;
          botFunctions.saveOptions(options);
          dir = botFunctions.setUrl(options);
          //options = dir + options.size.toString();
          msg.reply("Set size to " + options.size + " with " + numOfSticky + "sticky posts.");
          botFunctions.getThreads(dir);
          threadData = JSON.parse(fs.readFileSync("./data.json","utf-8")).data;
          numOfThreads = threadData.children.length;
        }

        else {//if NaN
          msg.reply("Please enter an integer between 0 and 30");
        }
    }
    else if (msg.content.slice(0,5) === '`rsu=') {
      //updating var dir
      let newSubreddit = msg.content.slice(5);
      options.subreddit = newSubreddit; //new value
      botFunctions.saveOptions(options);
      dir = botFunctions.setUrl(options); //setting var dir
      //getting sub count from new subreddit
      botFunctions.getThreads(options.dirA + options.subreddit + '/about.json', a => {
        botFunctions.callbackFuck(fs.readFileSync("./data.json","utf-8"), data => {
          msg.reply('Now getting r/' + options.subreddit + ': ' + data.subscribers.toString() + ' subscribers');//sending data
        })
      });//getting json
      //threadData = JSON.parse(fs.readFileSync("./data.json","utf-8")).data.subscribers;//reading json
      //updating data.json with new subreddit
      botFunctions.getThreads(dir, a => {
        botFunctions.callbackFuck(fs.readFileSync("./data.json","utf-8"), data => {
          threadData = data;
          numOfThreads = threadData.children.length;//updating thread count
          numOfSticky = botFunctions.getNumOfSticky(threadData);//updating sticky thread count
        })
      });//getting json
    }
    else if (msg.content.slice(0,5) === '`rso=') {
      let newSort = msg.content.slice(5);
      botFunctions.options.sort = newSort;
      botFunctions.saveOptions(options);
      dir = botFunctions.setUrl(options);
      msg.reply('Now getting ' + options.sort + ' in r/' + options.subreddit);
      botFunctions.getThreads(dir, a => {
        botFunctions.callbackFuck(fs.readFileSync("./data.json","utf-8"), data => {
          threadData = data;
          numOfThreads = threadData.children.length;//updating thread count
          numOfSticky = botFunctions.getNumOfSticky(threadData);//updating sticky thread count
        })
      });//getting json
    }

    else if (ind-1 > options.size | ind < 0) {//if out of range
      msg.reply("Out of range! Use command `rsi=num to increase range.");
    }

    else if (ind > numOfThreads) {
      console.log(`called for ${ind}, with ${numOfThreads} threads`)
      msg.reply("There are only " + (parseInt(numOfThreads)-1-parseInt(numOfSticky)) + " posts in this directory!");
    }

    else if (msg.content.slice(0,3) === "`rs") {//get stickied posts
      let i = parseInt(msg.content.slice(3));
      if (i < numOfSticky && i > -1) {
        threadData = JSON.parse(fs.readFileSync("./data.json","utf-8")).data;
        //numOfThreads = threadData.children.length;
        //console.log(threadData.data.children[0].data.link_url);
        msg.reply(threadData.children[i].data.url);
      }
      else { msg.reply('Out of range! There are ' + numOfSticky + ' sticky posts.'); }
    }

    else if (!isNaN(ind)) {//if in range, get data
      threadData = JSON.parse(fs.readFileSync("./data.json","utf-8")).data;
      //numOfThreads = threadData.children.length;
      //console.log(threadData.data.children[0].data.link_url);
      msg.reply(threadData.children[ind].data.url);
    }

    else { msg.reply('Please enter a valid command.');}

  }

});

client.login(settings.discordToken);