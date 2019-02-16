'use strict';

const categoryData = require('../../assets/categories.json');
const answerData = require('../../assets/answers.json');

const Store = (() => {
    return {
        getCategories: () => {
            let categories = [];
            categoryData.categories.forEach(category => categories.push({
                id: category.id,
                name: category.name
            }));

            return categories;
        },
        getWordsByCategoryId: categoryId => {
            let words = [];
            
            answerData.answers.forEach(answer => {
                if (answer.categoryId === parseInt(categoryId, 10)) {
                    words.push(answer.name);
                }
            });

            return words;
        }
    }
})();

module.exports = Store;