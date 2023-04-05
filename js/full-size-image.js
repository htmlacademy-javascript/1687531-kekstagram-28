import data from './data.js';

/*
* Дополнительно https://jsonplaceholder.typicode.com/ - получить пользователей и отрисовать их
*/

const MAX_VISIBLE_COMMENTS = 5;
let showComments = 0;
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureCaption = document.querySelector('.social__caption');
const bigPictureCommentsCount = document.querySelector('.social__comment-count');
const bigPictureSocialComments = document.querySelector('.social__comments');
const bigPictureSocialCommentsLoader = document.querySelector('.social__comments-loader');
const cancel = document.querySelector('.big-picture__cancel');
const REMAINING_COMMENTS = [];

const setDataForGalleryFrom = (element, id) => {
  const currentObject = data.filter((item) => item.id === +id)[0];
  const currentCommentsLength = currentObject.comments.length;
  const pictureLikesCount = element.querySelector('.picture__comments').textContent;
  const pictureSrc = element.querySelector('.picture__img').src;

  bigPictureLikes.textContent = pictureLikesCount;
  bigPictureImg.src = pictureSrc;
  showComments = MAX_VISIBLE_COMMENTS;

  if (showComments >= currentCommentsLength) {
    showComments = currentCommentsLength;
    bigPictureSocialCommentsLoader.classList.add('hidden');
  } else {
    bigPictureSocialCommentsLoader.classList.remove('hidden');
  }

  bigPictureCommentsCount.innerHTML = `${showComments} из <span class="comments-count">${currentCommentsLength}</span>`;
};


function renderElementFromDataBy(id) {
  const currentObject = data.filter((item) => item.id === +id)[0];
  bigPictureCaption.textContent = currentObject.description;
  const currentComments = currentObject.comments;

  currentComments.forEach((comment, i) => {
    if (i < showComments) {
      bigPictureSocialComments.insertAdjacentHTML('beforeend', `
        <li class="social__comment">
          <img class="social__picture" src="${currentComments[i].avatar}" alt="${currentComments[i].name}" width="35" height="35">
            <p class="social__text">${currentComments[i].message}</p>
        </li>
      `);
    }else{
      REMAINING_COMMENTS.push(comment);
    }
  });
}

const openShowMoreButton = () => {
  for(let i = 0 ; i < REMAINING_COMMENTS.length ; i++){
    if(MAX_VISIBLE_COMMENTS >= i){
      bigPictureSocialComments.insertAdjacentHTML('beforeend', `
      <li class="social__comment">
        <img class="social__picture" src="${REMAINING_COMMENTS[i].avatar}" alt="${REMAINING_COMMENTS[i].name}" width="35" height="35">
          <p class="social__text">${REMAINING_COMMENTS[i].message}</p>
      </li>
    `);
    }
  }
  showComments += REMAINING_COMMENTS.length;
  bigPictureCommentsCount.innerHTML = `${showComments} из <span class="comments-count">${showComments}</span>`;
  REMAINING_COMMENTS.splice(0, MAX_VISIBLE_COMMENTS);
};

const openModalByClickHandler = (evt) => {
  const target = evt.target;
  const picture = target.closest('.picture');
  const dataId = picture.getAttribute('data-id');

  if (picture?.classList.contains('picture')){
    evt.preventDefault();
    setDataForGalleryFrom(picture, dataId);
    renderElementFromDataBy(dataId);

    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
  }
};


const closeModalByEscHandler = (evt) => {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureSocialComments.innerHTML = '';
    REMAINING_COMMENTS.splice(0, REMAINING_COMMENTS.length);
  }
};

const closeModalByClickHandler = () =>{
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureSocialComments.innerHTML = '';
  REMAINING_COMMENTS.splice(0, REMAINING_COMMENTS.length);
};

const addListenersForGallery = () => {
  pictures.addEventListener('click', openModalByClickHandler);
  cancel.addEventListener('click', closeModalByClickHandler);
  document.addEventListener('keydown', closeModalByEscHandler);
  bigPictureSocialCommentsLoader.addEventListener('click', openShowMoreButton);
};

export default addListenersForGallery;
