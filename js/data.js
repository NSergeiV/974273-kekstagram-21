'use strict';

(function () {

  // Рандомная функция
  const generateNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Функция создания массивов со случайными числами без повторяющихся чисел
  window.creationArray = function (numberLength, numberMax) {
    let arrayNew = [];
    while (arrayNew.length < numberLength) {
      let randomNamber = generateNumber(1, numberMax);
      let found = false;
      for (let i = 0; i < arrayNew.length; i++) {
        if (arrayNew[i] === randomNamber) {
          found = true;
          break;
        }
      }
      if (!found) {
        arrayNew[arrayNew.length] = randomNamber;
      }
    }
    return arrayNew;
  };
})();
