const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureCaption = document.querySelector('.social__caption');
const bigPictureCommentsCount = document.querySelector('.social__comment-count');
const bigPictureCommentsLoader = document.querySelector('.comments-loader');
const bigPictureSocialComments = document.querySelector('.social__comments');
const cancel = document.querySelector('.big-picture__cancel');
bigPictureCommentsCount.classList.add('hidden');
bigPictureCommentsLoader.classList.add('hidden');

const setDataForGalleryFrom = (element) => {
  const pictureLikesCount = element.querySelector('.picture__comments').textContent;
  const pictureSrc = element.querySelector('.picture__img').src;
  const pictureCommentsCount = element.querySelector('.picture__comments').textContent;

  bigPictureLikes.textContent = pictureLikesCount;
  bigPictureImg.src = pictureSrc;
  bigPictureCommentsCount.textContent = pictureCommentsCount;
};

const renderElementFromDataBy = (id, data) => {
  const currentObject = data.filter((item) => item.id === +id)[0];
  bigPictureCaption.textContent = currentObject.description;
  const currentComments = currentObject.comments;

  currentComments.forEach((comment, i) => {
    bigPictureSocialComments.insertAdjacentHTML('beforeend' , `
      <li class="social__comment">
        <img class="social__picture" src="${currentComments[i].avatar}" alt="${currentComments[i].name}" width="35" height="35">
          <p class="social__text">${currentComments[i].message}</p>
      </li>
      `);
  });
};

const openModalByClickHandler = (evt, data) => {
  const target = evt.target;
  const picture = target.closest('.picture');
  const dataId = picture.getAttribute('data-id');

  if (picture?.classList.contains('picture')){
    evt.preventDefault();
    setDataForGalleryFrom(picture);
    renderElementFromDataBy(dataId, data);

    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
  }
};


const closeModalByEscHandler = (evt) => {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureSocialComments.innerHTML = '';
  }
};

const closeModalByClickHandler = () =>{
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureSocialComments.innerHTML = '';
};

const addListenersForGallery = (data) => {
  pictures.addEventListener('click', (evt) => openModalByClickHandler(evt, data));
  cancel.addEventListener('click', closeModalByClickHandler);
  document.addEventListener('keydown', closeModalByEscHandler);
};

export default addListenersForGallery;
