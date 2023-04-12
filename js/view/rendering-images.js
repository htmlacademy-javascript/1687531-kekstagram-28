import { deleteAllNodesBySelector, sortArrayByFlag } from '../utils/utils.js';

const render = (data) => {
  const fragment = document.createDocumentFragment();
  const picture = document.querySelector('.pictures');

  data.forEach(({ id, url, comments, likes }) => {
    const template = document.createElement('template');
    template.innerHTML = `
      <a href="#" class="picture" data-id="${id}">
        <img
          class="picture__img"
          src="${url}"
          width="182"
          height="182"
          alt="Случайная фотография"
        >
        <p class="picture__info">
          <span class="picture__comments">${comments.length}</span>
          <span class="picture__likes">${likes}</span>
        </p>
      </a>
  `;

    fragment.append(template.content);
  });

  picture.append(fragment);
};

const renderImages = (data, flag = 'default') => {
  deleteAllNodesBySelector('picture');
  sortArrayByFlag(data, flag);
  render(data);
};

export default renderImages;
