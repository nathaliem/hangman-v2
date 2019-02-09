'use strict';

const hangman = require('../../../assets/hangman.svg');
const vivus = require('vivus');

const Drawing = (() => {
    const $hangman = document.querySelector('.hangman');
    let $drawing;
    let $faces;
    let currentStep = 1;
    let maxSteps;
    let isFinished = false;
    let toAnimate;

    const _getSVGFile = () => {
        let req = new XMLHttpRequest();
        req.addEventListener('load', function() {
            $hangman.innerHTML = req.responseText;
            $drawing = document.querySelector('#drawing');
            $faces = document.querySelector('#faces');
            _countMaxSteps();
        });
        req.open('GET', hangman);
        req.send();
    }

    const _drawHangman = () => {
        let $currentPart,
            currentPartId;

        currentStep += 1;
        if (currentStep === maxSteps) {
            isFinished = true;
        }

        $currentPart = $drawing.querySelector(`[data-step="${currentStep}"]`);
        currentPartId = $currentPart.getAttribute('id');
        $currentPart.classList.remove('hidden');

        toAnimate = new vivus(currentPartId, { duration: 50, type: 'sync' }, () => {
            _drawFace();
        });
    }

    const _drawFace = () => {
        let $currentFace = $faces.querySelector('.show');

        $faces.querySelectorAll('g').forEach(face => {
            if (parseInt(face.getAttribute('data-step'), 10) === currentStep) {
                if ($currentFace) {
                    $currentFace.classList.remove('show');
                }
                face.classList.add('show');
            }
        });
    }

    const _countMaxSteps = () => {
        maxSteps = parseInt($drawing.querySelector('g:last-child').getAttribute('data-step'), 10);
    }

    return {
        init: () => {
           _getSVGFile();
           currentStep = 1;
        },
        revealNext: () => {
            _drawHangman();
        },
        isFinished: () => {
            return isFinished;
        }
    }
})();

module.exports = Drawing;