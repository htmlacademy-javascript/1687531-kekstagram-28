import { getImagesFromServer } from './network.js';
import render from './rendering.js';
import addListenersForGallery from './full-size-image.js';
import addListenersForFormValidator from './form-validator.js';
import { showErrorModal, showModal } from './modal.js';

async function app() {
  const data = await getImagesFromServer();
  render(data);
  addListenersForGallery(data);
  addListenersForFormValidator();
}

app().catch(() => {
  showModal(showErrorModal('Возникла ошибка. Данные не могут быть отображены', 'Закрыть'));
});
