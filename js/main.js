import { getImagesFromServer } from './network/network.js';
import { showModalOnAppError, showFilters } from './utils/utils.js';
import renderingImages from './view/rendering-images.js';
import addListenersForGallery from './core/full-size-image.js';
import addListenersForFormValidator from './core/form.js';
import addListenersForFilter from './filters/filters.js';

async function app() {
  const data = await getImagesFromServer();
  renderingImages(data);
  addListenersForFilter(data);
  addListenersForGallery(data);
  addListenersForFormValidator();
}

app()
  .then(showFilters)
  .catch(showModalOnAppError);
