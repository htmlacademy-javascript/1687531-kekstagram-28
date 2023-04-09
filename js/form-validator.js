import '../vendor/pristine/pristine.min.js';
import { resetEffects } from './effect-image.js';
import { resetScale } from './scale-image.js';
import { sendImageToServer } from './network.js';
import { showModal, showErrorModal, showSuccessModal } from './modal.js';

const HASHTAGS_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COUNT_HASHTAG = 5;
const MAX_COUNT_TEXT = 140;
const HASHTAG_ERROR_TEXT = 'Некорректно заполнено поле хештегов';
const COMMENT_ERROR_TEXT = 'Превышено количество символов';

const form = document.getElementById('upload-select-image');
const fileField = document.getElementById('upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const openFormHandler = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeFormHandler = () => {
  form.reset();
  resetScale();
  resetEffects();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

function closeFormByEscHandler(evt) {
  const { activeElement } = document;
  const escIgnore = [textHashtags, textDescription];

  if(evt.key === 'Escape' && !escIgnore.includes(activeElement)) {
    closeFormHandler();
  }
}

const isValidTag = (tag) => HASHTAGS_RULES.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_COUNT_HASHTAG;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator (
  textHashtags,
  validateTags,
  HASHTAG_ERROR_TEXT
);

const checkStringLength = (text) => text.length <= MAX_COUNT_TEXT;

pristine.addValidator(
  textDescription,
  checkStringLength,
  COMMENT_ERROR_TEXT
);

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  if(pristine.validate()) {
    sendImageToServer(form)
      .then(() => showModal(showSuccessModal('Изображение успешно загружено', 'Круто!')))
      .catch(() => showModal(showErrorModal('Ошибка загрузки файла', 'Попробовать ещё раз')))
      .finally(closeFormHandler);
  }
};

const addListenersForFormValidator = () => {
  form.addEventListener('submit', formSubmitHandler);
  fileField.addEventListener('change', openFormHandler);
  cancelButton.addEventListener('click', closeFormHandler);
  document.addEventListener('keydown', closeFormByEscHandler);
};

export default addListenersForFormValidator;
