'use strict';

const { answer, drawing, keyboard } = require('./modules');
const { modal, store } = require('./utils');

const Hangman = (() => {
    const $score = document.querySelector('.score'),
        $categoryChange = document.querySelector('.category__change');
    let score = 0;
    let winModal;
    let gameOverModal;
    let chooseCategoryModal;

    const _handleStart = () => {
        answer.init();
        drawing.init();
        keyboard.init();
    }

    const _initModals = () => {
        _initWinModal();
        _initGameOverModal();
        _initChooseCategoryModal();
    }

    const _initWinModal = () => {
        winModal = modal.getModal('win');
        winModal.opts.onOpen = () => {
            _startNewGame();
            setTimeout(() => {
                winModal.close();
            }, 1000);
        }
        winModal.setContent('<h1>You got it!</h1><p>Next game starting...</p>');
    }

    const _initGameOverModal = () => {
        gameOverModal = modal.getModal('lose');
        gameOverModal.opts.onOpen = () => {
            _endGame();
            setTimeout(() => {
                gameOverModal.close();
            }, 2000);
        }
        gameOverModal.setContent('<h1>I\'m sorry, but it\'s over :(</h1><p>A new session will be starting...</p>');
    }

    const _initChooseCategoryModal = () => {
        let categories = store.getCategories();
        let options = '';
        categories.forEach(cat => {
            options += `<option value="${cat.id}">${cat.name}</option>`;
        });

        chooseCategoryModal = modal.getActionModal('category');

        chooseCategoryModal.setContent(
            `<p>Warning: This will start a new game!</p>
            <select class="modal__select">
                <option value="" selected>Random (default)</option>
                ${options}
            </select>`
        );

        chooseCategoryModal.addFooterBtn('Cancel', 'tingle-btn tingle-btn--secondary', function() {
            chooseCategoryModal.close();
        });

        chooseCategoryModal.addFooterBtn('Save', 'tingle-btn tingle-btn--primary', function() {
            const $selectCategory = document.querySelector('.modal__select option:checked');

            if ($selectCategory.value !== '') {
                let newCategory = {
                    id: $selectCategory.value,
                    name: $selectCategory.text
                }
                answer.setCategory(newCategory);
                answer.setGameMode('category');
            } else {
                answer.setGameMode('random');
            }
            _endGame();
            chooseCategoryModal.close();
        });
    }

    const _addEventListeners = () => {
        document.addEventListener('win', () => {
            winModal.open();
        });
        document.addEventListener('gameOver', () => {
            gameOverModal.open();
        });
        
        $categoryChange.addEventListener('click', () => {
            chooseCategoryModal.open();
        });
    }

    const _startNewGame = () => {
        _handleStart();
        _updateScore();
    }

    const _endGame = () => {
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