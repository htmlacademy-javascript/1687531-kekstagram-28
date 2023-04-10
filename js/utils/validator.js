import '../../vendor/pristine/pristine.min.js';

const HASHTAGS_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COUNT_HASHTAG = 5;
const MAX_COUNT_TEXT = 140;
const HASHTAG_ERROR_TEXT = 'Некорректно заполнено поле хештегов';
const COMMENT_ERROR_TEXT = 'Превышено количество символов';

const form = document.getElementById('upload-select-image');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const checkStringLength = (text) => text.length <= MAX_COUNT_TEXT;

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

pristine.addValidator(
  textDescription,
  checkStringLength,
  COMMENT_ERROR_TEXT
);

export default pristine;
