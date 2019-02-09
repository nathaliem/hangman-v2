'use strict';

const { answer, drawing, keyboard } = require('./modules');

const Hangman = (() => {
    const $score = document.querySelector('.score');
    let score = 0;

    const _handleStart = () => {
        answer.init();
        drawing.init();
        keyboard.init();
    }

    const _addEventListeners = () => {
        document.addEventListener('win', _startNewGame);
        document.addEventListener('gameOver', _endGame);
    }

    const _startNewGame = () => {
        alert('Proficiat!');
        _handleStart();
        _updateScore();
    }

    const _endGame = () => {
        alert('Helaas!');
        _handleStart();
        _resetScore();
    }

    const _updateScore = () => {
        $score.innerHTML = score += 1;
    }

    const _resetScore = () => {
        score = 0;
        $score.innerHTML = score;
    }

    return {
        startGame: () => {
            _handleStart();
            _addEventListeners();
        }
    }
})();

module.exports = Hangman;