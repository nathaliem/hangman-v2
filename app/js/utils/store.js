'use strict';

const data = require('../../assets/answers.json');

const Store = (() => {
    return {
        getCategories: () => {},
        getWords: () => {
            let words = [];
            data.answers.forEach(answer => words.push(answer.name));

            return words;
        }
    }
})();

module.exports = Store;