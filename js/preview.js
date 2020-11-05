'use strict';

// Выводим 1 фото из галлереии на экран в большом формате

(function () {
  const KODE_ESC = 27;
  window.KODE_ESC = KODE_ESC;

  let bigPicture = document.querySelector('.big-picture');
  let bigPictureImg = bigPicture.querySelector('.big-picture__img');
  let socialComments = bigPicture.querySelector('.social__comments');
  let socialCommentCount = bigPicture.querySelector('.social__comment-count');
  let buttonCommentsLoader = bigPicture.querySelector('.social__comments-loader');
  let picturesBlock = document.querySelector('.pictures');
  let likesCount = bigPicture.querySelector('.likes-count');
  let socialHeader = bigPicture.querySelector('.social__header');
  let socialPicture = socialHeader.querySelector('.social__picture');
  let socialCaption = socialHeader.querySelector('.social__caption');
  window.picturesBlock = picturesBlock;

  let socialCommentItem = socialComments.querySelector('.social__comment').cloneNode(true);

  const clearComments = function () {
    let children = socialComments.children;
    for (let i = children.length - 1; i >= 0; i--) {
      var child = children[i];
      child.parentElement.removeChild(child);
    }
  };
  clearComments();

  let sourceComments = [];
  let sourceCommentsCopy = [];
  let modul = 0;
  const photoComments = function () {
    let bankComments = sourceCommentsCopy.splice(0, 5);

    modul = modul + bankComments.length;
    socialCommentCount.querySelector('.comments-count-here').textContent = modul;
    if (sourceCommentsCopy.length === 0) {
      buttonCommentsLoader.classList.add('hidden');
    }

    for (let i = 0; i < bankComments.length; i++) {
      let socialCommentItemDubl = socialCommentItem.cloneNode(true);
      socialCommentItemDubl.querySelector('img').src = bankComments[i].avatar;
      socialCommentItemDubl.querySelector('img').alt = bankComments[i].name;
      socialCommentItemDubl.querySelector('p').textContent = bankComments[i].message;

      socialComments.appendChild(socialCommentItemDubl);
    }
  };

  const copyingArray = function () {
    sourceCommentsCopy = sourceComments.slice();
    photoComments();
  };

  let openPopapBigPicture = function () {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    buttonBigPictureCancel.addEventListener('click', closePopapBigPicture);
    document.addEventListener('keydown', onPopapCloseESC);
    buttonCommentsLoader.addEventListener('click', photoComments);
  };

  const searchElement = function (selectDom) {
    let choice = null;
    choice = selectDom.src.match(/photos\/[0-9]+.jpg/g);
    window.endCollections.filter(function (element) {
      if (element.url === choice[0]) {
        socialCommentCount.querySelector('.comments-count').textContent = element.comments.length;
        likesCount.textContent = element.likes;
        socialPicture.src = element.url;
        socialCaption.textContent = element.description;
        sourceComments = element.comments;
        copyingArray();
      }
    });
  };

  let onImageChangeClic = function (evt) {
    if (evt.target && evt.target.matches('img[class="picture__img"]')) {
      openPopapBigPicture();
      bigPictureImg.querySelector('img').src = evt.target.src;
      searchElement(evt.target);
    }
  };

  let onImageChangeEnt = function (evt) {
    if (evt.keyCode === 13) {
      for (let i = 0; i < window.pictures.length; i++) {
        let picture = window.pictures[i];
        if (picture === document.activeElement) {
          openPopapBigPicture();
          bigPictureImg.querySelector('img').src = picture.querySelector('img').src;
          searchElement(picture.querySelector('img'));
          break;
        }
      }
    }
  };

  picturesBlock.addEventListener('keydown', onImageChangeEnt);
  picturesBlock.addEventListener('click', onImageChangeClic);

  let buttonBigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  let onPopapCloseESC = function (evt) {
    if (evt.keyCode === KODE_ESC) {
      closePopapBigPicture();
    }
  };

  let closePopapBigPicture = function () {
    bigPicture.classList.add('hidden');
    clearComments();
    modul = 0;
    buttonCommentsLoader.classList.remove('hidden');
    document.body.classList.remove('modal-open');
    buttonBigPictureCancel.removeEventListener('click', closePopapBigPicture);
    document.removeEventListener('keydown', onPopapCloseESC);
  };

})();
