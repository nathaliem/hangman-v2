'use strict';

const answer = require('../answer/answer');

const Keyboard = (() => {
    const $keyboard = document.querySelector('.keyboard');
    let $keys;

    const _createKeyboard = () => {
        $keyboard.innerHTML = '';

        for (let i = 65; i < 91; i++) {
            $keyboard.innerHTML +=
                `<div class="key">
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
        //document.addEventListener('keyup', _handleKeyUp);
    }

    const _guessLetter = e => {
        if (!answer.guessLetter(e.target.innerText)) {
            //drawing.nextOneUp();
        }
       // e.target.disable();
    }

    // Object.prototype.disable = function() {
    //     this.classList.add('key--disabled');
    //     this.removeEventListener('click', _guessLetter);
    // };

    // Object.prototype.enable = function() {
    //     this.classList.remove('key--disabled');
    // }

    return {
        init: () => {
            _createKeyboard();
        }
    }
})();

module.exports = Keyboard;