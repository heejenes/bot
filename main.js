const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

const settings = JSON.parse(fs.readFileSync("./settings/settings.json", "utf-8"));
const jokes = fs.readFileSync("./jokes.txt", "utf-8");
const jokesList = jokes.split ("\n");

var jokeLetter = 0;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

////////////////////functions//////////////////////////////
function basicMath (msg) {
    //determine where operators are
    var index = [];
    for (var i = 2; i < msg.length; i++) {
        if (msg[i] === '+') {
            index.push(i);
        }
        else if (msg[i] === '-') {
            index.push(i);
        }
        else if (msg[i] === '*') {
            index.push(i);
        }
        else if (msg[i] === '/') {
            index.push(i);
        }
        else if (msg[i] === '^') {
            index.push(i);
        }
    }
    console.log (`Found operators`);
    //create list of numbers
    var num = [];
    var noNaN = true;
    for (var i = 0; i < index.length+1; i++) {
        if (i === 0) { //for first number
            num.push(parseFloat(msg.slice(2,index[i])));
            console.log(`first Num ${msg.slice(2,index[i])}`);
        }
        else if (i === index.length) { //for last number
            num.push(parseFloat(msg.slice(index[i-1]+1)));
            console.log(`last num`);
        }
        else { //for inside numbers
            num.push(parseFloat(msg.slice(index[i-1]+1,index[i]))); 
            console.log(`inner Num`);
        }
        if (isNaN(num[num.length-1])) {
            noNaN = false;
            console.log (`Found NaN: ${num[num.length-1]}`);
            break;
        }
    }

    //ensure that conversion worked
    if (noNaN) {
        console.log (`No NaN. Numbers are ${num} and operators are ${index}`);
        //carry out operation

        //this loop will delete all items in index[] and all but one in num[]
        //the item left behind in num[] is the answer
        var tempLen = index.length;
        for (var a = 0; a < tempLen; a++) {
            i = getNextIndex(msg, index); //placeholder function. 
            console.log (`i equals ${i}`);
            //It should get the index of whatever operation is next (BEDMAS)

            if (msg[index[i]] === "/") {
                console.log(`dividing ${num.slice(i,i+2)}`);
                num[i] /= num[i+1];
            }
            else if (msg[index[i]] === "*") {
                console.log(`multiply ${num.slice(i,i+2)}`);
                num[i] *= num[i+1];
            }
            else if (msg[index[i]] === "+") {
                console.log(`adding ${num.slice(i,i+2)}`);
                num[i] += num[i+1];
            }
            else if (msg[index[i]] === "-") {
                console.log(`subtracting ${num.slice(i,i+2)}`);
                num[i] -= num[i+1];
            }
            else if (msg[index[i]] === "^") {
                console.log(`exponent ${num.slice(i,i+2)}`);
                num[i] **= num[i+1];
            }
            index.splice(i, 1); //del elements
            num.splice(i+1, 1);
            console.log (`Numbers are now ${num} and operators are ${index}`);
        }

        return num[0].toString();
    }
}
function getNextIndex (msg, operatorList) { 
    //This should get the index of whatever operation is next (BEDMAS)
    for (var i = 0; i < operatorList.length; i++) {
        console.log(`checking ${operatorList[i]}`);
        if (msg[operatorList[i]] === '^') {
            return i;
        }
        else if (msg[operatorList[i]] === '*' | msg[operatorList[i]] === '/') {
            return i;
        }
    }
    return 0;
}
////////////////////functions//////////////////////////////

client.on('message', msg => {
  if (msg.content.slice(0,2) === '==') {
    msg.reply(msg.content.slice(2) + " = " + basicMath(msg.content));
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

client.login(settings.discordToken);