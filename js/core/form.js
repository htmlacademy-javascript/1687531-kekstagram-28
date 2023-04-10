import pristine from '../utils/validator.js';
import { resetEffects } from '../filters/effect-image.js';
import { resetScale } from '../filters/scale-image.js';
import { sendImageToServer } from '../network/network.js';
import { showModalOnSuccessfulSubmit, showModalOnFailedSubmit } from '../utils/utils.js';
import readFile from '../utils/file-reader.js';

const form = document.getElementById('upload-select-image');
const fileField = document.getElementById('upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const imgUploadSubmit = document.querySelector('.img-upload__submit');

const openFormHandler = () => {
  resetScale();
  readFile(fileField, imgUploadPreview);
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

const resetDataFromForm = () => {
  form.reset();
  resetScale();
  resetEffects();
};

const closeFormHandler = () => {
  fileField.value = '';
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

function closeFormByEscHandler({ code }) {
  const { activeElement } = document;
  const escIgnore = [textHashtags, textDescription];

  if(code === 'Escape' && !escIgnore.includes(activeElement)) {
    closeFormHandler();
    resetDataFromForm();
  }
}

const closeFormByClickHandler = () => {
  closeFormHandler();
  resetDataFromForm();
};

const formSubmitHandler = (event) => {
  event.preventDefault();

  if(pristine.validate()) {
    imgUploadSubmit.disabled = true;

    sendImageToServer(form)
      .then(showModalOnSuccessfulSubmit)
      .catch(showModalOnFailedSubmit)
      .finally(() => {
        closeFormHandler();
        imgUploadSubmit.disabled = false;
      });
  }
};

const addListenersForFormValidator = () => {
  form.addEventListener('submit', formSubmitHandler);
  fileField.addEventListener('change', openFormHandler);
  cancelButton.addEventListener('click', closeFormByClickHandler);
  document.addEventListener('keydown', closeFormByEscHandler);
};

export { resetDataFromForm };

export default addListenersForFormValidator;
