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

  window.SCALE_FOTO = 1;

  window.imgUploadPreview = imgUploadPreview;
  window.className = className;
  window.effectLevelPin = effectLevelPin;
  window.effectLevelDepth = effectLevelDepth;
  window.effectLevel = effectLevel;

  effectLevel.classList.add('hidden');

  // Функция переключения эффектов

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

  // Функция измененя масштаба изображения

  let imgUploadScale = window.imgUploadOverlay.querySelector('.img-upload__scale');
  let scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
  let scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
  let scaleControlValue = document.querySelector('input[name="scale"]');

  scaleControlValue.value = '100%';

  let onScaleDown = function () {
    if (window.SCALE_FOTO <= 0.25) {
      scaleControlSmaller.removeEventListener('click', onScaleDown);
    } else {
      window.SCALE_FOTO -= 0.25;
      scaleControlValue.value = (window.SCALE_FOTO * 100) + '%';
      scaleControlBigger.addEventListener('click', onScaleAdd);
      window.imgUploadPreview.querySelector('img').style.transform = 'scale(' + window.SCALE_FOTO + ')';
    }
  };

  let onScaleAdd = function () {
    if (window.SCALE_FOTO > 0.75) {
      scaleControlBigger.removeEventListener('click', onScaleAdd);
    } else {
      window.SCALE_FOTO += 0.25;
      scaleControlValue.value = (window.SCALE_FOTO * 100) + '%';
      scaleControlSmaller.addEventListener('click', onScaleDown);
      window.imgUploadPreview.querySelector('img').style.transform = 'scale(' + window.SCALE_FOTO + ')';
    }
  };
  scaleControlSmaller.addEventListener('click', onScaleDown);
  scaleControlBigger.addEventListener('click', onScaleAdd);
})();
