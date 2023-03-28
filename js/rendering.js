function render (userData){
  const fragment = document.createDocumentFragment();
  const picture = document.querySelector('.pictures');

  userData.forEach((item) => {
    const template = document.createElement('template');
    template.innerHTML = `
              <a href="#" class="picture">
                 <img
                    class="picture__img"
                    src="${item.url}"
                    width="182"
                    height="182"
                    alt="Случайная фотография"
                 >
                    <p class="picture__info">
                      <span class="picture__comments">${item.comments.length}</span>
                      <span class="picture__likes">${item.likes}</span>
                   </p>
              </a>
     `;

    fragment.append(template.content);
  });

  picture.append(fragment);
}

export default render;
