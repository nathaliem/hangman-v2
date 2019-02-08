const { answer, drawing, keyboard } = require('./modules');
const { store } = require('./utils');

const Hangman = (() => {
    //let words = store.getWords();

    return {
        startGame: () => {
            answer.init();
            keyboard.init();
            //store.getCategories();
        }
    }
})();

Hangman.startGame();