import {DESCRIPTIONS , NAMES , COMMENTS} from './constants.js';

const getLikes = (min = 15, max = 200) => Math.floor(Math.random() * (max - min + 1) + min);

const getIdGenerator = () => {
  let number = 1;

  return () => number++;
};

const getID = getIdGenerator();

const getRandomDescriptions = () => DESCRIPTIONS[(Math.random() * DESCRIPTIONS.length) | 0];

const getRandomName = () => NAMES[(Math.random() * NAMES.length) | 0];

const getRandomComments = () => COMMENTS[(Math.random() * COMMENTS.length) | 0];

const getRandomInt = (min = 15, max = 200) => Math.floor(Math.random() * (max - min + 1) + min);

export {getLikes , getRandomDescriptions , getRandomName , getRandomComments , getRandomInt , getID};
