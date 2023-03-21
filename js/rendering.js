import createObjects from './data.js';

const data = createObjects();

function render (userData){
  userData.array.forEach((item) => {
    const template = `
           <template id="picture">
              <a href="#" class="picture">
                 <img class="picture__img" src="${item.image}" width="182" height="182" alt="Случайная фотография">
                   <p class="picture__info">
                      <span class="picture__comments">${item.comments}</span>
                       <span class="picture__likes">${item.likes}</span>
                     </p>
              </a>
            </template>
 `;

    document.body.insertAdjacentHTML('beforeend' , template);
  });

}

render(data);

export {render};
