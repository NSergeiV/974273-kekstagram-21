'use strict';

// Выбор эффекта и изменени уровня эффекта

(function () {

  let effectsList = document.querySelector('.effects__list');
  let imgUploadPreview = window.imgUploadOverlay.querySelector('.img-upload__preview');
  let effectLevel = window.imgUploadOverlay.querySelector('.effect-level');
  let arrayClass = [{nameKl: 'effects__preview--chrome', effectLevel: 'grayscale', calculated: 1 / 100, unit: ''},
    {nameKl: 'effects__preview--sepia', effectLevel: 'sepia', calculated: 1 / 100, unit: ''},
    {nameKl: 'effects__preview--marvin', effectLevel: 'invert', calculated: 100 / 100, unit: '%'},
    {nameKl: 'effects__preview--phobos', effectLevel: 'blur', calculated: 3 / 100, unit: 'px'},
    {nameKl: 'effects__preview--heat', effectLevel: 'brightness', calculated: 2 / 100, unit: ''}];
  effectLevel.classList.add('hidden');
  let className;
  let seqrchCopy = function (copyClassName) {
    let searchItem = arrayClass.find(function (textClass) {
      return textClass.nameKl === copyClassName;
    });
    return searchItem;
  };
  let onEffectChange = function (evt) {
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      imgUploadPreview.querySelector('img').classList.remove(className);
      imgUploadPreview.querySelector('img').classList.add('effects__preview--' + evt.target.value);
      className = 'effects__preview--' + evt.target.value;
      if (evt.target.value === 'none') {
        effectLevel.classList.add('hidden');
        imgUploadPreview.querySelector('img').style.filter = '';
      } else {
        effectLevel.classList.remove('hidden');
        imgUploadPreview.querySelector('img').style.filter = '';
      }
    }
  };

  effectsList.addEventListener('change', onEffectChange);

  // Редактируем выбранную фотографию, добавляем эффекты

  let effectLevelPin = window.imgUploadOverlay.querySelector('.effect-level__pin');
  let effectLevelLine = document.querySelector('.effect-level__line');
  const PROCENT_LENGTH = 4.55;

  effectLevelPin.addEventListener('mouseup', function (evt) {
    let positionPin = Math.floor(evt.clientX + 9);
    let positionStartPin = Math.floor(effectLevelLine.getBoundingClientRect().left);
    let distanceTraveledPin = positionPin - positionStartPin;
    let distanceProcent = Math.floor(distanceTraveledPin / PROCENT_LENGTH);
    if (className === 'effects__preview--heat') {
      imgUploadPreview.querySelector('img').style.filter = seqrchCopy(className).effectLevel + '(' + ((seqrchCopy(className).calculated * distanceProcent) + 1) + seqrchCopy(className).unit + ')';
    } else {
      imgUploadPreview.querySelector('img').style.filter = seqrchCopy(className).effectLevel + '(' + (seqrchCopy(className).calculated * distanceProcent) + seqrchCopy(className).unit + ')';
    }
  });

})();
