const readFile = (typeFile, image) => {
  const file = typeFile.files[0];
  const reader = new FileReader();
  image.src = '';

  reader.onloadend = function () {
    image.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    image.src = 'img/upload-default-image.jpg';
  }
};

export default readFile;
