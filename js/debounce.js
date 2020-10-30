'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;
  let lastTimeout = null;
  window.debounce = function (array, count) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.clearing();
      window.creatingCollectionPictures(array, count);
    }, DEBOUNCE_INTERVAL);
  };
})();
