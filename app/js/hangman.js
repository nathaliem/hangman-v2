'use strict';

const { answer, drawing, keyboard } = require('./modules');
const { modal } = require('./utils');

const Hangman = (() => {
    const $score = document.querySelector('.score');
    let score = 0;
    let winModal;
    let gameOverModal;

    const _handleStart = () => {
        answer.init();
        drawing.init();
        keyboard.init();
    }

    const _initModals = () => {
        _initWinModal();
        _initGameOverModal();
    }

    const _initWinModal = () => {
        winModal = modal.getModal();

        winModal.opts.onOpen = () => {
            _startNewGame();
            setTimeout(() => {
                winModal.close();
            }, 1000);
        }
        winModal.setContent('<h1>You got it!</h1><p>Next game starting...</p>');
    }

    const _initGameOverModal = () => {
        gameOverModal = modal.getModal();

        gameOverModal.opts.onOpen = () => {
            _endGame();
            setTimeout(() => {
                gameOverModal.close();
            }, 2000);
        }
        gameOverModal.setContent('<h1>I\'m sorry, but it\'s over :(</h1><p>A new session will be starting...</p>');
    }

    const _addEventListeners = () => {
        document.addEventListener('win', () => {
            winModal.open();
        });
        document.addEventListener('gameOver', () => {
            gameOverModal.open();
        });
    }

    const _startNewGame = () => {
        _handleStart();
        _updateScore();
    }

    const _endGame = () => {
        //alert('Helaas!');
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
            _initModals();
            _handleStart();
            _addEventListeners();
        }
    }
})();

module.exports = Hangman;