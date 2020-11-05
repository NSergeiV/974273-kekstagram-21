'use strict';

// выкладываем фото для предварительного просмотра

(function () {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  let previewBlock = document.querySelector('.img-upload__preview');
  let preview = previewBlock.querySelector('img');
  window.previewFoto = (fileChooser) => {
    let file = fileChooser.files[0];
    let fileFotoName = file.name.toLowerCase();

    let matches = FILE_TYPES.some(function (ending) {
      return fileFotoName.endsWith(ending);
    });

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };
})();
