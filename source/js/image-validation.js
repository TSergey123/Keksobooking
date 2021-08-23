const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.ad-form-header__input');
const preview = document.querySelector('.ad-form-header__preview-image');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

const chooseFile = document.querySelector('.ad-form__input');
const previewBlock = document.querySelector('.ad-form__photo');

chooseFile.addEventListener('change', () => {
  const file = chooseFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const previewBlockImage = document.createElement('img');
      previewBlock.appendChild(previewBlockImage);
      previewBlockImage.alt = 'Фотография жилья';
      previewBlockImage.width = '70';
      previewBlockImage.height = '70';
      previewBlockImage.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
