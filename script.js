window.addEventListener('DOMContentLoaded', () => {
  let calculator = document.querySelector('.calculator');
  let display = document.querySelector('.calculator__display');
  let keys = calculator.querySelector('.calculator__keys');

  keys.addEventListener('click', (e) => {
    let key = e.target;
    let action = key.dataset.action;
    let keyContent = key.textContent;
    let displayedNum = display.textContent;
    let previousKeyType = calculator.dataset.previousKeyType;
    if(!action) {
      if(displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate') {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = 'number';
    }

    if(
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      if(firstValue && operator && previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate') {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }
      key.classList.add('is-depressed');
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.operator = action;
    }

    if(action === 'decimal') {
      if(!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
      } else if(previousKeyType === 'operator' ||
        previousKeyType === 'calculate') {
          display.textContent = '0';
      }
      calculator.dataset.previousKeyType = 'decimal';
    }

    if(action != 'clear') {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = 'CE';
    }

    if(action === 'clear') {
      if(key.textContent === 'AC') {
        calculator.dataset.firstValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.secondValue = '';
        calculator.dataset.previousKeyType = '';
      } else {
          key.textContent = 'AC';
      }
      display.textContent = '0';
      calculator.dataset.previousKeyType = 'clear';
    }

    if(action === 'calculate') {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      if(firstValue) {
        if(previousKeyType === 'calculate') {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = 'calculate';
    }

    Array.from(key.parentNode.children)
      .forEach(item => item.classList.remove('is-depressed'));


  });

  const calculate = (n1, operator, n2) => {
    let firstValue = parseFloat(n1);
    let secondValue = parseFloat(n2);
    if(operator === 'add') return firstValue + secondValue;
    if(operator === 'subtract') return firstValue - secondValue;
    if(operator === 'multiply') return firstValue * secondValue;
    if(operator === 'divide') return firstValue / secondValue;
  }

});






















