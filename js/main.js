import createObjects from './data.js';
import render from './rendering.js';
import addListenersForGallery from './full-size-image.js';
const data = createObjects();

render(data);
addListenersForGallery(data);
