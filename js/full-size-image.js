import data from './data.js';

const REMAINING_COMMENTS = [];
const MAX_VISIBLE_COMMENTS = 5;
const MAX_LOADING_COMMENTS = 5;

let showComments = 0;

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureCaption = document.querySelector('.social__caption');
const bigPictureCommentsCountFrom = document.querySelector('.comments-count-from');
const bigPictureCommentsCountTo = document.querySelector('.comments-count-to');
const bigPictureSocialComments = document.querySelector('.social__comments');
const bigPictureSocialCommentsLoader = document.querySelector('.social__comments-loader');
const cancel = document.querySelector('.big-picture__cancel');

const setDataForGalleryFrom = (element, id) => {
  const currentObject = data.find((item) => item.id === +id);
  const currentCommentsLength = currentObject.comments.length;

  bigPictureLikes.textContent = element.querySelector('.picture__comments').textContent;
  bigPictureImg.src = element.querySelector('.picture__img').src;
  showComments = MAX_VISIBLE_COMMENTS;

  if (showComments >= currentCommentsLength) {
    showComments = currentCommentsLength;
    bigPictureSocialCommentsLoader.classList.add('hidden');
  } else {
    bigPictureSocialCommentsLoader.classList.remove('hidden');
  }

  bigPictureCommentsCountFrom.textContent = showComments;
  bigPictureCommentsCountTo.textContent = String(currentCommentsLength);
};

const renderComment = (avatar, name, message) => `
    <li class="social__comment">
          <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
          <p class="social__text">${message}</p>
    </li>
`;

function renderElementFromDataBy(id) {
  const currentObject = data.find((item) => item.id === +id);
  bigPictureCaption.textContent = currentObject.description;
  const currentComments = currentObject.comments;

  currentComments.forEach((comment, i) => {
    if (i < showComments) {
      const { avatar, name, message } = comment;
      bigPictureSocialComments.insertAdjacentHTML('beforeend', renderComment(avatar, name, message));
    } else {
      REMAINING_COMMENTS.push(comment);
    }
  });
}

const openShowMoreButton = () => {
  const currentComments = REMAINING_COMMENTS.splice(0, MAX_LOADING_COMMENTS);

  currentComments.forEach((comment) => {
    const { avatar, name, message } = comment;
    bigPictureSocialComments.insertAdjacentHTML('beforeend', renderComment(avatar, name, message));
  });

  showComments += currentComments.length;
  bigPictureCommentsCountFrom.textContent = showComments;
};

const openModalByClickHandler = (evt) => {
  const target = evt.target;
  const picture = target.closest('.picture');

  if (picture?.classList.contains('picture')) {
    evt.preventDefault();
    const dataId = picture.getAttribute('data-id');
    setDataForGalleryFrom(picture, dataId);
    renderElementFromDataBy(dataId);

    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
  }
};

const hideModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureSocialComments.innerHTML = '';
  REMAINING_COMMENTS.splice(0, REMAINING_COMMENTS.length);
};

const closeModalByEscHandler = (evt) => evt.code === 'Escape' && hideModal();

const closeModalByClickHandler = () => hideModal();

const addListenersForGallery = () => {
  pictures.addEventListener('click', openModalByClickHandler);
  cancel.addEventListener('click', closeModalByClickHandler);
  document.addEventListener('keydown', closeModalByEscHandler);
  bigPictureSocialCommentsLoader.addEventListener('click', openShowMoreButton);
};

export default addListenersForGallery;
