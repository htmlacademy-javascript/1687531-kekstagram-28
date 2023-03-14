const DESCRIPTIONS = [
  'Картинка для заставки на телефон',
  'Красивая фотография',
  'Милая фотография из галереи',
  'Популярная картинка из интернета',
  'Часто скачиваемая картинка',
];

const NAMES = [
  'Иван',
  'Хуан',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё',
];

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
