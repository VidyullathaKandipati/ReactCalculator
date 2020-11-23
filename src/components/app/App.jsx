import React, { useState } from "react";
import { Key } from '../';
import './App.css';

const operatorMap = {
  add: '+',
  subtract: '-',
  multiply: 'x',
  divide: '÷',
  percent: '%',
  addMinus: '+/-',
  equal: '=',
  decimal: '.',
  clear: 'C',
};

const operate = (operator, value1, value2) => {
  const num1 = +value1;
  const num2 = +value2;

  switch (operator) {
    case operatorMap.add: return num1 + num2;
    case operatorMap.subtract: return num1 - num2;
    case operatorMap.multiply: return num1 * num2;
    case operatorMap.divide: return num1 / num2;
    case operatorMap.percent: return num1 / 100;
    default: return 0;
  }
};


const App = () => {
  const [number, setNumber] = useState(0);
  const [memory, setMemory] = useState(null);
  const [operator, setOperator] = useState(null);
  const [notes, setNotes] = useState('');

  // Sets the states with the provided values
  const setStates = ({ number, memory, operator, notes }) => {
    setNumber(number);
    setMemory(memory);
    setOperator(operator);
    setNotes(notes);
  };

  // Key press handler
  const onKeyPress = (value) => {
    const num = +number;

    // Clears all the values when 'C' is pressed
    if (value === operatorMap.clear) {
      setStates({ number: 0, memory: null, operator: null, notes: '' });
      return;
    }

    // Adds -ve sign when the '+/-' is pressed
    if (value === operatorMap.addMinus) {
      setNumber(num * -1);
      setNotes(notes + (num * -1));
      return;
    }

    // Show the value relative to 100%, when '%' is pressed
    if (value === operatorMap.percent) {
      let result = operate(value, num)
      setStates({ number: result, memory: null, operator: null, notes: '' });
      return;
    }

    // Add decimal point, when '.' is pressed
    if (value === operatorMap.decimal) {
      if (number && number.toString().includes('.')) return;
      setNumber(number + '.');
      setNotes(notes + '.');
      return;
    }

    // do nothing when repeatedly pressing '='
    if (value === operatorMap.equal && operator === operatorMap.equal) return;

    if (value === operatorMap.add || value === operatorMap.subtract || value === operatorMap.multiply || value === operatorMap.divide || value === operatorMap.equal) {
      const operation = value === operatorMap.equal ? operator : value;
      let result = num;

      // do not multiply or divide by 0
      if (num === 0 && (value === operatorMap.multiply || value === operatorMap.divide)) {
        result = memory;
      } else if (+memory !== 0) { // To avoid subtrating from 0
        result = operate(operation, memory, number);
      }

      const newNotes = value === operatorMap.equal ? notes + value + result : notes + value;
      setStates({ number: 0, memory: result, operator: operation, notes: newNotes });
      return;
    }

    // concatenate the new numbers to the old
    let newNumber = +(num + value).toString();
    if (number && number[number.length - 1] === operatorMap.decimal) {
      newNumber = number + value;
    }
    setNumber(newNumber);
    if (operator === operatorMap.equal) {
      // clear the previous notes
      setNotes(newNumber);
    } else {
      // append to the previous notes
      setNotes(notes + value);
    }
  };

  // display number or memory when showing a result
  const display = number || memory || 0;

  return (
    <div className="app">
      <div className="display-notes">{notes}</div>
      <div className="display">{display.toLocaleString()}</div>
      <div className="keys normal-screen">
        <Key onClick={onKeyPress} value={operatorMap.clear} type="function" />
        <Key onClick={onKeyPress} value={operatorMap.addMinus} type="function" />
        <Key onClick={onKeyPress} value={operatorMap.percent} type="function" />
        <Key onClick={onKeyPress} value={operatorMap.divide} type="operator" />
        <Key onClick={onKeyPress} value="7" />
        <Key onClick={onKeyPress} value="8" />
        <Key onClick={onKeyPress} value="9" />
        <Key onClick={onKeyPress} value={operatorMap.multiply} type="operator" />
        <Key onClick={onKeyPress} value="4" />
        <Key onClick={onKeyPress} value="5" />
        <Key onClick={onKeyPress} value="6" />
        <Key onClick={onKeyPress} value={operatorMap.subtract} type="operator" />
        <Key onClick={onKeyPress} value="1" />
        <Key onClick={onKeyPress} value="2" />
        <Key onClick={onKeyPress} value="3" />
        <Key onClick={onKeyPress} value={operatorMap.add} type="operator" />
        <Key onClick={onKeyPress} value="0" />
        <Key onClick={onKeyPress} value={operatorMap.decimal} />
        <Key onClick={onKeyPress} value={operatorMap.equal} type="operator" />
      </div>

      <div className="keys-bigger-screen">
        <Key value="(" type="not-supported" />
        <Key value=")" type="not-supported" />
        <Key value="mc" type="not-supported" />
        <Key value="m+" type="not-supported" />
        <Key value="m-" type="not-supported" />
        <Key value="mr" type="not-supported" />
        <Key onClick={onKeyPress} value={operatorMap.clear} type="function" />
        <Key onClick={onKeyPress} value={operatorMap.addMinus} type="function" />
        <Key onClick={onKeyPress} value={operatorMap.percent} type="function" />
        <Key onClick={onKeyPress} value={operatorMap.divide} type="operator" />
        <Key value={<span>2<sup>nd</sup></span>} type="not-supported" />
        <Key value="x&sup2;" type="not-supported" />
        <Key value="x&sup3;" type="not-supported" />
        <Key value={<span>x<sup>y</sup></span>} type="not-supported" />
        <Key value={<span>e<sup>x</sup></span>} type="not-supported" />
        <Key value={<span>10<sup>x</sup></span>} type="not-supported" />
        <Key onClick={onKeyPress} value="7" />
        <Key onClick={onKeyPress} value="8" />
        <Key onClick={onKeyPress} value="9" />
        <Key onClick={onKeyPress} value={operatorMap.multiply} type="operator" />
        <Key value="1&frasl;x" type="not-supported" />
        <Key value="2&radic;x" type="not-supported" />
        <Key value="3&radic;x" type="not-supported" />
        <Key value="y&radic;x" type="not-supported" />
        <Key value="ln" type="not-supported" />
        <Key value="log&#x2081;&#x2080;" type="not-supported" />
        <Key onClick={onKeyPress} value="4" />
        <Key onClick={onKeyPress} value="5" />
        <Key onClick={onKeyPress} value="6" />
        <Key onClick={onKeyPress} value={operatorMap.subtract} type="operator" />
        <Key value="x!" type="not-supported" />
        <Key value="sin" type="not-supported" />
        <Key value="cos" type="not-supported" />
        <Key value="tan" type="not-supported" />
        <Key value="e" type="not-supported" />
        <Key value="EE" type="not-supported" />
        <Key onClick={onKeyPress} value="1" />
        <Key onClick={onKeyPress} value="2" />
        <Key onClick={onKeyPress} value="3" />
        <Key onClick={onKeyPress} value={operatorMap.add} type="operator" />
        <Key value="Rad" type="not-supported" />
        <Key value="sinh" type="not-supported" />
        <Key value="cosh" type="not-supported" />
        <Key value="tanh" type="not-supported" />
        <Key value="&#960;" type="not-supported" />
        <Key value="Rand" type="not-supported" />
        <Key onClick={onKeyPress} value="0" />
        <Key onClick={onKeyPress} value={operatorMap.decimal} />
        <Key onClick={onKeyPress} value={operatorMap.equal} type="operator" />
      </div>
    </div>
  );
};

export default App;