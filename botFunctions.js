/////////////////////////////////////////////////////////////////////////////////////////////////////////
const request = require('request-promise');
const fs = require('fs');

module.exports = {

    getThreads: function (options) {
        request(options, function(err, res, body){
            if (err) {
            msg.reply('There was an error!');
            }
            else {
            fs.writeFileSync("./data.json", body);
            console.log(`Got threads`);
            }
        })
    },

    basicMath: function (msg) {
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
};

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
//////////////
/*
function basicMath (msg) {
    //determine where operators are
    var index = [];//list of int, is index for msg
    var aBracIndex = [];//start brackets
    var bBracIndex = [];//end brackets
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
        else if (msg[i] === '(') {
            aBracIndex.push(i);
        } 
        else if (msg[i] === ')') {
            bBracIndex.push(i);
        }
    }
    console.log (`Found operators`);
    //create list of numbers
    var num = []; //list of floats
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
            i = getNextIndex(msg, index); 
            console.log (`i equals ${i}`);

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
}*/
