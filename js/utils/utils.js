import { showErrorModal, showModal, showSuccessModal } from '../view/notifications.js';
import { resetDataFromForm } from '../core/form.js';

const sortRandom = () => (Math.random() > 0.5) ? 1 : -1;
const sortByComments = ({ comments: prevComments }, { comments: nextComments }) => nextComments.length - prevComments.length;

const deleteAllNodesBySelector = (selector) => document.querySelectorAll(`.${selector}`)
  .forEach((node) => node.remove());

const deleteClassFromNodesBySelector = (selector, className) => document.querySelectorAll(`.${selector}`)
  .forEach((node) => node.classList.remove(className));

const sortArrayByFlag = (array, flag) => {
  switch (flag) {
    case 'random':
      array.sort(sortRandom);
      break;
    case 'discussed':
      array.sort(sortByComments);
  }
};

const showModalOnSuccessfulSubmit = () => {
  resetDataFromForm();
  showModal(showSuccessModal('Изображение успешно загружено', 'Круто!'));
};

const showModalOnFailedSubmit = () => {
  showModal(showErrorModal('Ошибка загрузки файла', 'Попробовать ещё раз'));
};

const showModalOnAppError = () => {
  showModal(showErrorModal('Возникла ошибка. Данные не могут быть отображены', 'Закрыть'));
};

const showFilters = () => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

export {
  deleteAllNodesBySelector,
  sortArrayByFlag,
  deleteClassFromNodesBySelector,
  showModalOnSuccessfulSubmit,
  showModalOnFailedSubmit,
  showModalOnAppError,
  showFilters,
};
