'use strict';

// Выбор эффекта и изменени уровня эффекта

(function () {

  let effectsList = document.querySelector('.effects__list');
  let imgUploadPreview = window.imgUploadOverlay.querySelector('.img-upload__preview');
  let effectLevel = window.imgUploadOverlay.querySelector('.effect-level');
  let effectLevelPin = document.querySelector('.effect-level__pin');
  let effectLevelLine = document.querySelector('.effect-level__line');
  let effectLevelDepth = document.querySelector('.effect-level__depth');
  let className;

  window.imgUploadPreview = imgUploadPreview;
  window.className = className;

  effectLevel.classList.add('hidden');

  let onEffectChange = function (evt) {
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      window.imgUploadPreview.querySelector('img').classList.remove(window.className);
      window.imgUploadPreview.querySelector('img').classList.add('effects__preview--' + evt.target.value);
      window.className = 'effects__preview--' + evt.target.value;

      if (evt.target.value === 'none') {
        effectLevel.classList.add('hidden');
        imgUploadPreview.querySelector('img').style.filter = '';
      } else {
        effectLevel.classList.remove('hidden');
        window.changingEffect(100);
        effectLevelPin.style.left = 100 + '%';
        effectLevelDepth.style.width = 100 + '%';
      }
    }
  };

  // Запускаем обработчик выбора эффекта
  effectsList.addEventListener('change', onEffectChange);

  // Запускаем функцию слайдера для изменения эффекта
  window.slaider(effectLevelPin, effectLevelLine, effectLevelDepth);
})();
