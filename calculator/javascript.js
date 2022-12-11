let btn = document.getElementsByClassName('btn');
let displayElement = document.getElementsByClassName('input-display')[0];
let answer = document.getElementsByClassName('answer')[0];
let operatorArr = ['+', '-', '*', '/', '='];


// eventListener : WIill handle each inputevent and will pass on the btn-inputs to inputHandler()
// the returned value from inputHandler() will be passed to the display()

document.addEventListener('click', (e) => {
    let txt = e.target.innerText;
    if (e.target.classList.contains("btn")) {
        display(txt)
        displayElement.innerText = inputHandler(displayElement.innerText, txt) //store the returned value and pass on it to display() after handling the previous display
        answer.innerText = "";
        if (txt === "Del") {
            del();
        } else if (txt === "C") {
            erase();
        } else if (txt === "+" || txt === "-" || txt === "*" || txt === "/") {
            operators();
        } else if (txt === ".") {
            decimalPoint();
        } else if (txt === "=") {
            answerDisplay();
        }

        multipleZero();

    }

})
// inputHandler() : takes the currentDisplayText and matches with a valid arithmatic expression
// the matched values are then passed on to operation(num1, num2, opr)
// the returned value from operation() will be returned

function inputHandler(inputStr, txt) {

    if (operatorArr.indexOf(txt) < 0) return displayElement.innerText;
    inputStr = inputStr.slice(0, inputStr.length - 1);
    let matchedArr = [...inputStr.matchAll(/(-?\d*\.?[0-9]+)([\*\+\-\/])(\d*\.?[0-9]+)/g)];
    if (matchedArr.length === 0) return displayElement.innerText


    let num1 = Number(matchedArr[0][1]);
    let num2 = Number(matchedArr[0][3]);
    let opr = matchedArr[0][2];

    let calcValue = operation(num1, num2, opr);

    let str = calcValue.toString();
    if (str.includes(".")) {
        if (str.length >= "8") {


            calcValue = calcValue.toFixed(4);
            calcValue = parseFloat(calcValue);
        }
    }


    return calcValue + txt;


    //return something
}

//operation(num1, num2, opr) : checks whether opr is +,-,* or / and calls add(), subtract(), multiply() and divide()
//the returned value from computed result will be returned by operation

function operation(num1, num2, opr) {
    //return something
    if (opr === "+") {
        return add(num1, num2);
    } else if (opr === "-") {
        return subtract(num1, num2)
    } else if (opr === "*") {
        return multiply(num1, num2)
    } else(opr === "/")
    return divide(num1, num2);

}

function display(txt) {
    displayElement.innerText += txt;
}

// addition operation

function add(x, y) {
    return x + y;
}

// subtract operation

function subtract(x, y) {
    return x - y;
}

// multiply operation

function multiply(x, y) {
    return x * y;
}

// divide operation

function divide(x, y) {
    return x / y;
}

//delete function

function del() {
    displayElement.innerText = "";
    answer.innerText = "";

}

// last element erase

function erase() {
    let str = displayElement.innerText;
    let len = str.length;
    displayElement.innerText = str.slice(0, (len - 2));
}

// not printing multiple operators

function operators() {
    let strr = displayElement.innerText;
    let len = strr.length;
    let lastElement = strr.slice(-1);
    let secondLastElement = strr.slice(-2, -1);
    if (lastElement === secondLastElement) {

        displayElement.innerText = strr.slice(0, (len - 1));

    } else {

        if (secondLastElement === "+" || secondLastElement === "-" || secondLastElement === "*" || secondLastElement === "/") {
            displayElement.innerText = strr.slice(0, (len - 2)).concat(lastElement);
        }


    }
}

// no miltiple consecutive decimal points

function decimalPoint() {
    let strr = displayElement.innerText;
    let len = strr.length;
    let lastElement = strr.slice(-1);
    let secondLastElement = strr.slice(-2, -1);
    if (lastElement === "." && secondLastElement === ".") {

        displayElement.innerText = strr.slice(0, (len - 1));

    }
}

// not printing multiple zeros for the first no

function multipleZero() {
    let strr = displayElement.innerText;
    let len = strr.length;
    let firstElement = strr.slice(0, 1);
    let secondElement = strr.slice(1, 2);
    if (firstElement === "0" && secondElement === "0") {
        displayElement.innerText = strr.slice(1, len);
    }
}

// answer display

function answerDisplay() {
    let str = displayElement.innerText;
    let len = str.length;
    displayElement.innerText = str.slice(0, (len - 1));
    answer.innerText = inputHandler(displayElement.innerText);
    if (answer.innerText.length > 10) {
        answer.classList.add('answerLong');
        answer.classList.remove('answer');
    }


}