import data from './data.js';
import render from './rendering.js';
import addListenersForGallery from './full-size-image.js';
import addListenersForFormValidator from './form-validator.js';

render(data);
addListenersForGallery();
addListenersForFormValidator();
