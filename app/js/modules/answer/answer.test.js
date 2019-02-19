let answer = require('./answer');

const $data = `<div class="category"></div>
                <div class="answer"></div>
                <div class="keyboard"></div>`;

test('get new random word', () => {
    let firstWord, secondWord;

    document.body.innerHTML = $data;
    $answer = document.querySelector('.answer');

    answer.getNewWord();
    answer.reveal();
    firstWord = $answer.innerText;

    answer.getNewWord();
    answer.reveal();
    secondWord = $answer.innerText;

    expect(firstWord).not.toBe(secondWord);
});

test('word is obfuscated', () => {
    let obfuscated;

    document.body.innerHTML = $data;
    $answer = document.querySelector('.answer');

    answer.setNewWord('GOD OF WAR');

    obfuscated = $answer.innerText;

    expect(obfuscated).toBe('___ __ ___');
});

test('word is correctly updated', () => {
    let word;

    document.body.innerHTML = $data;
    $answer = document.querySelector('.answer');

    answer.setNewWord('GOD OF WAR');
    answer.guessLetter('O');

    word = $answer.innerText;

    expect(word).toBe('_O_ O_ ___');
});