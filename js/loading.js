'use strict';

// Раздел загрузки файла-фото, открытие, закрытие попап формы редоктирования фото.

(function () {
  let uploadFile = document.querySelector('#upload-file');
  let imgUploadOverlay = document.querySelector('.img-upload__overlay');
  let buttonCancelPopapImgUpload = imgUploadOverlay.querySelector('#upload-cancel');
  let hashtagFoImage = document.querySelector('input[name="hashtags"]');
  let commentFoImage = document.querySelector('textarea[name="description"]');

  window.hashtagFoImage = hashtagFoImage;
  window.commentFoImage = commentFoImage;
  window.imgUploadOverlay = imgUploadOverlay;

  let onPopapImgUploadEscClose = function (evt) {
    if (evt.keyCode === window.KODE_ESC) {
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

})();
