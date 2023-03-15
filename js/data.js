import {getLikes , getRandomDescriptions , getRandomName , getRandomComments , getRandomInt , getID} from './utils.js';


const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomComments(),
  name: getRandomName(),
});

const createComments = () => {
  const comments = [];
  const commentsCount = getRandomInt(1, 10);

  for (let i = 1; i <= commentsCount; i++) {
    comments.push(createComment(i));
  }

  return comments;
};

const createObject = () => {
  const id = getID();
  const likes = getLikes();
  const description = getRandomDescriptions();
  const comments = createComments();

  return {
    id,
    url: `photos/${id}.jpg`,
    description,
    likes,
    comments,
  };
};

const createObjects = () => {
  const objects = [];

  for (let i = 0; i < 25; i++) {
    objects.push(createObject());
  }

  return objects;
};

createObjects();


export default createObjects;
