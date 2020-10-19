'use strict';

// Функция изменния эффекта фотографии

(function () {
  window.changingEffect = function (percent) {
    let arrayClass = [{nameKl: 'effects__preview--chrome', effectLevel: 'grayscale', calculated: 1 / 100, unit: ''},
      {nameKl: 'effects__preview--sepia', effectLevel: 'sepia', calculated: 1 / 100, unit: ''},
      {nameKl: 'effects__preview--marvin', effectLevel: 'invert', calculated: 100 / 100, unit: '%'},
      {nameKl: 'effects__preview--phobos', effectLevel: 'blur', calculated: 3 / 100, unit: 'px'},
      {nameKl: 'effects__preview--heat', effectLevel: 'brightness', calculated: 2 / 100, unit: ''}];

    let seqrchCopy = function (copyClassName) {
      let searchItem = arrayClass.find(function (textClass) {
        return textClass.nameKl === copyClassName;
      });
      return searchItem;
    };

    if (window.className === 'effects__preview--heat') {
      window.imgUploadPreview.querySelector('img').style.filter = seqrchCopy(window.className).effectLevel + '(' + ((seqrchCopy(window.className).calculated * percent) + 1) + seqrchCopy(window.className).unit + ')';
    } else {
      window.imgUploadPreview.querySelector('img').style.filter = seqrchCopy(window.className).effectLevel + '(' + (seqrchCopy(window.className).calculated * percent) + seqrchCopy(window.className).unit + ')';
    }
  };
})();
