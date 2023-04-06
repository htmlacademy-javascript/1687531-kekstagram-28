import '../vendor/pristine/pristine.min.js';
import {resetScale} from './scale-image.js';
import {resetEffects} from './effect-image.js';

const form = document.getElementById('upload-select-image');
const fileField = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const HASHTAGS_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COUNT_HASTAG = 5;
const TASK_ERROR_TEXT = 'Некорректно заполнено поле хештегов';
const MAX_COUNT_TEXT = 140;
const TASK_ERROR_LENGTH = 'Превышено количество символов';

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__eror'
});

const showModalHandler = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  resetScale();
  resetEffects();
  document.addEventListener('keydown', hideModalByEscHandler);
};

const hideModalHandler = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', hideModalByEscHandler);
};

function hideModalByEscHandler (evt) {
  const {activeElement} = document;
  const escIgnore = [textHashtags, textDescription];

  if(evt.key === 'Escape' && !escIgnore.includes(activeElement)){
    hideModalHandler();
  }
}

const isValidTag = (tag) => HASHTAGS_RULES.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_COUNT_HASTAG;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = (tags).map((tag) => tag.toLowerCase());
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
  TASK_ERROR_TEXT
);

const checkStringLenght = (text) => text.length <= MAX_COUNT_TEXT;

pristine.addValidator(
  textDescription,
  checkStringLenght,
  TASK_ERROR_LENGTH
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
  if(validateTags(textHashtags.value) && checkStringLenght(textDescription.value)) {
    form.submit();
  } else {
    evt.preventDefault();
  }
};

form.addEventListener('submit', onFormSubmit);
fileField.addEventListener('change', showModalHandler);
cancelButton.addEventListener('click', hideModalHandler);
