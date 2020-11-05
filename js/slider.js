'use strict';

// Слайдер

(function () {
  window.slider = function (objectPin, object, objectLine) {
    objectPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      let startCoords = {
        x: evt.clientX + (9 - evt.offsetX)
      };
      let objectLineWidth = object.offsetWidth;
      let objectLineWidthPercent = objectLineWidth / 100;

      let lineCoordStart = Math.floor(object.getBoundingClientRect().left);

      let rangPin = {
        start: lineCoordStart,
        end: lineCoordStart + objectLineWidth
      };

      let onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        if (moveEvt.clientX >= rangPin.start && moveEvt.clientX < rangPin.end) {
          let shiftCoords = {
            x: startCoords.x - moveEvt.clientX
          };

          startCoords.x = moveEvt.clientX;

          objectPin.style.left = (objectPin.offsetLeft - shiftCoords.x) + 'px';
          objectLine.style.width = Math.floor((objectPin.offsetLeft - shiftCoords.x) / objectLineWidthPercent) + '%';
          let percentNamber = Math.floor((objectPin.offsetLeft - shiftCoords.x) / objectLineWidthPercent);
          window.changingEffect(percentNamber);
        }
      };

      let onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
})();
