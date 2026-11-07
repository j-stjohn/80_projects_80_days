// The program initializes the calculator and handles basic arithmetic operations.

const display = document.getElementById("calulatorOutput");
const buttons = document.querySelectorAll('button[name="buttons"]');

let currentValue = "0";
let savedValue = null;
let currentOperator = null;
let waitingForSecondValue = false;

function updateDisplay() {
    display.textContent = currentValue;
}

function clearCalculator() {
    currentValue = "0";
    savedValue = null;
    currentOperator = null;
    waitingForSecondValue = false;
    updateDisplay();
}

function performCalculation(firstValue, secondValue, operator) {
    switch (operator) {
        case "+":
            return firstValue + secondValue;
        case "-":
            return firstValue - secondValue;
        case "*":
            return firstValue * secondValue;
        case "/":
            return firstValue / secondValue;
        default:
            return secondValue;
    }
}

function handleNumberInput(number) {
    if (waitingForSecondValue) {
        currentValue = number;
        waitingForSecondValue = false;
    } else {
        currentValue = currentValue === "0" ? number : currentValue + number;
    }

    updateDisplay();
}

function handleDecimalInput() {
    if (waitingForSecondValue) {
        currentValue = "0.";
        waitingForSecondValue = false;
        updateDisplay();
        return;
    }

    if (!currentValue.includes(".")) {
        currentValue += ".";
        updateDisplay();
    }
}

function handleOperatorInput(operator) {
    const enteredValue = Number(currentValue);

    if (savedValue === null) {
        savedValue = enteredValue;
    } else if (currentOperator) {
        savedValue = performCalculation(savedValue, enteredValue, currentOperator);
        currentValue = String(savedValue);
    }

    currentOperator = operator;
    waitingForSecondValue = true;
    updateDisplay();
}

function handleEnterInput() {
    if (currentOperator && savedValue !== null) {
        const enteredValue = Number(currentValue);
        const result = performCalculation(savedValue, enteredValue, currentOperator);
        currentValue = String(result);
        savedValue = null;
        currentOperator = null;
        waitingForSecondValue = false;
        updateDisplay();
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.value;

        if (value === "C") {
            clearCalculator();
            return;
        }

        if (value === "Enter") {
            handleEnterInput();
            return;
        }

        if (["+", "-", "*", "/"].includes(value)) {
            handleOperatorInput(value);
            return;
        }

        if (value === ".") {
            handleDecimalInput();
            return;
        }

        handleNumberInput(value);
    });
});

updateDisplay();