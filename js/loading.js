'use strict';

// Раздел загрузки файла-фото, открытие, закрытие попап формы редоктирования фото и отправка данных на сервер

(function () {
  let uploadFile = document.querySelector('#upload-file');
  let imgUploadOverlay = document.querySelector('.img-upload__overlay');
  let buttonCancelPopapImgUpload = imgUploadOverlay.querySelector('#upload-cancel');
  let hashtagFoImage = document.querySelector('input[name="hashtags"]');
  let commentFoImage = document.querySelector('textarea[name="description"]');
  let form = document.querySelector('#upload-select-image');

  window.hashtagFoImage = hashtagFoImage;
  window.commentFoImage = commentFoImage;
  window.imgUploadOverlay = imgUploadOverlay;

  let onPopapImgUploadEscClose = function (evt) {
    if (evt.keyCode === window.KODE_ESC) {
      if (hashtagFoImage === document.activeElement) {
        hashtagFoImage.style.outlineColor = 'red';
      } else {
        if (commentFoImage === document.activeElement) {
          commentFoImage.style.outlineColor = 'red';
        } else {
          evt.preventDefault();
          closePopapImgUpload();
        }
      }
    }
  };

  let onInputColorReset = function () {
    if (hashtagFoImage !== document.activeElement) {
      hashtagFoImage.style.outlineColor = 'highlight';
    }
    if (commentFoImage !== document.activeElement) {
      commentFoImage.style.outlineColor = 'highlight';
    }
  };

  let openPopapImgUpload = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onPopapImgUploadEscClose);
    document.addEventListener('click', onInputColorReset);
    window.effectLevel.classList.add('hidden');
    window.effectLevelPin.style.left = 100 + '%';
    window.effectLevelDepth.style.width = 100 + '%';
    document.querySelector('input[name="scale"]').value = '100%';
    window.SCALE_FOTO = 1;
    window.imgUploadPreview.querySelector('img').style.transform = 'scale(' + window.SCALE_FOTO + ')';
  };

  let closePopapImgUpload = function () {
    imgUploadOverlay.classList.add('hidden');
    form.reset();
    window.imgUploadPreview.querySelector('img').classList.remove(window.className);
    window.imgUploadPreview.querySelector('img').style.filter = '';
    document.body.classList.remove('modal-open');
    document.querySelector('input[name="filename"]').value = null;
    document.removeEventListener('keydown', onPopapImgUploadEscClose);
    document.removeEventListener('click', onInputColorReset);
  };

  window.closePopapImgUpload = closePopapImgUpload;

  uploadFile.addEventListener('change', function () {
    openPopapImgUpload();
  });

  buttonCancelPopapImgUpload.addEventListener('click', function () {
    closePopapImgUpload();
  });

  // Отправка формы на сервер

  let errorHandler = function () {
    window.closePopapImgUpload();
    window.popapTemplate('#error', '.error', '.error__button');
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      closePopapImgUpload();
      window.popapTemplate('#success', '.success', '.success__button');
    }, errorHandler);
  });
})();
