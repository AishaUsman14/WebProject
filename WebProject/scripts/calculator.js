function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    let result;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '÷':
        case '/':
            result = divide(a, b);
            break;
        case 'x':
        case '*':
            result = multiply(a, b);
            break;

        default:
            break;
    }
    return result;
}

const buttons = document.querySelectorAll('.buttons button');
const display = document.querySelector('.display p');
const functions = document.querySelectorAll('.function');

document.getElementById("cbtn").addEventListener('click', onclear);
document.getElementById("delbtn").addEventListener('click', ondelete);

let firstInput = "";
let secondInput = "";
let operator = "";
let values = "";
let deletable = true;

buttons.forEach(button => button.addEventListener('click', function () { oninput(button.textContent) }));
document.addEventListener('keyup', function (e) { oninput(e.key) });

function hasoperator() {
    return operator.includes('+') || operator.includes('/') || operator.includes('-') || operator.includes('*') || operator.includes('÷') || operator.includes('x');
}

function oninput(key) {
    switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            deletable = true;
            if (hasoperator()) {

                secondInput = secondInput.concat(key);
            } else {
                firstInput = firstInput.concat(key);
            }
            values = values.concat(key);
            display.textContent = values;

            break;
        case '+':
        case '-':
        case '*':
        case '÷':
        case '/':
        case 'x':
            if (hasoperator()) {
                let calc = operate(parseFloat(firstInput), parseFloat(secondInput), operator);
                operator = key;

                firstInput = calc.toString();
                secondInput = "";

                values = calc.toString();
                values = values.concat(operator);

                display.textContent = values;
                deletable = false;
            } else {
                operator = key.toString();
                values = values.concat(operator)
                display.textContent = values;
            }
            break;
        case '.':
            if (hasoperator()) {
                secondInput = secondInput.concat(key);
            } else {
                firstInput = firstInput.concat(key);
            }
            values = values.concat(key);
            display.textContent = values;
            break;
        case 'e':
        case '=':
            let calc = operate(parseFloat(firstInput), parseFloat(secondInput), operator);
            values = calc.toString();
            display.textContent = values;
            deletable = false;
            break;
        case 'Backspace':
            if (deletable) {
                if (hasoperator()) {
                    secondInput = secondInput.slice(0, -1);
                    values = firstInput.concat(operator).concat(secondInput);
                    display.textContent = values;
                } else {
                    firstInput = firstInput.slice(0, -1);
                    values = firstInput;
                    display.textContent = values;
                }
            }
            break;
        default:
            break;

    }
}

function onclear() {
    firstInput = "";
    secondInput = "";
    operator = "";
    values = "";
    deletable = true;
    display.textContent = '_';
}

function ondelete() {
    if (deletable) {
        if (operator.includes('+') || operator.includes('÷') || operator.includes('-') || operator.includes('×')) {
            secondInput = secondInput.slice(0, -1);
            values = firstInput.concat(operator).concat(secondInput);
        } else {
            firstInput = firstInput.slice(0, -1);
            values = firstInput;
        }
        if (values.length == 0) {
            display.textContent = '_';
        } else {
            display.textContent = values;
        }
    }
}