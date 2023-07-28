const inputDisplay = document.getElementById('input-display');
let displayValue = '0';
let firstOperand = null;
let operator = null;
let decimalAdded = false;

function updateDisplay() {
    inputDisplay.textContent = displayValue;
}

function Clear() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    decimalAdded = false;
    updateDisplay();
}

function Del() {
    displayValue = (displayValue.length == 1) ? '0' : displayValue.slice(0, displayValue.length-1);
    firstOperand = null;
    operator = null;
    decimalAdded = false;
    updateDisplay();
}

function displayNumber(number) {
    if (displayValue === '0' || displayValue === 'Error') {
        displayValue = number;
    } else {
        displayValue += number;
    }
    updateDisplay();
}

function displayDecimal() {
    if (!decimalAdded) {
        displayValue += '.';
        decimalAdded = true;
    }
}

function displayOperator(op) {
    if (operator === null) {
        firstOperand = parseFloat(displayValue);
        operator = op;
        displayValue = '0';
        decimalAdded = false;
    }
}

function Operate(operator, a, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                return 'Format Error';
            }
            return a / b;
    }
}

function Calculate() {
    if (operator !== null) {
        const secondOperand = parseFloat(displayValue);
        displayValue = Operate(operator, firstOperand, secondOperand).toString();
        operator = null;
        firstOperand = parseFloat(displayValue);
        decimalAdded = false;
        updateDisplay();
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        if (!isNaN(key)) {
            displayNumber(key);
        } else if (key === '.') {
            displayDecimal();
        } else {
            displayOperator(key);
        }
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        Calculate();
    } else if (key === 'Escape') {
        event.preventDefault();
        ClearDisplay();
    }
});

updateDisplay();