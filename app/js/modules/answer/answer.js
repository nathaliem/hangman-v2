'use strict';

const { $, store } = require('../../utils');

const Answer = (() => {
    let words = [],
        answer,
        word,
        $category = document.querySelector('.category'),
        $answer = document.querySelector('.answer'),
        winEvent = new Event('win');

    const _getNewWord = () => {
        $category.innerText = 'Games';
        words = store.getWords();
        let randomNumber = $.getRandomNumber(words.length)

        answer = words[randomNumber].toUpperCase();
        word = _obfuscateAnswer();
        _updateWord();
    }

    const _obfuscateAnswer = () => {
        let wordArray = answer.split('');
        const obfuscated = wordArray.map(letter => {
            if (letter !== ' ' && letter !== ':' && letter !== '\'') {
                return '_';
            } else {
                return letter;
            }
        }).join('');
        
        return obfuscated;
    }

    const _updateLettersInWord = letter => {
        let answerArray = answer.split('');
        let wordArray = word.split('');
        let letterFound = false;

        for (let i = 0; i < wordArray.length; i++) {
            if (answerArray[i] === letter) {
                wordArray[i] = letter;
                letterFound = true;
            }
        }

        word = wordArray.join('');
        _updateWord();

        return letterFound;
    }

    const _updateWord = () => {
        $answer.innerText = word;

        if (_isAnswerGuessed()) {
            document.dispatchEvent(winEvent);
        } 
    }

    const _isAnswerGuessed = () => {
        if (word.indexOf('_') < 0) {
            return true;
        }
        return false;
    }

    return {
        init: () => {
            _getNewWord();
        },
        guessLetter: letter => {
            return _updateLettersInWord(letter);
        }
    }
})();

module.exports = Answer;