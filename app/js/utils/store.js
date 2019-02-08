'use strict';

const firebase = require('firebase');
const { firebaseSettings } = require('../config');

const Store = (() => {
    firebase.initializeApp(firebaseSettings);
    const db = firebase.firestore();

    return {
        getCategories: () => {},
        getWords: () => {
            console.log('get words');
            let words = [];
            return db.collection('answers').get()
                .then((snapshot) => {
                    snapshot.forEach((answer) => {
                        words.push(answer.data().word);
                    });
                    return words;
                });
        }
    }
})();

module.exports = Store;