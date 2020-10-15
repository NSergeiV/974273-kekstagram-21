'use strict';

// Выводим 1 фото из галлереии на экран в большом формате

(function () {
  const KODE_ESC = 27;
  window.KODE_ESC = KODE_ESC;

  let bigPicture = document.querySelector('.big-picture');
  let bigPictureImg = bigPicture.querySelector('.big-picture__img');
  let likesCount = bigPicture.querySelector('.likes-count');
  let commentsCount = bigPicture.querySelector('.comments-count');
  let socialComments = bigPicture.querySelector('.social__comments');
  let socialCommentCount = bigPicture.querySelector('.social__comment-count');
  let commentsLoader = bigPicture.querySelector('.comments-loader');
  let socialCaption = bigPicture.querySelector('.social__caption');
  let picturesBlock = document.querySelector('.pictures');
  let pictures = picturesBlock.querySelectorAll('.picture');

  socialCaption.textContent = window.photos[0].description;
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  likesCount.textContent = window.photos[0].likes;
  commentsCount.textContent = window.photos[0].comments;

  // Делегирование фото при всплытии на большой формат

  let onImageChangeClic = function (evt) {
    if (evt.target && evt.target.matches('img[class="picture__img"]')) {
      bigPicture.classList.remove('hidden');
      bigPictureImg.querySelector('img').src = evt.target.src;
    }
  };

  picturesBlock.addEventListener('click', onImageChangeClic);

  // Добавляем фото на большой формат с помощью клавы Enter

  let onImageChangeEnt = function (evt) {
    if (evt.keyCode === 13) {
      for (let i = 0; i < pictures.length; i++) {
        let picture = pictures[i];
        if (picture === document.activeElement) {
          bigPicture.classList.remove('hidden');
          bigPictureImg.querySelector('img').src = picture.querySelector('img').src;
          break;
        }
      }
    }

  };

  picturesBlock.addEventListener('keydown', onImageChangeEnt);

  // Копируем блок с коментариями для фото

  let socialCommentItem = socialComments.querySelector('.social__comment').cloneNode(true);

  // Удаляем старые коминты к фото

  let children = socialComments.children;

  for (let i = children.length - 1; i >= 0; i--) {
    var child = children[i];

    child.parentElement.removeChild(child);
  }

  // Множим блоки с коминтами в зависимости от их количества

  for (let i = 0; i < window.photos[0].comments; i++) {
    let socialCommentItemDubl = socialCommentItem.cloneNode(true);
    socialCommentItemDubl.querySelector('img').src = window.photosComments[0][i].avatar;
    socialCommentItemDubl.querySelector('img').alt = window.photosComments[0][i].name;
    socialCommentItemDubl.querySelector('p').textContent = window.photosComments[0][i].text;

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

})();
