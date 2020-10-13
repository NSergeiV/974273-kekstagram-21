'use strict';

const KODE_ESC = 27;

let comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
let namesAvatars = ['Артем', 'Василий', 'Николай', 'Александор', 'Олег', 'Тимофовей'];
let similarWizardTemplate = document.querySelector('#picture').content.querySelector('.picture');
let setupPictureList = document.querySelector('.pictures');

// Рондомная функция

let generateNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
let photos = [];

// Функция создания массивов со случайными числами без повторяющихся чисел

let creationArray = function (numberLength, numberMax) {
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

// Создаем массивы для фото и комментариев

let imageNumbers = creationArray(25, 26);

// это для комментариев, функция и массив к каждому фото

let makingListComments = function () {
  let photoComments = creationArray(generateNumber(1, 6), 7);
  let newphotoComments = [];
  for (let i = 0; i < photoComments.length; i++) {
    newphotoComments[i] = {text: comments[photoComments[i] - 1], avatar: 'img/avatar-' + generateNumber(1, 7) + '.svg', name: namesAvatars[generateNumber(0, 6)]};
  }
  return newphotoComments;
};

let photosComments = [];

for (let i = 0; i < 25; i++) {
  photosComments[i] = makingListComments();
}

// Конец создания

for (let i = 0; i < 25; i++) {
  photos[i] = {url: 'photos/' + imageNumbers[i] + '.jpg', description: 'none', likes: generateNumber(15, 201), comments: photosComments[i].length};
}

// Создание DOM элемента и наполнение блока DOM элементами.

let creatingPhotoBlock = function (photo) {
  let photoElement = similarWizardTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments;

  return photoElement;
};

let creatingGroupPictures = function (collection) {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < collection.length; i++) {
    fragment.appendChild(creatingPhotoBlock(collection[i]));
  }
  return fragment;
};

setupPictureList.appendChild(creatingGroupPictures(photos));

// Конец создания DOM

// Выводим 1 фото на экран в большом формате

let bigPicture = document.querySelector('.big-picture');
let bigPictureImg = bigPicture.querySelector('.big-picture__img');
let likesCount = bigPicture.querySelector('.likes-count');
let commentsCount = bigPicture.querySelector('.comments-count');
let socialComments = bigPicture.querySelector('.social__comments');
let socialCommentCount = bigPicture.querySelector('.social__comment-count');
let commentsLoader = bigPicture.querySelector('.comments-loader');
let socialCaption = bigPicture.querySelector('.social__caption');

document.body.classList.add('modal-open');
socialCaption.textContent = photos[0].description;
socialCommentCount.classList.add('hidden');
commentsLoader.classList.add('hidden');
bigPicture.classList.remove('hidden');
bigPictureImg.querySelector('img').src = photos[0].url;
likesCount.textContent = photos[0].likes;
commentsCount.textContent = photos[0].comments;

// Копируем блок с коментариями для фото

let socialCommentItem = socialComments.querySelector('.social__comment').cloneNode(true);

// Удаляем старые коминты к фото

let children = socialComments.children;

for (let i = children.length - 1; i >= 0; i--) {
  var child = children[i];

  child.parentElement.removeChild(child);
}

// Множим блоки с коминтами в зависимости от их количество

for (let i = 0; i < photos[0].comments; i++) {
  let socialCommentItemDubl = socialCommentItem.cloneNode(true);
  socialCommentItemDubl.querySelector('img').src = photosComments[0][i].avatar;
  socialCommentItemDubl.querySelector('img').alt = photosComments[0][i].name;
  socialCommentItemDubl.querySelector('p').textContent = photosComments[0][i].text;

  socialComments.appendChild(socialCommentItemDubl);
}

// Закрытие попап увеличенного просмотра изображения

let buttonBigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

let closePopapBigPicture = function () {
  bigPicture.classList.add('hidden');
};

buttonBigPictureCancel.addEventListener('click', function () {
  closePopapBigPicture();
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KODE_ESC) {
    closePopapBigPicture();
  }
});

// КОНЕЦ

// Раздел загрузки файла-фото, открытия, редактирования, закрытия попап формы редоктирования фото.

let uploadFile = document.querySelector('#upload-file');
let imgUploadOverlay = document.querySelector('.img-upload__overlay');
let buttonCancelPopapImgUpload = imgUploadOverlay.querySelector('#upload-cancel');
let hashtagFoImage = document.querySelector('input[name="hashtags"]');
let commentFoImage = document.querySelector('textarea[name="description"]');

let onPopapImgUploadEscClose = function (evt) {
  if (evt.keyCode === KODE_ESC) {
    if (hashtagFoImage !== document.activeElement) {
      if (commentFoImage !== document.activeElement) {
        evt.preventDefault();
        closePopapImgUpload();
      }
    }
  }
};

let openPopapImgUpload = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopapImgUploadEscClose);
};

let closePopapImgUpload = function () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.querySelector('input[name="filename"]').value = null;
  document.removeEventListener('keydown', onPopapImgUploadEscClose);
};

uploadFile.addEventListener('change', function () {
  openPopapImgUpload();
});

buttonCancelPopapImgUpload.addEventListener('click', function () {
  closePopapImgUpload();
});

// Делегирование - выбор эффекта для фото.

let effectsList = document.querySelector('.effects__list');
// let effectInputs = effectsList.querySelectorAll('input[type="radio"]');
let imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
let effectLevel = imgUploadOverlay.querySelector('.effect-level');
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

let effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
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

// Раздел валидации хэш-тегов и коминтов попапа при редактировании фото.

hashtagFoImage.addEventListener('input', function (evt) {
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

commentFoImage.addEventListener('input', function (evt) {
  let input = evt.target;
  let lengthComment = input.value.split('');
  if (lengthComment.length > 140) {
    input.setCustomValidity('Комментарии не может состоять больше 140 символов.');
  } else {
    input.setCustomValidity('');
  }
});
