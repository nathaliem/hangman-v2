'use strict';

const answer = require('../answer/answer');
const drawing = require('../drawing/drawing');

const Keyboard = (() => {
    const $keyboard = document.querySelector('.keyboard');
    let $keys;

    let gameOverEvent = new Event('gameOver');

    const _createKeyboard = () => {
        $keyboard.innerHTML = '';

        for (let i = 65; i < 91; i++) {
            $keyboard.innerHTML +=
                `<div class="key" data-letter="${String.fromCharCode(i)}">
                    <span>${String.fromCharCode(i)}</span>
                </div>`;
        }

        $keys = $keyboard.querySelectorAll('.key');
        _addClickHandlers();
        _addKeyHandlers();
    }

    const _addClickHandlers = () => {
        for (let i = 0; i < $keys.length; i++) {
            $keys[i].addEventListener('click', _guessLetter);
        }
    }

    const _addKeyHandlers = () => {
        document.addEventListener('keyup', _guessLetter);
    }

    const _removeEventListeners = () => {
        for (let i = 0; i < $keys.length; i++) {
            $keys[i].removeEventListener('click', _guessLetter);
        }
        document.removeEventListener('keyup', _guessLetter);
    } 

    const _guessLetter = e => {
        let letter;
        let $pressedKey = e.target;
        
        if (e.keyCode > 64 && e.keyCode < 91) {
            letter = String.fromCharCode(e.keyCode);
            $pressedKey = document.querySelector(`.key[data-letter="${letter}"]`);
        } else if (e.keyCode) {
            return;
        } else {
            letter = e.target.getAttribute('data-letter');
        }

        if (!answer.guessLetter(letter) && !drawing.isFinished()) {
            drawing.revealNext();
            if (drawing.isFinished()) {
                document.dispatchEvent(gameOverEvent);
                _removeEventListeners();
            }
        }
        _disableKey($pressedKey);
    }

    const _disableKey = $key => {
        $key.classList.add('key--disabled');
        $key.removeEventListener('click', _guessLetter);
    }

    return {
        init: () => {
            _createKeyboard();
        }
    }
})();

module.exports = Keyboard;