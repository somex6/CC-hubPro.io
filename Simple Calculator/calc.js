const calculator = {
    displayValue: '0',
    firstInput: null,
    SecondInput: false,
    operator: null,
  };
  
function inputDigit(digit) {
    const { displayValue, SecondInput } = calculator;
  
    if (SecondInput === true) {
      calculator.displayValue = digit;
      calculator.SecondInput = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  
    console.log(calculator);
  }
  

  function inputDecimal(dot) {
    if (calculator.SecondInput === true) {
        calculator.displayValue = '0.'
      calculator.SecondInput = false;
      return
    }

    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
    console.log(calculator);

  }

  function handleOperator(nextOperator) {
    const { firstInput, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
  
    if (firstInput == null && !isNaN(inputValue)) {
      calculator.firstInput = inputValue;
  
    } else if (operator) {
  
      const result = calculate(firstInput, inputValue, operator);
      calculator.displayValue = String(result);
       calculator.firstInput = result;
  
    }
  
  
    calculator.SecondInput = true;
    calculator.operator = nextOperator;
    console.log(calculator);
  }
  

function calculate(firstInput, secondInput, operator) {
    if (operator === '+') {
      return firstInput + secondInput;
    } else if (operator === '-') {
      return firstInput - secondInput;
    } else if (operator === '*') {
      return firstInput * secondInput;
    } else if (operator === '/') {
      return firstInput / secondInput;
    }
    return secondInput;
  }

  //to perform a reset function
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstInput = null;
    calculator.SecondInput = false;
    calculator.operator = null;
    console.log(calculator);
  }
  
  //to display the inputs on the calculator-screen
  function updateDisp() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;  // updates the value of the contents in displayValue
  }
  updateDisp();

  //using an event listener on the keys
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;

//using the switch statement for the keys
  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      resetCalculator();
      break;
    default:
      // check if the key is an integer
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisp();
});
