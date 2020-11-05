'use strict';

(function () {

  let generateNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  window.creationArray = function (numberLength, numberMax) {
    let arrayNew = [];
    while (arrayNew.length < numberLength) {
      let randomNumber = generateNumber(1, numberMax);
      let found = false;
      for (let i = 0; i < arrayNew.length; i++) {
        if (arrayNew[i] === randomNumber) {
          found = true;
          break;
        }
      }
      if (!found) {
        arrayNew[arrayNew.length] = randomNumber;
      }
    }
    return arrayNew;
  };
})();
