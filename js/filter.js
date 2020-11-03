'use strict';

// Модуль - Фильтр фотографий

(function () {
  const MAX_PHOTOS_COUNT = 25;
  const MIN_PHOTOS_COUNT = 10;
  const imgFilters = document.querySelector('.img-filters');
  const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
  let collections = [];
  let collectionsCopy = [];

  window.successHandler = function (data) {
    collections = data;
    window.creatingCollectionPictures(collections, MAX_PHOTOS_COUNT);
    imgFilters.classList.remove('img-filters--inactive');
  };

  window.clearing = function () {
    const all = window.setupPictureList.querySelectorAll('a');
    for (let i = all.length - 1; i >= 0; i--) {
      let child = all[i];
      child.parentElement.removeChild(child);
    }
  };

  const littleCollections = function () {
    let randomArray = window.creationArray(10, collections.length);
    let randomCollections = [];
    for (let i = 0; i < randomArray.length; i++) {
      randomCollections[i] = collections[randomArray[i]];
    }
    window.debounce(randomCollections, MIN_PHOTOS_COUNT);
  };

  const sortPicture = function () {
    collectionsCopy = collections.slice();
    collectionsCopy.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
  };

  const filterButtonChildren = imgFiltersForm.querySelectorAll('.img-filters__button');
  for (let i = 0; i < filterButtonChildren.length; i++) {
    let element = filterButtonChildren[i];
    element.addEventListener('click', function () {
      switch (element.id) {
        case 'filter-default':
          window.debounce(collections, MAX_PHOTOS_COUNT);
          break;
        case 'filter-random':
          littleCollections();
          break;
        case 'filter-discussed':
          sortPicture();
          window.debounce(collectionsCopy, MAX_PHOTOS_COUNT);
          break;
      }
    });
  }

  window.backend.load(window.successHandler, window.pullErrorHandler);
})();
