'use strict';

const tingle = require('tingle.js');

const Modal = (function() {
    const _initModal = className => {
        let modal = new tingle.modal({
            footer: false,
            closeMethods: ['escape'],
            cssClass: [`modal--${className}`]
        });
        return modal;
    }

    return {
        getModal: className => {
            return _initModal(className);
        }
    }
})();

module.exports = Modal;