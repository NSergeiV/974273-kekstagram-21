'use strict';

// Раздел валидации хэш-тегов и коминтов попапа при редактировании фото.

(function () {
  window.hashtagFoImage.addEventListener('input', function (evt) {
    let input = evt.target;
    let arr2 = input.value.split('#');

    // Перебираем и ищим заданный элемент
    let countingSymbols = function (symbol) {
      return input.value.match(symbol);
    };

    // Создаем массив и разделяем на хеш-теги для проверки валидации
    let shortArrayHashtags = function (shortHashTag) {

      let re = shortHashTag;
      let option = true;

      for (let b = 1; b < arr2.length; b++) {
        let elem = arr2[b];
        if (!elem.match(re)) {
          option = false;
        }
      }
      return option;
    };

    let spaceInHashtags = function (space) {
      let re = space;
      let option = true;
      for (let b = 1; b < arr2.length; b++) {
        let elem = arr2[b];
        if (re.test(elem)) {
          option = false;
        }
      }
      return option;
    };

    // Проверяет в массиве каждый хеш-тег на максимальное количество символов

    let longArrayHashtags = function (longHashTag) {
      let value = true;
      for (let b = 1; b < arr2.length; b++) {
        let elem = arr2[b].replace(/\s/g, '');
        let arrSplit = elem.split('');
        if (longHashTag < arrSplit.length) {
          value = false;
        }
      }
      return value;
    };

    // Это поиск похожих хеш-тегов
    let cloneArrayHashtags = function () {
      let option = true;
      for (let c = 1; c < arr2.length; c++) {
        let re = /([A-Za-zА-ЯЁа-яё0-9_]+)\s/;
        let element1 = arr2[c].replace(re, '$1');
        for (let d = c + 1; d < arr2.length; d++) {
          let ree = /([A-Za-zА-ЯЁа-яё0-9_]+)\s?/;
          let element2 = arr2[d].replace(ree, '$1');
          if (element1.toLowerCase() === element2.toLowerCase()) {
            option = false;
          }
        }
      }

      return option;
    };

    if (!input.value.match(/^#[A-Za-zА-ЯЁа-яё0-9_]+/g)) {
      input.setCustomValidity('В начале хеш-тега должна стаять - # или не хватает символа');
    } else {
      if (countingSymbols(/#/g).length === 1) {
        if (!input.value.match(/^#/g)) {
          input.setCustomValidity('В начале хеш-тега должно стаять - #');
        } else if (!input.value.match(/^#[A-Za-zА-ЯЁа-яё0-9_]+/g)) {
          input.setCustomValidity('Хеш-тег меньше двух символов');
        } else if (input.value.match(/[A-Za-zА-ЯЁа-яё0-9_]+\s[A-Za-zА-ЯЁа-яё0-9_]+/g)) {
          input.setCustomValidity('Хеш-тег не может содержать пробелов');
        } else if (countingSymbols(/[A-Za-zА-ЯЁа-яё0-9_]/g).length > 20) {
          input.setCustomValidity('Хеш-тег не может быть длиннее 20 символов.');
        } else {
          input.setCustomValidity('');
        }
      } else {
        if (input.value.match(/##/g)) {
          input.setCustomValidity('Разделите ##');
        } else if (input.value.match(/[A-Za-zА-ЯЁа-яё0-9_]+#/g)) {
          input.setCustomValidity('Хеш-теги не разделены пробелами');
        } else if (countingSymbols(/#/g).length > 5) {
          input.setCustomValidity('Хеш-тегов не может быть больше пяти.');
        } else if (shortArrayHashtags(/([A-Za-zА-ЯЁа-яё0-9_]+)/g) === false) {
          input.setCustomValidity('Хеш-тег не может состоять из одной #');
        } else if (spaceInHashtags(/(\s[A-Za-zА-ЯЁа-яё0-9_])(?:\s$)?/g) === false) {
          input.setCustomValidity('В хеш-теге пробел недопустим.');
        } else if (longArrayHashtags(19) === false) {
          input.setCustomValidity('Хеш-тег не может состоять больше 20 символов.');
        } else if (cloneArrayHashtags() === false) {
          input.setCustomValidity('У Вас одинаковые хеш-теги.');
        } else {
          input.setCustomValidity('');
        }
      }
    }
  });

  // Проверка ввода в поле комментарии

  window.commentFoImage.addEventListener('input', function (evt) {
    let input = evt.target;
    let lengthComment = input.value.split('');
    if (lengthComment.length > 140) {
      input.setCustomValidity('Комментарии не может состоять больше 140 символов.');
    } else {
      input.setCustomValidity('');
    }
  });

})();
