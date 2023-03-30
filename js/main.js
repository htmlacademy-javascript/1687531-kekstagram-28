import createObjects from './data.js';
import render from './rendering.js';
import './full-size-image.js';
const data = createObjects();

render(data);

export {data};
