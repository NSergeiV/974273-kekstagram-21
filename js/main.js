'use strict';

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
