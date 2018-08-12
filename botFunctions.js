function basicMath (msg) {
    //determine where operators are
    var index = [];
    for (var i = 2; i < msg.length; i++) {
        if (msg[i] === '+') {
            index.append(i);
        }
        else if (msg[i] === '-') {
            index.append(i);
        }
        else if (msg[i] === '*') {
            index.append(i);
        }
        else if (msg[i] === '/') {
            index.append(i);
        }
    }
    console.log (`Found operators`);

    //create list of numbers
    var num = [];
    var noNaN = true;
    for (var i = 0; i < index.length+1; i++) {
        if (i === 0) { //for first number
            num.append(parseFloat(msg.slice(2,index[i])));
        }
        else if (i === index.length) { //for last number
            num.append(parseFloat(msg.slice(index[i])));
        }
        else { //for inside numbers
            num.append(parseFloat(msg.slice(index[i]+1,index[i+1]))); 
        }
        if (num[-1] === NaN) {
            noNaN = false;
            console.log (`Found NaN`);
            break;
        }
    }

    //ensure that conversion worked
    if (noNaN) {
        console.log (`No NaN`);
        //carry out operation

        //this loop will delete all items in index[] and all but one in num[]
        //the item left behind in num[] is the answer
        for (var _ = 0; _ < index.length; _++) {
            i = getNextIndex(index); //placeholder function. 
            //It should get the index of whatever operation is next (BEDMAS)

            if (msg[index[i]] === "/") {
                num[i] /= num[i+1];
            }
            else if (msg[index[i]] === "*") {
                num[i] *= num[i+1];
            }
            else if (msg[index[i]] === "+") {
                num[i] += num[i+1];
            }
            else if (msg[index[i]] === "-") {
                num[i] -= num[i+1];
            }
            index.splice(i, 1); //del elements
            num.splice(i+1, 1);
        }

        return num[0].toString();
    }
}
function getNextIndex (operatorList) { //It should get the index of whatever operation is next (BEDMAS)
    return 0;
}

