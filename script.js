const numberButtons = document.querySelectorAll('.number-button');
const operationButtons = document.querySelectorAll('.operator-button');
const equalButton = document.querySelector('.equal-button');
const clearButton = document.querySelector('.clear-button');
const deleteButton = document.querySelector('.delete-button');

const previousOperandElement = document.querySelector('.previous-operator');
const currentOperandElement = document.querySelector('.current-operator');


class Calculator {
    constructor(previousOperandElement, currentOperandElement){
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;

        this.clear();
    }

    formatNumber(number) {
        const stringNumber = number.toString();

        const integerDigits = parseFloat(stringNumber.split(`.`)[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;

        if(isNaN(integerDigits)) {
            integerDisplay = '';
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits:0});
        }

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }else{
            return integerDisplay;
        }
    }


    appendNumber(number) {
        if (this.currentOperand.includes('.') && number == "."){
            return;
        }

        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    deleteNumber() {
      this.currentOperand = this.currentOperand.slice(0, -1);
      this.updateDisplay();
    }

    choosedOperator(operation) {
         if(this.currentOperand == ``) return;

        if (this.previousOperand != ``){
            this.calculate();
        }

        this.operation = operation;

        this.previousOperand =  `${this.currentOperand} ${operation}`;
        this.currentOperand = ""; 
        this.updateDisplay();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operations = '';
    }


    calculate() {
        let result;

        const _previousOperand = parseFloat(this.previousOperand);
        const _currentOperand = parseFloat(this.currentOperand);

        if (isNaN(_previousOperand) ||isNaN(_currentOperand)) return;

        switch (this.operation) {
            case '+':
                result = _previousOperand + _currentOperand;
                break
            case '-':
                result = _previousOperand - _currentOperand;
                break 
            case '*':
                result = _previousOperand * _currentOperand;
                break
            case '÷': 
                result = _previousOperand / _currentOperand;
                break
            default:
                return;

        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }


    updateDisplay() {
        this.previousOperandElement.innerText = `${this.previousOperand} `;
        this.currentOperandElement.innerText = this.formatNumber(this.currentOperand); 
    }

}

const calculator = new Calculator(previousOperandElement, currentOperandElement);

for (const numberButton of numberButtons) {
    numberButton.addEventListener('click', ()=> {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
}

for (const operationButton of operationButtons) {
    operationButton.addEventListener('click', ()=> {
        calculator.choosedOperator(operationButton.innerText);
        calculator.updateDisplay()
    });
}

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.deleteNumber();
    calculator.updateDisplay();
})

equalButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})