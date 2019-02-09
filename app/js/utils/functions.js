'use strict';

const Functions = (() => {
    return {
        getRandomNumber(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
    }
})();

module.exports = Functions;