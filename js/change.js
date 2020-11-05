'use strict';

// Функция изменния эффекта фотографии

(function () {
  window.changingEffect = function (percent) {
    let arrayClass = [{nameKl: 'effects__preview--chrome', effectLevel: 'grayscale', calculated: 1 / 100, unit: ''},
      {nameKl: 'effects__preview--sepia', effectLevel: 'sepia', calculated: 1 / 100, unit: ''},
      {nameKl: 'effects__preview--marvin', effectLevel: 'invert', calculated: 100 / 100, unit: '%'},
      {nameKl: 'effects__preview--phobos', effectLevel: 'blur', calculated: 3 / 100, unit: 'px'},
      {nameKl: 'effects__preview--heat', effectLevel: 'brightness', calculated: 2 / 100, unit: ''}];

    let searchCopy = function (copyClassName) {
      return arrayClass.find(function (textClass) {
        return textClass.nameKl === copyClassName;
      });
    };

    document.querySelector('input[name="effect-level"]').value = percent;

    if (window.className === 'effects__preview--heat') {
      window.imgUploadPreview.querySelector('img').style.filter = searchCopy(window.className).effectLevel + '(' + ((searchCopy(window.className).calculated * percent) + 1) + searchCopy(window.className).unit + ')';
    } else {
      window.imgUploadPreview.querySelector('img').style.filter = searchCopy(window.className).effectLevel + '(' + (searchCopy(window.className).calculated * percent) + searchCopy(window.className).unit + ')';
    }
  };
})();
