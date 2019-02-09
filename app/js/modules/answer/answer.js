'use strict';

const { $, store } = require('../../utils');

const Answer = (() => {
    let words = [],
        answer,
        word,
        $category = document.querySelector('.category'),
        $answer = document.querySelector('.answer');
    let winEvent = new Event('win');

    const _getNewWord = () => {
        //answer = 'GOD OF WAR';
        $category.innerText = 'Games';
        // store.getWords().then(function(response){
        //     words = response;
        //     answer = words[0].toUpperCase();
        //     word = _obfuscateAnswer();
        //     _updateWord();
        // });
        words = store.getWords();
        let randomNumber = $.getRandomNumber(words.length)
        console.log(words, words.length, randomNumber);
        answer = words[randomNumber].toUpperCase();
        console.log(answer);
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