'use strict';

const tingle = require('tingle.js');

const Modal = (function() {
    const _initModal = () => {
        let modal = new tingle.modal({
            footer: true,
            closeMethods: ['enter', 'escape']
        });
        return modal;
    }

    return {
        getModal: () => {
            return _initModal();
        }
    }
})();

module.exports = Modal;