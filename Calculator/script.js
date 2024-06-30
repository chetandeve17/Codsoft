document.addEventListener('DOMContentLoaded', function () {
    const calculator = document.querySelector('.calculator');
    const keys = calculator.querySelector('.calculator-keys');
    const display = calculator.querySelector('.calculator-screen');
    let firstValue = '';
    let operator = '';
    let secondValue = '';
    let shouldResetScreen = false;

    keys.addEventListener('click', e => {
        if (!e.target.matches('button')) return;

        const key = e.target;
        const keyValue = key.value;

        if (key.classList.contains('operator')) {
            handleOperator(keyValue);
            return;
        }

        if (key.classList.contains('equal-sign')) {
            handleEqualSign();
            return;
        }

        if (key.classList.contains('all-clear')) {
            clearAll();
            return;
        }

        if (key.classList.contains('decimal')) {
            inputDecimal();
            return;
        }

        inputDigit(keyValue);
    });

    function handleOperator(nextOperator) {
        if (operator && shouldResetScreen) {
            operator = nextOperator;
            return;
        }

        if (firstValue === '') {
            firstValue = display.value;
        } else if (operator) {
            const result = calculate(firstValue, operator, display.value);
            display.value = result;
            firstValue = result;
        }

        shouldResetScreen = true;
        operator = nextOperator;
    }

    function handleEqualSign() {
        if (operator && shouldResetScreen) {
            const result = calculate(firstValue, operator, display.value);
            display.value = result;
            firstValue = result;
            operator = '';
            shouldResetScreen = false;
        }
    }

    function clearAll() {
        firstValue = '';
        operator = '';
        display.value = '';
        shouldResetScreen = false;
    }

    function inputDigit(digit) {
        if (display.value === '0' || shouldResetScreen) {
            display.value = digit;
            shouldResetScreen = false;
        } else {
            display.value += digit;
        }
    }

    function inputDecimal() {
        if (shouldResetScreen) {
            display.value = '0';
            shouldResetScreen = false;
        }

        if (!display.value.includes('.')) {
            display.value += '.';
        }
    }

    function calculate(first, operator, second) {
        first = parseFloat(first);
        second = parseFloat(second);

        if (operator === '+') return first + second;
        if (operator === '-') return first - second;
        if (operator === '*') return first * second;
        if (operator === '/') return first / second;
    }
});
