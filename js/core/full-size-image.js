import renderComment from '../view/rendering-comment.js';

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

const uploadingCommentsHandler = () => {
  const currentComments = REMAINING_COMMENTS.splice(0, MAX_LOADING_COMMENTS);

  if (!REMAINING_COMMENTS.length) {
    bigPictureSocialCommentsLoader.classList.add('hidden');
  }

  currentComments.forEach((comment) => {
    const { avatar, name, message } = comment;
    bigPictureSocialComments.insertAdjacentHTML('beforeend', renderComment(avatar, name, message));
  });

  showComments += currentComments.length;
  bigPictureCommentsCountFrom.textContent = showComments;
};

const renderCommentsFromDataBy = (ID, data) => {
  const currentObject = data.find((item) => item.id === +ID);
  const { comments } = currentObject;
  bigPictureCaption.textContent = currentObject.description;

  comments.forEach((comment, i) => {
    if (i < showComments) {
      const { avatar, name, message } = comment;
      bigPictureSocialComments.insertAdjacentHTML('beforeend', renderComment(avatar, name, message));
    } else {
      REMAINING_COMMENTS.push(comment);
    }
  });
};

const setDataForBigImageFrom = (element) => {
  const commentsCount = element.querySelector('.picture__comments').textContent;
  bigPictureLikes.textContent = element.querySelector('.picture__comments').textContent;
  bigPictureImg.src = element.querySelector('.picture__img').src;
  showComments = MAX_VISIBLE_COMMENTS;

  if (showComments >= commentsCount) {
    showComments = commentsCount;
    bigPictureSocialCommentsLoader.classList.add('hidden');
  } else {
    bigPictureSocialCommentsLoader.classList.remove('hidden');
  }

  bigPictureCommentsCountFrom.textContent = showComments;
  bigPictureCommentsCountTo.textContent = commentsCount;
};

const openModalByClickHandler = (event, data) => {
  const { target } = event;
  const picture = target.closest('.picture');

  if (picture?.classList.contains('picture')) {
    event.preventDefault();
    const ID = picture.getAttribute('data-id');
    setDataForBigImageFrom(picture);
    renderCommentsFromDataBy(ID, data);

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

const addListenersForGallery = (data) => {
  pictures.addEventListener('click', (event) => openModalByClickHandler(event, data));
  cancel.addEventListener('click', closeModalByClickHandler);
  document.addEventListener('keydown', closeModalByEscHandler);
  bigPictureSocialCommentsLoader.addEventListener('click', uploadingCommentsHandler);
};

export default addListenersForGallery;
