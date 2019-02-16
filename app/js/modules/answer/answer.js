'use strict';

const { $, store } = require('../../utils');

const Answer = (() => {
    let randomCategoryMode = true,
        words = [],
        answer,
        category,
        word,
        $category = document.querySelector('.category'),
        $answer = document.querySelector('.answer'),
        allowedCharacters = [' ', ':', '\'', '-', '.'],
        winEvent = new Event('win');

    const _getRandomCategory = () => {
        let categories = store.getCategories();
        let randomNumber = $.getRandomNumber(categories.length);

        category = categories[randomNumber];
    }

    const _setUpCategory = () => {
        $category.innerText = category.name;
    }

    const _getNewWord = () => {
        words = store.getWordsByCategoryId(category.id);
        let randomNumber = $.getRandomNumber(words.length);

        answer = words[randomNumber].toUpperCase();
        word = _obfuscateAnswer();
        _updateWord();
    }

    const _obfuscateAnswer = () => {
        let wordArray = answer.split('');
        const obfuscated = wordArray.map(letter => {
            if (allowedCharacters.indexOf(letter) === -1) {
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
            _revealWord();
            document.dispatchEvent(winEvent);
        } 
    }

    const _revealWord = () => {
        $answer.innerText = answer;
    }

    const _isAnswerGuessed = () => {
        if (word.indexOf('_') < 0) {
            return true;
        }
        return false;
    }

    return {
        init: () => {
            if (randomCategoryMode) {
                _getRandomCategory();
                _setUpCategory();
            }
            _getNewWord();
        },
        guessLetter: letter => {
            return _updateLettersInWord(letter);
        },
        reveal: () => {
            _revealWord();
        },
        setCategory: categoryObject => {
            category = categoryObject;
            _setUpCategory();
            randomCategoryMode = true;
        },
        setGameMode: mode => {
            randomCategoryMode = (mode === 'random' ? true : false);
        }
    }
})();

module.exports = Answer;