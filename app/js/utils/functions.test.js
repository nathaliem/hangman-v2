const functions = require('./functions');

test('get random number', () => {
    let firstNumber = functions.getRandomNumber(10000);
    let secondNumber = functions.getRandomNumber(10000);

    expect(firstNumber).not.toBe(secondNumber);
  });