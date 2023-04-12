import renderImages from '../view/rendering-images.js';
import { deleteClassFromNodesBySelector } from '../utils/utils.js';
import debounce from '../utils/debounce.js';

const imgFiltersForm = document.querySelector('.img-filters__form');

const renderByDefaultHandler = (data) => renderImages(data);

const renderByRandomHandler = (data) => renderImages(data, 'random');

const renderByDiscussedHandler = (data) => renderImages(data, 'discussed');

const filterSelectionHandler = (data, { id }) => {
  switch (id) {
    case 'filter-random':
      renderByRandomHandler(data);
      break;
    case 'filter-discussed':
      renderByDiscussedHandler(data);
      break;
    default:
      renderByDefaultHandler(data);
  }
};

const filterSelectionPrepare = ({ target }, data) => {
  const copies = [...data];
  deleteClassFromNodesBySelector('img-filters__button', 'img-filters__button--active');
  target.classList.add('img-filters__button--active');

  filterSelectionHandler(copies, target);
};

const addListenersForFilter = (data) => {
  const withDebounce = debounce(filterSelectionPrepare, 500);
  imgFiltersForm.addEventListener('click', (event) => withDebounce(event, data));
};

export default addListenersForFilter;
