'use strict';

const { store } = require('../../utils');

const Answer = (() => {
    let words = [],
        answer,
        word,
        $answer = document.querySelector('.answer');

    const _getNewWord = () => {
        //answer = 'GOD OF WAR';
        store.getWords().then(function(response){
            words = response;
            answer = words[0].toUpperCase();
            word = _obfuscateAnswer();
            _updateWord();
        });
    }

    const _obfuscateAnswer = () => {
        let wordArray = answer.split('');
        const obfuscated = wordArray.map(letter => (letter !== ' ') ? '_' : letter).join('');

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